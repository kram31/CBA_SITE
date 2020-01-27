from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .api import Auth_DetailsViewset

router = routers.DefaultRouter()
router.register('api/cba_auth', Auth_DetailsViewset, 'cba_auth')

urlpatterns = router.urls
