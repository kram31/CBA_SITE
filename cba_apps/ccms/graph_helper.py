from requests_oauthlib import OAuth2Session

import base64
import mimetypes

graph_url = 'https://graph.microsoft.com/v1.0'
graph_url_beta = 'https://graph.microsoft.com/beta'

headers = {'Prefer': 'IdType="ImmutableId"'}


def get_user(token):
    graph_client = OAuth2Session(token=token)
    # Send GET to /me
    user = graph_client.get('{0}/me'.format(graph_url))
    # Return the JSON result
    return user.json()



def get_mails(token, upn):

    emails = []

    graph_client = OAuth2Session(token=token)

    query_params = {
        '$filter': "isRead ne true"
    }

    mails = graph_client.get(
        "{0}/users/{1}/mailFolders('Inbox')/messages".format(graph_url, upn), params=query_params, headers=headers)

    mails_json = mails.json()

    emails.extend(mails_json['value'])

    # Handle pagination
    # Loop to check below
    # if @odata.nextLink exists send another request using @odata.nextLink value

    while '@odata.nextLink' in mails_json:
        print(mails_json['@odata.nextLink'])
        mails_json = graph_client.get(mails_json['@odata.nextLink'])
        mails_json = mails_json.json()
        emails.extend(mails_json['value'])

    return emails


def send_mail_graph(token, subject, recipients, body='', content_type='HTML',
                    attachments=None):
    """Send email from current user.
    token        = refreshed or new acquired token
    subject      = email subject (required)
    recipients   = list of recipient email addresses (required)
    body         = body of the message
    content_type = content type (default is 'HTML')
    attachments  = list of file attachments (local filenames)
    Returns the response from the POST to the sendmail API.
    """

    graph_client = OAuth2Session(token=token)

    # Create recipient list in required format.
    recipient_list = [{'EmailAddress': {'Address': address}}
                      for address in recipients]

    # Create list of attachments in required format.
    attached_files = []
    if attachments:
        for filename in attachments:
            b64_content = base64.b64encode(open(filename, 'rb').read())
            mime_type = mimetypes.guess_type(filename)[0]
            mime_type = mime_type if mime_type else ''
            attached_files.append(
                {'@odata.type': '#microsoft.graph.fileAttachment',
                 'ContentBytes': b64_content.decode('utf-8'),
                 'ContentType': mime_type,
                 'Name': filename})

    # Create email message in required format.
    email_msg = {'Message': {'Subject': subject,
                             'Body': {'ContentType': content_type, 'Content': body},
                             'ToRecipients': recipient_list,
                             'Attachments': attached_files},
                 'SaveToSentItems': 'true'}

    # Do a POST to Graph's sendMail API and return the response.

    headers['Content-Type'] = 'application/json'

    return graph_client.post("{0}/me/sendMail".format(graph_url),
                             headers=headers,
                             json=email_msg)


def check_designated_mailfolder(token, upn):

    graph_client = OAuth2Session(token=token)

    query_params = {
        '$filter': "displayName eq 'Processed'"
    }

    mailfolders = graph_client.get(
        "{0}/users/{1}/mailFolders".format(graph_url, upn), params=query_params, headers=headers)

    return mailfolders.json()


def change_email_subject(token, upn, email_id, subject, ccms_id):

    graph_client = OAuth2Session(token=token)

    headers['Content-Type'] = 'application/json'

    processed_email = graph_client.patch("{0}/users/{1}/messages/{2}".format(
        graph_url, upn, email_id), headers=headers, json={"subject": f'CCMS ID: {ccms_id} - {subject}'})

    return processed_email.json()


def mark_email_read(token, upn, email_id):

    graph_client = OAuth2Session(token=token)

    headers['Content-Type'] = 'application/json'

    processed_email = graph_client.patch("{0}/users/{1}/messages/{2}".format(
        graph_url, upn, email_id), headers=headers, json={"isRead": "true"})

    return processed_email.json()


def move_email(token, upn, email_id, folderid):

    # testfolderid = "AAMkADFhZTg1MDhhLTcyOTMtNDY4ZC1iZjU2LTliYWE0MDc4NjkxNgAuAAAAAAAp8YWAlUM1SacTKVCvoiSiAQDwzExAFdAwSINegg-TJKZzAAGLeO8fAAA="

    graph_client = OAuth2Session(token=token)

    headers['Content-Type'] = 'application/json'

    moved_email = graph_client.post("{0}/users/{1}/messages/{2}/move".format(
        graph_url, upn, email_id), headers=headers, json={"destinationId": f"{folderid}"})

    return moved_email.json()


def create_mailfolder(token, upn):
    graph_client = OAuth2Session(token=token)

    headers['Content-Type'] = 'application/json'

    result = graph_client.post("{0}/users/{1}/mailFolders".format(graph_url, upn),
                               headers=headers, json={"displayName": "Processed"})

    folder = result.json()

    return folder['id']


def check_mailbox_access(token, upn):
    # if true proceed with the thread

    graph_client = OAuth2Session(token=token)

    result = graph_client.get(
        "{0}/users/{1}/".format(graph_url, upn))

    return result.json()
