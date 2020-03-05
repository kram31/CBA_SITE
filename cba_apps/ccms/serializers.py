from datetime import datetime
from rest_framework import serializers
from django.contrib.auth.models import User
from cba_auth.models import Auth_Details
from cba_auth.serializers import Auth_DetailsSerializer
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
                     TicketType,
                     CcmsAccessRequest,
                     CauseCode,
                     EscalationDriver,
                     EscalationDriverCause,
                     CcmsRca,
                     FindingsAndInvestigation,
                     CorrectiveAction
                     )

from cba_auth.auth_helper import get_token
from ccms.graph_helper import send_mail_graph

from django.core.mail import get_connection
from django.core.mail import EmailMessage


def send_email(title, body, my_username):

    ccms_group_list = User.objects.filter(groups__name="CCMS Admin")

    connection = get_connection(host='smtp.svcs.entsvcs.com',
                                port=25,
                                username=my_username,
                                use_ssl=False,
                                use_tls=False)

    email = EmailMessage(
        title,
        body,
        'cba-ccms@donot-reply.com',
        [item.email for item in ccms_group_list],
        connection=connection
    )
    # email.attach_file()
    email.send()


class MailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mail
        fields = '__all__'


class Mailbox_MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mailbox_Monitor
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
        # fields = ['id', 'username', 'email', 'groups']
        read_only_fields = ('username', 'email')
        exclude = ['password']


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
        co = CCMSOwner.objects.create(user=u)

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
    id = serializers.IntegerField(required=False)

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

    is_rca_completed = serializers.SerializerMethodField()

    def get_is_rca_completed(self, obj):

        try:
            query = CcmsRca.objects.get(ccms=obj.id)
            return True if query.completed_on else False
        except CcmsRca.DoesNotExist:
            return False

    cba_auth_user = Auth_DetailsSerializer(required=False)

    class Meta:
        model = Ccms
        fields = '__all__'
        # depth = 2

    def update(self, instance, validated_data):

        ccms_instance = Ccms.objects.get(pk=instance.id)

        if "cba_auth_user" in validated_data.keys():
            cba_auth_user = validated_data.pop('cba_auth_user')
            user = Auth_Details.objects.get(id=cba_auth_user['id'])
            token = {
                "token_type": "Bearer",
                "scope": [
                    "Calendars.Read",
                    "Mail.Read",
                    "Mail.Read.Shared",
                    "Mail.ReadWrite",
                    "Mail.Send",
                    "openid",
                    "profile",
                    "User.Read",
                    "User.ReadBasic.All",
                    "email"
                ],
                "expires_in": cba_auth_user['expires_in'],
                "ext_expires_in": cba_auth_user['ext_expires_in'],
                "access_token": cba_auth_user['access_token'],
                "refresh_token": cba_auth_user['refresh_token'],
                "id_token": cba_auth_user['id_token'],
                "expires_at": cba_auth_user['expires_at']
            }

        if "ticket_status" in validated_data.keys():
            ticket_status = validated_data.pop('ticket_status')
            instance.ticket_status = TicketStatus.objects.get(**ticket_status)
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
            ccms_status_obj = CCMSStatus.objects.get(
                id=ccms_status['id'])
            instance.ccms_status = ccms_status_obj
            instance.save()

        if "ccms_owner" in validated_data.keys():
            ccms_owner = validated_data.pop('ccms_owner')
            validated_ccms_owner = CCMSOwner.objects.get(id=ccms_owner['id'])
            prev_ccms_owner = instance.ccms_owner

            instance.ccms_owner = validated_ccms_owner

            # SEND EMAIL CONDITIONS
            # CHANGE OF OWNERSHIP >> INDENTIFIER IS ALWAYS is instance.ccms_owner
            # instance.ccms_owner == None not yet submitted

            # if prev_ccms_owner != None:

            #     if validated_ccms_owner.id != prev_ccms_owner.id:

            #         print("new owner send email")

            #         # create comment on owner change
            #         comment = Comment.objects.create(
            #             contributor=user, ccms=ccms_instance, entry=f"Assigned by {user.user.username}", ccms_status_during_comment=ccms_instance.ccms_status.name or ccms_status_obj.name)
            #         comment.save()

            #         # SEND EMAIL TO OWNER
            #         send_mail_graph(token=token, subject=f"CCMS: {ccms_instance.id}", recipients=[
            #             "mark.lascano@dxc.com"], body=f"Assigned by {user.user.username}")

            #         # BELOW WILL BE USED FOR PRODUCTION
            #         # send_email(f"{CCMS: ccms_instance.id}", f"Assigned by {user.username}")

            instance.save()

        # if rca_required is true > create a CcmsRca object
        # required ccms id == instance.id

        if instance.rca_required:
            CcmsRca.objects.update_or_create(ccms=ccms_instance)
        else:
            try:
                CcmsRca.objects.get(ccms=ccms_instance).delete()
            except CcmsRca.DoesNotExist:
                print("does not exists")

        prev_instance_date_acknowledged = instance.date_acknowledged

        instance.date_acknowledged = instance.date_acknowledged or datetime.now().date()

        instance = super().update(instance, validated_data)
        instance.save()

        # if not prev_instance_date_acknowledged:
        #     print("NEWLY COMPLETED CCMS!!! SEND EMAIL")

        #     # SEND EMAIL TO OWNER
        #     send_mail_graph(token=token, subject=f"CCMS: {ccms_instance.id}", recipients=[
        #                     "mark.lascano@dxc.com"], body=f"Assigned by {user.user.username}")

        #         # BELOW WILL BE USED FOR PRODUCTION
        #         # send_email(f"{CCMS: ccms_instance.id}", f"Assigned by {user.username}")

        return instance


class CommentSerializer(serializers.ModelSerializer):

    ccms = CcmsSerializer(required=False)
    contributor = Auth_DetailsSerializer(required=False)
    ccms_status = CCMSStatusSerializer(required=False)

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):

        # get CCMS obj for updating CCMS Status
        ccms = validated_data.pop('ccms')
        ccms_obj = Ccms.objects.get(id=ccms['id'])

        # get ccms_status to update CCMS obj
        ccms_status = validated_data.pop('ccms_status')
        ccms_status_obj = CCMSStatus.objects.get(id=ccms_status['id'])

        # update and save ccms obj
        ccms_obj.ccms_status = ccms_status_obj
        ccms_obj.save()

        # get contributor
        contributor = validated_data.pop('contributor')

        user = Auth_Details.objects.get(id=contributor['id'])

        # create comment entry

        comment = Comment.objects.create(
            contributor=user, ccms=ccms_obj, **validated_data, ccms_status_during_comment=ccms_status['name'])
        comment.save()

        # SEND EMAIL TO OWNER
        # recipients = [ccms_obj.ccms_owner.user.email, ]

        token = {
            "token_type": "Bearer",
            "scope": [
                "Calendars.Read",
                "Mail.Read",
                "Mail.Read.Shared",
                "Mail.ReadWrite",
                "Mail.Send",
                "openid",
                "profile",
                "User.Read",
                "User.ReadBasic.All",
                "email"
            ],
            "expires_in": user.expires_in,
            "ext_expires_in": user.ext_expires_in,
            "access_token": user.access_token,
            "refresh_token": user.refresh_token,
            "id_token": user.id_token,
            "expires_at": user.expires_at
        }

        # try:
        #     send_mail_graph(token=token, subject=f"CCMS ID: {ccms_obj.id} Update", recipients=[
        #         "mark.lascano@dxc.com"], body=f"Update - {comment.entry}")
        # except:
        #     print("An error occured while sending an email")

        # BELOW WILL BE USED FOR PRODUCTION
        send_email(f"CCMS ID: {ccms_obj.id} Update", f"Update - {comment.entry}", {user.user.username})

        return comment


class CcmsAccessRequestSerializer(serializers.ModelSerializer):

    user = Auth_DetailsSerializer(required=False)

    class Meta:
        model = CcmsAccessRequest
        fields = '__all__'

    def create(self, validated_data):

        auth_user = validated_data.pop('user')
        print(auth_user)

        auth_obj = Auth_Details.objects.get(pk=auth_user['id'])

        access_request = CcmsAccessRequest.objects.create(user=auth_obj)
        access_request.save()

        return access_request


class CauseCodeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = CauseCode
        fields = '__all__'


class EscalationDriverSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = EscalationDriver
        fields = '__all__'


class EscalationDriverCauseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = EscalationDriverCause
        fields = '__all__'


class CcmsRcaSerializer(serializers.ModelSerializer):

    agent_silo = SiloSerializer(required=False)
    controllability = AccountableTeamSerializer(required=False)
    cause_code = SiloSerializer(required=False)
    escalation_driver = SiloSerializer(required=False)
    escalation_driver_cause = SiloSerializer(required=False)

    class Meta:
        model = CcmsRca
        fields = '__all__'

    def update(self, instance, validated_data):

        if "agent_silo" in validated_data.keys():
            agent_silo = validated_data.pop('agent_silo')
            instance.agent_silo = Silo.objects.get(
                id=agent_silo['id'])
            instance.save()

        if "controllability" in validated_data.keys():
            controllability = validated_data.pop('controllability')
            instance.controllability = AccountableTeam.objects.get(
                id=controllability['id'])
            instance.save()

        if "cause_code" in validated_data.keys():
            cause_code = validated_data.pop('cause_code')
            instance.cause_code = CauseCode.objects.get(
                id=cause_code['id'])
            instance.save()

        if "escalation_driver" in validated_data.keys():
            escalation_driver = validated_data.pop('escalation_driver')
            instance.escalation_driver = EscalationDriver.objects.get(
                id=escalation_driver['id'])
            instance.save()

        if "escalation_driver_cause" in validated_data.keys():
            escalation_driver_cause = validated_data.pop(
                'escalation_driver_cause')
            instance.escalation_driver_cause = EscalationDriverCause.objects.get(
                id=escalation_driver_cause['id'])
            instance.save()

        instance = super().update(instance, validated_data)

        instance.completed_on = instance.completed_on or datetime.now().date()

        instance.save()

        return instance

        #  FindingsAndInvestigation,
        #  CorrectiveAction


class FindingsAndInvestigationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = FindingsAndInvestigation
        fields = '__all__'


class CorrectiveActionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    ticket_number = serializers.SerializerMethodField()

    def get_ticket_number(self, obj):

        return obj.fni.ticket_number

    class Meta:
        model = CorrectiveAction
        fields = '__all__'
