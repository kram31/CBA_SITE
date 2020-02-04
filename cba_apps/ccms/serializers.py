from datetime import datetime
from rest_framework import serializers
from django.contrib.auth.models import User

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


class BusinessUnitSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = BusinessUnit
        fields = '__all__'


class EscalationTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = EscalationType
        fields = '__all__'


class CCMSStatusSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = CCMSStatus
        fields = '__all__'


class SiloSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Silo
        fields = '__all__'


class SiteCodeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = SiteCode
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ('username', 'email')


# class UserField(serializers.Field):

#     def to_representation(self, value):
#         return UserSerializer(value).data

#     def to_internal_value(self, data):
#         try:
#             return User.objects.filter(id=data['id']).first()
#         except (AttributeError, KeyError):
#             pass

class TicketStatusSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = TicketStatus
        fields = '__all__'


class CCMSOwnerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    user = UserSerializer()

    class Meta:
        model = CCMSOwner
        fields = '__all__'
        read_only_fields = ('id', 'user')
        # depth = 2

    def create(self, validated_data):
        user = validated_data.pop('user')
        u = User.objects.get(id=user['id'])
        co = CCMSOwner.objects.create(user=u, **user)

        return co


class AccountableTeamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = AccountableTeam
        fields = '__all__'


class TicketTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = TicketType
        fields = '__all__'


class CcmsSerializer(serializers.ModelSerializer):

    ccms_owner = CCMSOwnerSerializer(required=False)
    site_code = SiteCodeSerializer(required=False)
    accountable_team = AccountableTeamSerializer(required=False)
    escalation_type = EscalationTypeSerializer(required=False)
    business_unit = BusinessUnitSerializer(required=False)
    ticket_status = TicketStatusSerializer(required=False)
    silo = SiloSerializer(required=False)
    ticket_type = TicketTypeSerializer(required=False)
    ccms_status = CCMSStatusSerializer(required=False)

    mail = MailSerializer(read_only=True)
    mail_age = serializers.SerializerMethodField()

    def get_mail_age(self, obj):

        record_date = datetime.strptime(
            obj.mail.receivedDateTime, '%Y-%m-%dT%H:%M:%SZ')

        dt = datetime.now() - record_date

        return dt.days

    class Meta:
        model = Ccms
        fields = '__all__'
        # depth = 2

    def update(self, instance, validated_data):

        if "ticket_status" in validated_data.keys():
            ticket_status = validated_data.pop('ticket_status')
            instance.ticket_status = TicketStatus.objects.get(**ticket_status)
            instance.save()

        if "ccms_owner" in validated_data.keys():
            ccms_owner = validated_data.pop('ccms_owner')
            instance.ccms_owner = CCMSOwner.objects.get(id=ccms_owner['id'])
            instance.save()

        if "business_unit" in validated_data.keys():
            business_unit = validated_data.pop('business_unit')
            instance.business_unit = BusinessUnit.objects.get(
                id=business_unit['id'])
            instance.save()

        if "escalation_type" in validated_data.keys():
            escalation_type = validated_data.pop('escalation_type')
            instance.escalation_type = EscalationType.objects.get(
                id=escalation_type['id'])
            instance.save()

        if "accountable_team" in validated_data.keys():
            accountable_team = validated_data.pop('accountable_team')
            instance.accountable_team = AccountableTeam.objects.get(
                id=accountable_team['id'])
            instance.save()

        if "site_code" in validated_data.keys():
            site_code = validated_data.pop('site_code')
            instance.site_code = SiteCode.objects.get(
                id=site_code['id'])
            instance.save()

        if "silo" in validated_data.keys():
            silo = validated_data.pop('silo')
            instance.silo = Silo.objects.get(
                id=silo['id'])
            instance.save()

        if "ticket_type" in validated_data.keys():
            ticket_type = validated_data.pop('ticket_type')
            instance.ticket_type = TicketType.objects.get(
                id=ticket_type['id'])
            instance.save()

        if "ccms_status" in validated_data.keys():
            ccms_status = validated_data.pop('ccms_status')
            instance.ccms_status = CCMSStatus.objects.get(
                id=ccms_status['id'])
            instance.save()

        instance = super().update(instance, validated_data)
        instance.save()

        return instance
