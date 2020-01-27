from django.urls import path

from rest_framework import routers
from . import views

from .api import MailViewset, Mailbox_MonitorViewset, CommentViewset

urlpatterns = [

    path('control', views.app_control_view, name='control'),
]

router = routers.DefaultRouter()
router.register('api/mails', MailViewset, 'mails')
router.register('api/mailbox_monitor',
                Mailbox_MonitorViewset, 'mailbox_monitor')
router.register('api/comments', CommentViewset, 'comments')

urlpatterns.extend(router.urls)
