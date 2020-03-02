from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from ccms.models import Mail, Mailbox_Monitor, Ccms
import sys
import pdb

from cba_auth.auth_helper import (
    get_sign_in_url,
    get_token_from_code,
    store_token,
    store_user,
    remove_user_and_token,
    get_token
)

from .graph_helper import (
    get_user,
    get_mails,
    send_mail_graph,
    check_mailbox_access,
    check_designated_mailfolder,
    create_mailfolder,
    mark_email_read,
    move_email,
    change_email_subject,
    get_folder_list
)

import json

import time

from threading import Thread

import threading


mailbox_monitor = False


def initialize_context(request):
    context = {}

    # Check for any errors in the session
    error = request.session.pop('flash_error', None)

    if error != None:
        context['errors'] = []
        context['errors'].append(error)

    # Check for user in the session
    context['user'] = request.session.get('user', {'is_authenticated': False})
    return context


def app_control_view(request):
    context = initialize_context(request)

    # Check if mailbox monitor is on using the stored data in database

    mailbox_entry = Mailbox_Monitor.objects.get(id=1)

    token = get_token(request)

    if request.method == 'GET':

        if mailbox_entry.monitor_on == True:

            # mailbox_entry.monitor_on = False

            # mailbox_entry.save()

            return render(request, 'ccms/app_control_on.html', context)

        elif mailbox_entry.monitor_on == False:

            return render(request, 'ccms/app_control_view.html', context)

    # LOAD stored mailbox name / UID

    if request.method == 'POST':
        if 'email_address' in request.POST:

            post_email_address = request.POST['email_address']

            # UPDATE monitored mailbox name
            mailbox_entry.mailbox_name = post_email_address
            mailbox_entry.save()

            # # CHECK if provided email address is accessible

            result = check_mailbox_access(token, post_email_address)

            if 'error' in result:

                context['error'] = result['error']

                return render(request, 'ccms/app_control_view.html', context)

            # GET ALL FOLDERS AND DISPLAY AS SELECT INPUT

            folder_list = get_folder_list(token, post_email_address)

            if 'error' in folder_list:
                context['error'] = folder_list

            else:
                context['folder_list'] = folder_list
                return render(request, 'ccms/app_control_select_folder.html', context)

            return render(request, 'ccms/app_control_view.html', context)

        if 'select_folder' in request.POST:

            selected_folder_id = request.POST['select_folder']

            # Check if designated folder exists

            check_designated_mailfolder_result = check_designated_mailfolder(
                token, mailbox_entry.mailbox_name)

            if len(check_designated_mailfolder_result['value']) == 0:
                # If folder doesnot exist create folder "Processed"
                folderid = create_mailfolder(
                    token, mailbox_entry.mailbox_name)
                print("No folder named Processed found! Created Processed folder")
            else:
                print("Processed folder found")
                folder_value = check_designated_mailfolder_result['value'][0]
                folderid = folder_value['id']

            mailbox_process = Thread(
                target=email_to_database, args=(request, mailbox_entry.mailbox_name, folderid, selected_folder_id))

            if not mailbox_process.is_alive():

                # when Thread running render template that shows thread is ON!

                # TAGGING TRIGGER AS ON
                mailbox_entry.monitor_on = True
                mailbox_entry.save()

                # get all unread emails > LOOP > save to database > mark email unread > move email to "Processed" folder > send email notif
                mailbox_process.start()
                print("THREAD is ON!")

            return render(request, 'ccms/app_control_on.html', context)

        if 'turn_off' in request.POST:

            mailbox_entry.monitor_on = False

            mailbox_entry.save()

    return render(request, 'ccms/app_control_view.html', context)


def email_to_database(request, upn, folderid, folder_to_read):

    while Mailbox_Monitor.objects.get(id=1).monitor_on:

        token = get_token(request)

        # GET UNREAD EMAILS
        mails = get_mails(token, upn, folder_to_read)
        print('GOT UNREAD EMAILS')

        uploaded_mails = []
        failed_uploads = []

        # LOOP > save to database > mark email unread > move email to "Processed" folder > send email notif

        for mail in mails:

            sender_details = mail['sender']
            sender_emailaddress_details = sender_details['emailAddress']
            mail_id = mail['id']

            # ADD LOGIC WHETHER EMAIL IS NEW OR A FOLLOW UP

            # Check subject for any CCMS ID - Needs to have a format

            try:

                # save to database
                mail_body = mail['body']
                mail_entry = Mail.objects.create(
                    mail_id=mail_id,
                    email_subject=mail['subject'],
                    sender_name=sender_emailaddress_details['name'],
                    sender_email_address=sender_emailaddress_details['address'],
                    email_body=mail_body['content'],
                    receivedDateTime=mail['receivedDateTime']
                )
                mail_entry.save()
                ccms_entry = Ccms.objects.create(mail=mail_entry)
                ccms_entry.save()
                uploaded_mails.append(mail)

                # mark email unread
                mark_email_read(token, upn, mail_id)

                # change_email_subject
                change_email_subject(token, upn, mail_id,
                                     mail['subject'], ccms_entry.id)

                # email to "Processed" folder
                move_email(token, upn, mail_id, folderid)

                # send success email notif
                # send_mail_graph(token=token, subject=f'UPLOADED - {mail["subject"]}', recipients=[
                #     "mark.lascano@dxc.com"], body=sender_emailaddress_details['name'])

                time.sleep(1)

            except TypeError as e:
                # e = sys.exc_info()[0]
                print(f'FAILED - {e}')
                failed_uploads.append(mail)

                # send fail email notif

        time.sleep(10)

    send_mail_graph(token=token, subject="Turned OFF", recipients=[
        "mark.lascano@dxc.com"], body='TURNED OFF')
