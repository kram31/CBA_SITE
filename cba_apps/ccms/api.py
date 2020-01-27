from rest_framework import viewsets, permissions
from .models import Mail, Mailbox_Monitor, Comment
from .serializers import MailSerializer, Mailbox_MonitorSerializer, CommentSerializer


class MailViewset(viewsets.ModelViewSet):
    queryset = Mail.objects.all()
    serializer_class = MailSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class Mailbox_MonitorViewset(viewsets.ModelViewSet):
    queryset = Mailbox_Monitor.objects.all()
    serializer_class = Mailbox_MonitorSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class CommentViewset(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
