from datetime import datetime
from rest_framework import serializers
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers as se
import json

from .models import Survey, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, AccountableTeam, CsatAccessRequest
from django.core.exceptions import FieldDoesNotExist

from agents.models import AgentSkill, Agent, Team, TeamMember, CsatAdministrator
from agents.serializer import AgentSerializer, TeamMemberSerializer, AgentSkillSerializer, UserSerializer, UserAgentSerializer

from django.contrib.auth.models import User
from django.core.mail import get_connection
from django.core.mail import EmailMessage


def send_email(title, body, my_username, recipients):

    admin_emails = CsatAdministrator.objects.all(
    ).values_list('user__username', flat=True)

    # ccms_group_list = User.objects.filter(
    #     groups__name="CCMS Admin").values_list("email", flat=True)

    connection = get_connection(host='smtp.svcs.entsvcs.com',
                                port=25,
                                username=my_username,
                                use_ssl=False,
                                use_tls=False)

    email = EmailMessage(
        title,
        body,
        'cba-csat@donot-reply.com',
        recipients,
        cc=[*admin_emails],
        connection=connection
    )
    # email.attach_file()
    email.send()


def send_email_access_req(title, body, my_username):

    admin_emails = CsatAdministrator.objects.all(
    ).values_list('user__username', flat=True)

    # ccms_group_list = User.objects.filter(
    #     groups__name="CCMS Admin").values_list("email", flat=True)

    connection = get_connection(host='smtp.svcs.entsvcs.com',
                                port=25,
                                username=my_username,
                                use_ssl=False,
                                use_tls=False)

    email = EmailMessage(
        title,
        body,
        'cba-csat@donot-reply.com',
        [*admin_emails],
        cc=[my_username, ],
        connection=connection
    )
    # email.attach_file()
    email.send()


class CsatAccessRequestSerializer(serializers.ModelSerializer):

    user = UserAgentSerializer()

    class Meta:
        model = CsatAccessRequest
        fields = '__all__'

    def create(self, validated_data):

        validated_user = validated_data.pop('user')

        ar_qs = CsatAccessRequest.objects.filter(
            user__username=validated_user['username'])

        if ar_qs.exists():
            ar_obj = ar_qs.first()
            print("SEND FOLLOW UP EMAIL", ar_obj)
            send_email_access_req(f"Access Request Follow up for CSAT CBA App - {validated_user['username']}",
                                  f"Access Request Follow up for CSAT CBA App - {validated_user['username']}", validated_user['username'])
        else:
            user = User.objects.get(
                username=validated_user['username'])
            ar_obj = CsatAccessRequest.objects.create(user=user)
            send_email_access_req(f"New Access Request for CSAT CBA App - {validated_user['username']}",
                                  f"New Access Request for CSAT CBA App - {validated_user['username']}", validated_user['username'])

        return ar_obj


class RCAInitialSerializer(serializers.ModelSerializer):

    # agent = AgentSerializer()
    agent = AgentSerializer()

    class Meta:
        model = RCA
        fields = '__all__'
        depth = 2


class SurveySerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    def to_representation(self, instance):

        ret = super().to_representation(instance)
        data = RCA.objects.get(
            surveyed_ticket=instance.reference_number)
        ret['rca'] = RCAInitialSerializer(data).data

        return ret

    class Meta:
        model = Survey
        fields = '__all__'

    def create(self, validated_data):

        # FLOW

        request_data = self.context.get("request").data

        # CREATE AGENTSKILL
        # print(request_data.get('scope'))

        scope = request_data.get('scope').strip()

        if not AgentSkill.objects.filter(name=scope).exists():
            scope_obj = AgentSkill.objects.create(name=scope)
            scope_obj.save()
        else:
            scope_obj = AgentSkill.objects.get(name=scope)

        # CREATE TEAM LEAD

        # CREATE AGENT

        owner_email_add = request_data.get('owner_name_email_address').strip()
        owner_name = request_data.get('owner_name').strip()

        if not User.objects.filter(username=owner_email_add).exists():
            # CREATE USER LOGIN

            # print("FROM USER QUERY", owner_email_add,
            #       User.objects.filter(email=owner_email_add).exists())

            if owner_name == "ITSD_AskIT_Ticket_Triage":
                if not User.objects.filter(username="ITSD_AskIT_Ticket_Triage").exists():
                    user_obj = User.objects.create_user(
                        "ITSD_AskIT_Ticket_Triage", "ITSD_AskIT_Ticket_Triage", '1234')
                    user_obj.save()
                else:
                    print("SHOULD WORK")
                    user_obj = User.objects.get(
                        username="ITSD_AskIT_Ticket_Triage")

            else:
                print("&&&&&&&&FROM USER CREATION/ DOES NOT EXIST",
                      User.objects.filter(username=owner_email_add).exists(), owner_email_add)
                *firstname, lastname = owner_name.split(" ")
                firstname = " ".join(firstname)

                user_obj = User.objects.create_user(
                    owner_email_add, owner_email_add, '1234', first_name=firstname, last_name=lastname)
                user_obj.save()

        else:
            # print("SHOULD NOT WORK")
            user_obj = User.objects.get(email=owner_email_add)

        operator_lan_id = request_data.get('operator_lan_id').strip()
        location = request_data.get('location').strip()
        wave = request_data.get('wave').strip()

        if not Agent.objects.filter(operator_lan_id=operator_lan_id).exists():
            # CREATE USER LOGIN

            if owner_name == "ITSD_AskIT_Ticket_Triage":
                if not Agent.objects.filter(operator_lan_id="ITSD_AskIT_Ticket_Triage").exists():
                    agent_obj = Agent.objects.create(
                        user=user_obj, operator_lan_id="ITSD_AskIT_Ticket_Triage", location=location, wave=wave)
                    agent_obj.save()
                else:
                    agent_obj = Agent.objects.get(
                        operator_lan_id="ITSD_AskIT_Ticket_Triage")
            else:

                agent_obj = Agent.objects.create(
                    user=user_obj, operator_lan_id=operator_lan_id, location=location, wave=wave)
                agent_obj.save()

        else:
            agent_obj = Agent.objects.get(operator_lan_id=operator_lan_id)

        # CREATE TEAM

        scope = request_data.get('scope').strip()

        if not Team.objects.filter(agent_skill__name=scope).exists():
            team_obj = Team.objects.create(agent_skill=scope_obj)
        else:
            team_obj = Team.objects.get(agent_skill__name=scope)

        # ADD AGENT AS MEMBER OF THE TEAM AS PER SCOPE

        agent_obj.teams.add(team_obj)

        # tm_obj = TeamMember.objects.get_or_create(
        #     agent=agent_obj, team=team_obj)

        # CREATE SURVEY
        survey = Survey.objects.create(**validated_data)

        # CREATE RCA ENTRY

        rca = RCA.objects.create(surveyed_ticket=survey, agent=agent_obj)

        print("SEND EMAIL NOTIF TO RECIPIENTS")

        # SEND EMAIL IF TEAM_LEAD IS NOT EMPTY

        # teamlead_list = team_obj.team_leads.values_list(
        #     "user__username", flat=True)

        # if len(teamlead_list):
        #     title = f"New RCA for ticket number {survey.reference_number} - {survey.scope}"
        #     body = f"""New RCA for ticket number {survey.reference_number} - {survey.scope} saved to CBA CSAT App.
        #     Do not reply this is a system generated email."""

        #     send_email(title, body, survey.uploaded_by, teamlead_list)

        return survey


class DSAT_Code1Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = DSAT_Code1
        fields = '__all__'

        extra_kwargs = {
            'id': {
                'validators': []
            },
            'name': {
                'validators': []
            }
        }


class BB_Driver_Code2Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = BB_Driver_Code2
        fields = '__all__'

        extra_kwargs = {
            'id': {
                'validators': []
            },
            'name': {
                'validators': []
            },
            'dsat_Code1': {
                'validators': []
            }

        }


class BB_Driver_Code3Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = BB_Driver_Code3
        fields = '__all__'

        extra_kwargs = {
            'id': {
                'validators': []
            },
            'name': {
                'validators': []
            },
            'bb_Driver_Code2': {
                'validators': []
            }

        }


class AccountableTeamSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    class Meta:
        model = AccountableTeam
        fields = '__all__'

        extra_kwargs = {
            'name': {
                'validators': []
            }
        }


class SurveySerializerRca(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = "__all__"


class AgentSerializerRca(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    # user = UserSerializer(required=False)

    class Meta:
        model = Agent
        fields = "__all__"
        depth = 4


class RCASerializer(serializers.ModelSerializer):

    surveyed_ticket = SurveySerializerRca(required=False, read_only=True)
    agent = AgentSerializerRca(required=False, read_only=True)

    support_silo_issue_based = AgentSkillSerializer(required=False)
    dsat_code1 = DSAT_Code1Serializer(required=False)
    bb_driver_code2 = BB_Driver_Code2Serializer(required=False)
    bb_driver_code3 = BB_Driver_Code3Serializer(required=False)
    accountable_team = AccountableTeamSerializer(required=False)

    class Meta:
        model = RCA
        fields = '__all__'

    def update(self, instance, validated_data):

        request_data = self.context.get("request").data
        user = request_data.get('user')
        surveyed_ticket = request_data.get('surveyed_ticket')

        if "support_silo_issue_based" in validated_data.keys():
            support_silo_issue_based = validated_data.pop(
                'support_silo_issue_based')
            instance.support_silo_issue_based = AgentSkill.objects.get(
                id=support_silo_issue_based['id'])
            instance.save()

        if "dsat_code1" in validated_data.keys():
            dsat_code1 = validated_data.pop('dsat_code1')
            instance.dsat_code1 = DSAT_Code1.objects.get(
                id=dsat_code1['id'])
            instance.save()

        if "bb_driver_code2" in validated_data.keys():
            bb_driver_code2 = validated_data.pop('bb_driver_code2')
            instance.bb_driver_code2 = BB_Driver_Code2.objects.get(
                id=bb_driver_code2['id'])
            instance.save()

        if "bb_driver_code3" in validated_data.keys():
            bb_driver_code3 = validated_data.pop('bb_driver_code3')
            instance.bb_driver_code3 = BB_Driver_Code3.objects.get(
                id=bb_driver_code3['id'])
            instance.save()

        if "accountable_team" in validated_data.keys():
            accountable_team = validated_data.pop(
                'accountable_team')
            instance.accountable_team = AccountableTeam.objects.get(
                name=accountable_team['name'])
            instance.save()

        instance = super().update(instance, validated_data)

        instance.date_completed = instance.date_completed or datetime.now().date()
        instance.completed_by = user['username']

        instance.save()

        send_email(f"CSAT for Ticket Number: {surveyed_ticket['reference_number']} has been completed",
                   f"Completed - Ticket Number: {surveyed_ticket['reference_number']}", user['username'], [user['username'], ])

        return instance
