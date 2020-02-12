from django.shortcuts import render

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from cba_auth.models import Auth_Details
import sys

from cba_auth.auth_helper import (
    get_sign_in_url,
    get_token_from_code,
    store_token,
    store_user,
    remove_user_and_token,
    get_token
)

from cba_auth.graph_helper import (
    get_user,

)

# Create your views here.


def home(request):
    context = initialize_context(request)
    return render(request, 'cba_auth/home.html', context)


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


def sign_in(request):
    # Get the sign-in URL
    sign_in_url, state = get_sign_in_url()
    # Save the expected state so we can validate in the callback

    request.session['auth_state'] = state
    # Redirect to the Azure sign-in page
    return HttpResponseRedirect(sign_in_url)


def callback(request):
    # Get the state saved in session
    expected_state = request.session.pop('auth_state', '')
    # Make the token request

    token = get_token_from_code(request.get_full_path(), expected_state)

    # Get the user's profile
    user = get_user(token)

    # Temporary! Save the response in an error so it's displayed
    request.session['flash_error'] = {'message': 'Token retrieved',
                                      'debug': 'User: {0}\nToken: {1}'.format(user, token)}

    store_token(request, token)
    store_user(request, user)
    # save user and token data to models

    try:
        uid = user['mail']
        userobj = User.objects.get(username=uid)

        user_auth_details = Auth_Details.objects.get(user=userobj)

        # Update AuthDetails of User after successful login to Azure AD
        user_auth_details.expires_in = token['expires_in']
        user_auth_details.ext_expires_in = token['ext_expires_in']
        user_auth_details.access_token = token['access_token']
        user_auth_details.refresh_token = token['refresh_token']
        user_auth_details.id_token = token['id_token']
        user_auth_details.expires_at = token['expires_at']

        user_auth_details.save()

    except User.DoesNotExist:
        # split fullname

        fullname = user['displayName']
        lastname, firstname = fullname.split(",")
        firstname = firstname.lstrip()

        # create new user
        userobj = User.objects.create_user(
            user['mail'], user['mail'], '1234', first_name=firstname, last_name=lastname)
        userobj.save()

        Auth_Details.objects.create(
            user=userobj,
            expires_in=token['expires_in'],
            ext_expires_in=token['ext_expires_in'],
            access_token=token['access_token'],
            refresh_token=token['refresh_token'],
            id_token=token['id_token'],
            expires_at=token['expires_at']
        )

    login(request, userobj)

    # Redirect to CBA Apps Link
    return HttpResponseRedirect(reverse('index'))


def sign_out(request):
    # Clear out the user and token
    user = request.session['user']
    # print(user)
    u1 = User.objects.get(username=user['email'])
    a1 = Auth_Details.objects.get(user=u1)
    a1.expires_in = 0
    a1.ext_expires_in = 0
    a1.access_token = ""
    a1.refresh_token = ""
    a1.id_token = ""
    a1.expires_at = 0
    a1.save()

    remove_user_and_token(request)
    logout(request)

    return HttpResponseRedirect(reverse('home'))

# check trigger > get all emails(specific parameter) > save to database  > return to check trigger
