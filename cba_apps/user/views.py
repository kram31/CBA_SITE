from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from django.shortcuts import redirect
from django.contrib import messages
from .forms import UserRegisterForm, UpdateUserForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

from django.views.generic import View, ListView, DetailView, CreateView, UpdateView

# use the built-in django forms first


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('home_view')
    else:
        form = UserRegisterForm()

    return render(request, 'user/register.html', {'form': form})


@login_required(login_url='/login/')
def profile(request):

    if request.method == "POST":
        u_form = UpdateUserForm(request.POST, instance=request.user)

        if u_form.is_valid():
            u_form.save()
            messages.success(request, 'Your account has been updated')
            return redirect('profile')

    else:
        u_form = UpdateUserForm(instance=request.user)

    return render(request, 'user/profile.html', {'u_form': u_form})
