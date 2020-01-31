from rest_framework import serializers

from datetime import datetime

from .models import (Mail,
                     Mailbox_Monitor,
                     Comment,
                     Ccms,
                     BusinessUnit,
                     EscalationType,
                     CCMSStatus,
                     TicketStatus,
                     Silo,
                     SiteCode,
                     CCMSOwner,
                     AccountableTeam,
                     TicketType
                     )


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


class CcmsSerializer(serializers.ModelSerializer):

    ccms_owner_username = serializers.SerializerMethodField()

    def get_ccms_owner_username(self, obj):

        return obj.ccms_owner.user.username if obj.ccms_owner else ""

    email_subject = serializers.SerializerMethodField()

    def get_email_subject(self, obj):

        return obj.mail.email_subject

    mail_id = serializers.SerializerMethodField()

    def get_mail_id(self, obj):

        return obj.mail.mail_id

    sender_name = serializers.SerializerMethodField()

    def get_sender_name(self, obj):

        return obj.mail.sender_name

    sender_email_address = serializers.SerializerMethodField()

    def get_sender_email_address(self, obj):

        return obj.mail.sender_email_address

    mail_age = serializers.SerializerMethodField()

    def get_mail_age(self, obj):

        record_date = datetime.strptime(
            obj.mail.receivedDateTime, '%Y-%m-%dT%H:%M:%SZ')

        dt = datetime.now() - record_date

        return dt.days

    class Meta:
        model = Ccms
        fields = '__all__'


class BusinessUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUnit
        fields = '__all__'


class EscalationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EscalationType
        fields = '__all__'


class CCMSStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CCMSStatus
        fields = '__all__'


class TicketStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketStatus
        fields = '__all__'


class SiloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Silo
        fields = '__all__'


class SiteCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteCode
        fields = '__all__'


class CCMSOwnerSerializer(serializers.ModelSerializer):

    ccms_owner_username = serializers.SerializerMethodField()

    def get_ccms_owner_username(self, obj):

        return obj.user.username

    class Meta:
        model = CCMSOwner
        fields = '__all__'


class AccountableTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountableTeam
        fields = '__all__'


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = '__all__'
