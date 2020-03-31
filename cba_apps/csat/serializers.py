from rest_framework import serializers
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers as se
import json

from .models import Survey, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, AccountableTeam
from django.core.exceptions import FieldDoesNotExist

from agents.models import AgentSkill, Agent, Team, TeamMember
from agents.serializer import AgentSerializer, TeamMemberSerializer

from django.contrib.auth.models import User


class RCAInitialSerializer(serializers.ModelSerializer):

    # agent = AgentSerializer()
    agent = AgentSerializer()

    class Meta:
        model = RCA
        fields = '__all__'
        depth = 2


class SurveySerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    # owner_name = serializers.SerializerMethodField()

    # def get_owner_name(self, obj):

    #     return obj.agent.name

    # operator_lan_id = serializers.SerializerMethodField()

    # def get_operator_lan_id(self, obj):

    #     return obj.agent.operator_lan_id

    # rca = serializers.HyperlinkedRelatedField(
    #     many=False,
    #     read_only=True,
    #     view_name='rca-detail'
    # )

    def to_representation(self, instance):
        # return {
        #     'score': "test",
        #     'player_name': "TEST"
        # }

        ret = super().to_representation(instance)
        data = RCA.objects.get(
            surveyed_ticket=instance.reference_number)
        ret['rca'] = RCAInitialSerializer(data).data
        # ret['rca'] = JsonResponse(data[0])

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

        tm_obj = TeamMember.objects.get_or_create(
            agent=agent_obj, team=team_obj)

        # CREATE SURVEY
        survey = Survey.objects.create(**validated_data)

        # CREATE RCA ENTRY

        rca = RCA.objects.create(surveyed_ticket=survey, agent=agent_obj)

        print("SEND EMAIL NOTIF TO RECIPIENTS")

        return survey


class DSAT_Code1Serializer(serializers.ModelSerializer):

    class Meta:
        model = DSAT_Code1
        fields = '__all__'

        # extra_kwargs = {
        #     'id': {
        #         'validators': []
        #     },
        #     'name': {
        #         'validators': []
        #     }
        # }


class BB_Driver_Code2Serializer(serializers.ModelSerializer):

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


class SurveySerializerRca(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = "__all__"


class RCASerializer(serializers.ModelSerializer):

    surveyed_ticket = SurveySerializerRca(required=False)
    agent = AgentSerializer(required=False)

    class Meta:
        model = RCA
        fields = '__all__'

    # def update_or_create_dsat_cause(self, validated_data):

    #     data = validated_data.pop('dsat_cause', None)

    #     if not data:
    #         return None

    #     dsat_cause, created = DSAT_Code1.objects.update_or_create(
    #         name=data.pop('name'), defaults=data)

    #     validated_data['dsat_cause'] = dsat_cause

    # def update_or_create_bb_driver_code2(self, validated_data):

    #     data = validated_data.pop('bb_driver_code2', None)

    #     if not data:
    #         return None

    #     bb_driver_code2, created = BB_Driver_Code2.objects.update_or_create(
    #         name=data.pop('name'), dsat_Code1=data.pop('dsat_Code1'), defaults=data)

    #     validated_data['bb_driver_code2'] = bb_driver_code2

    # def update_or_create_bb_driver_code3(self, validated_data):

    #     data = validated_data.pop('bb_driver_code3', None)

    #     if not data:
    #         return None

    #     bb_driver_code3, created = BB_Driver_Code3.objects.update_or_create(
    #         name=data.pop('name'), bb_Driver_Code2=data.pop('bb_Driver_Code2'), defaults=data)

    #     validated_data['bb_driver_code3'] = bb_driver_code3

    # def create(self, validated_data):
    #     self.update_or_create_dsat_cause(validated_data)
    #     self.update_or_create_bb_driver_code2(validated_data)
    #     self.update_or_create_bb_driver_code3(validated_data)
    #     return super(RCASerializer, self).create(validated_data)

    # def update(self, instance, validated_data):
    #     self.update_or_create_dsat_cause(validated_data)
    #     self.update_or_create_bb_driver_code2(validated_data)
    #     self.update_or_create_bb_driver_code3(validated_data)
    #     return super(RCASerializer, self).update(instance, validated_data)


class AccountableTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountableTeam
        fields = '__all__'
