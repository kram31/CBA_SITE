from rest_framework import serializers
from .models import Agent, AgentSkill, TeamLead, Team, TeamMember
from ccms.serializers import UserSerializer

from django.contrib.auth.models import User


class AgentSkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = AgentSkill
        fields = '__all__'


class TeamLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeamLead
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    agent_skill = AgentSkillSerializer()
    team_lead = TeamLeadSerializer(required=False)

    class Meta:
        model = Team
        fields = '__all__'

    def create(self, validated_data):

        validated_agent_skill = validated_data.pop('agent_skill')
        agent_skill = AgentSkill.objects.get(
            name=validated_agent_skill['name'])

        return Team.objects.create(agent_skill=agent_skill)

    # def update_or_create_team(self, validated_data):

    #     data = validated_data.pop('bb_driver_code3', None)

    #     if not data:
    #         return None

    #     bb_driver_code3, created = BB_Driver_Code3.objects.update_or_create(
    #         name=data.pop('name'), bb_Driver_Code2=data.pop('bb_Driver_Code2'), defaults=data)

    #     validated_data['bb_driver_code3'] = bb_driver_code3

    # def update(self, instance, validated_data):
    #     return super(TeamSerializer, self).update(instance, validated_data)


class TeamMemberSerializer(serializers.ModelSerializer):

    team = TeamSerializer()

    class Meta:
        model = TeamMember
        fields = '__all__'


class AgentSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    teams = serializers.SerializerMethodField()

    def get_teams(self, obj):

        team = TeamMember.objects.filter(agent=obj)

        return TeamMemberSerializer(team, many=True).data

    user = UserSerializer(required=False)

    class Meta:
        model = Agent
        fields = '__all__'

    def create(self, validated_data):

        request_data = self.context.get("request").data

        validated_operator_lan_id = validated_data.pop('operator_lan_id')
        validated_location = validated_data.pop('location')
        validated_wave = validated_data.pop('wave')

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

        location = request_data.get('location').strip()
        wave = request_data.get('wave').strip()

        if not Agent.objects.filter(operator_lan_id=validated_operator_lan_id).exists():
            # CREATE USER LOGIN

            if owner_name == "ITSD_AskIT_Ticket_Triage":
                if not Agent.objects.filter(operator_lan_id="ITSD_AskIT_Ticket_Triage").exists():
                    agent_obj = Agent.objects.create(
                        user=user_obj, operator_lan_id="ITSD_AskIT_Ticket_Triage", location=validated_location, wave=validated_wave)
                    agent_obj.save()
                else:
                    agent_obj = Agent.objects.get(
                        operator_lan_id="ITSD_AskIT_Ticket_Triage")
            else:

                agent_obj = Agent.objects.create(
                    user=user_obj, operator_lan_id=validated_operator_lan_id, location=validated_location, wave=validated_wave)
                agent_obj.save()

        else:
            agent_obj = Agent.objects.get(
                operator_lan_id=validated_operator_lan_id)

        scope = request_data.get('scope').strip()

        scope_obj = AgentSkill.objects.get(name=scope)

        if not Team.objects.filter(agent_skill__name=scope).exists():
            team_obj = Team.objects.create(agent_skill=scope_obj)
        else:
            team_obj = Team.objects.get(agent_skill__name=scope)

        # ADD AGENT AS MEMBER OF THE TEAM AS PER SCOPE

        tm_obj = TeamMember.objects.get_or_create(
            agent=agent_obj, team=team_obj)

        return agent_obj
