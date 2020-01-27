from rest_framework import serializers
from .models import Mail, Mailbox_Monitor, Comment


class MailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mail
        fields = '__all__'


class Mailbox_MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mailbox_Monitor
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
