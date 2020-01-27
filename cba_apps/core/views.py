from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.


def index(request):

    if not 'user' in request.session:

        return HttpResponseRedirect(reverse('home'))

    return render(request, "build/index.html")
