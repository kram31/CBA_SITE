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
