from rest_framework import serializers
from .models import Agent, AgentSkill, TeamLead, Team, TeamMember, CsatAdministrator
from ccms.serializers import UserSerializer

from django.contrib.auth.models import User


class AgentSkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = AgentSkill
        fields = '__all__'

    def create(self, validated_data):

        validated_name = validated_data.pop('name')

        agent_skill_qs = AgentSkill.objects.filter(
            name=validated_name)

        if agent_skill_qs.exists():
            agent_skill_obj = agent_skill_qs.first()
        else:
            agent_skill_obj = AgentSkill.objects.create(name=validated_name)

        return agent_skill_obj


class UserAgentSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = '__all__'
        # read_only_fields = ('username', 'email')
        fields = ('id', 'first_name', "last_name", 'username', 'email')
        # exclude = ['password']
        extra_kwargs = {
            'username': {'validators': []},
        }

        # exclude = ["username", "password"]

        # extra_kwargs = {
        #     'username': {
        #         'validators': []
        #     }
        # }
    def update(self, instance, validated_data):

        print("FROM USER SERIAL")

        return instance


class TeamLeadSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    # user = UserSerializer(required=False)
    user = UserAgentSerializer()

    class Meta:
        model = TeamLead
        fields = '__all__'
        # read_only_fields = ('user',)

    def create(self, validated_data):

        validated_user = validated_data.pop('user')

        tl_qs = TeamLead.objects.filter(
            user__username=validated_user['username'])

        if tl_qs.exists():
            tl_obj = tl_qs.first()
        else:
            user_qs = User.objects.filter(username=validated_user['username'])

            if user_qs.exists():
                user_obj = user_qs.first()
            else:
                user_obj = User.objects.create_user(
                    username=validated_user['username'], email=validated_user['username'], first_name=validated_user['first_name'], last_name=validated_user['last_name'])

            tl_obj = TeamLead.objects.create(user=user_obj)

        return tl_obj

    def update(self, instance, validated_data):

        user = validated_data.pop("user")

        user_qs = User.objects.filter(username=user["username"])

        if user_qs.exists():
            user_obj = user_qs.first()
            for attr, value in validated_data['user'].items():
                setattr(user_obj, attr, value)
            user_obj.save()
        else:
            user_obj = User.objects.create_user(
                username=user['username'], email=user['username'], first_name=user['first_name'], last_name=user['last_name'])

        instance.user = user_obj

        instance.save()

        return instance


class CsatAdministratorSerializer(serializers.ModelSerializer):

    user = UserAgentSerializer()

    class Meta:
        model = CsatAdministrator
        fields = '__all__'

    def create(self, validated_data):

        validated_user = validated_data.pop('user')

        csat_admin_qs = CsatAdministrator.objects.filter(
            user__username=validated_user['username'])

        if csat_admin_qs.exists():
            csat_admin_obj = csat_admin_qs.first()
        else:
            user = User.objects.get(
                username=validated_user['username'])
            csat_admin_obj = CsatAdministrator.objects.create(user=user)

        return csat_admin_obj

# FIX UPDATE METHOD OF TEAMSERIALIZER


class TeamReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = '__all__'
        depth = 2


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    agent_skill = AgentSkillSerializer(required=False)
    # team_leads = serializers.PrimaryKeyRelatedField(
    #     many=True, read_only=False, queryset=TeamLead.objects.all())
    team_leads = TeamLeadSerializer(many=True, read_only=False)

    class Meta:
        model = Team
        fields = '__all__'

    def update(self, instance, validated_data):

        leads_data = validated_data.pop('team_leads')

        instance.team_leads.clear()

        for lead in leads_data:

            lead_qs = TeamLead.objects.filter(
                user__username=lead['user']['username'])

            if lead_qs.exists():
                lead_obj = lead_qs.first()
            else:
                user = User.objects.get(
                    username=lead['user']['username'])
                lead_obj = TeamLead.objects.create(user=user)

            instance.team_leads.add(lead_obj)
            # instance.user =

        return instance

    def create(self, validated_data):

        validated_agent_skill = validated_data.pop('agent_skill')

        team_qs = Team.objects.filter(
            agent_skill__name=validated_agent_skill['name'])

        if team_qs.exists():
            team_obj = team_qs.first()
        else:
            agent_skill_qs = AgentSkill.objects.filter(
                name=validated_agent_skill['name'])

            if agent_skill_qs.exists():
                agent_skill_obj = agent_skill_qs.first()
            else:
                agent_skill_obj = AgentSkill.objects.create(
                    name=validated_agent_skill['name'])

            team_obj = Team.objects.create(agent_skill=agent_skill_obj)

        validated_team_leads = validated_data.pop('team_leads')

        for lead in validated_team_leads:

            lead_qs = TeamLead.objects.filter(
                user__username=lead['user']['username'])

            if lead_qs.exists():
                lead_obj = lead_qs.first()
            else:
                user = User.objects.get(
                    username=lead['user']['username'])
                lead_obj = TeamLead.objects.create(user=user)

            team_obj.team_leads.add(lead_obj)

        return team_obj


class TeamMemberSerializer(serializers.ModelSerializer):

    team = TeamReadSerializer()

    class Meta:
        model = TeamMember
        fields = '__all__'


class AgentSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    teams = TeamSerializer(many=True, read_only=False)

    user = UserAgentSerializer(required=False)

    class Meta:
        model = Agent
        fields = '__all__'

        extra_kwargs = {
            'teams': {'validators': []},
            'operator_lan_id': {'validators': []},
        }

    def update(self, instance, validated_data):

        teams_data = validated_data.pop('teams')

        instance.teams.clear()

        for team in teams_data:

            team_qs = Team.objects.filter(id=team['id'])

            if team_qs.exists():
                team_obj = team_qs.first()
            else:
                team_obj = Team.objects.create(**team)

            instance.teams.add(team_obj)

        return instance

    def create(self, validated_data):

        request_data = self.context.get("request").data

        validated_operator_lan_id = validated_data.pop('operator_lan_id')
        # validated_operator_lan_id = request_data.get('operator_lan_id').strip()
        validated_location = validated_data.pop('location')
        validated_wave = validated_data.pop('wave')

        owner_email_add = request_data.get('owner_name_email_address').strip()
        owner_name = request_data.get('owner_name').strip()

        # CREATE/GET USER OBJ

        user_qs = User.objects.filter(username=owner_email_add)

        if user_qs.exists():
            user_obj = user_qs.first()
        else:
            if owner_name == "ITSD_AskIT_Ticket_Triage":
                user_qs = User.objects.filter(
                    username="ITSD_AskIT_Ticket_Triage")
                if user_qs.exists():
                    user_obj = user_qs.first()
                else:
                    user_obj = User.objects.create_user(
                        "ITSD_AskIT_Ticket_Triage", "ITSD_AskIT_Ticket_Triage", '1234')

            else:

                *firstname, lastname = owner_name.split(" ")
                firstname = " ".join(firstname)

                user_obj = User.objects.create_user(
                    owner_email_add, owner_email_add, '1234', first_name=firstname, last_name=lastname)

        # if not User.objects.filter(username=owner_email_add).exists():
        #     # CREATE USER LOGIN

        #     # print("FROM USER QUERY", owner_email_add,
        #     #       User.objects.filter(email=owner_email_add).exists())

        #     if owner_name == "ITSD_AskIT_Ticket_Triage":
        #         if not User.objects.filter(username="ITSD_AskIT_Ticket_Triage").exists():
        #             user_obj = User.objects.create_user(
        #                 "ITSD_AskIT_Ticket_Triage", "ITSD_AskIT_Ticket_Triage", '1234')
        #             user_obj.save()
        #         else:
        #             print("SHOULD WORK")
        #             user_obj = User.objects.get(
        #                 username="ITSD_AskIT_Ticket_Triage")

        #     else:
        #         print("&&&&&&&&FROM USER CREATION/ DOES NOT EXIST",
        #               User.objects.filter(username=owner_email_add).exists(), owner_email_add)
        #         *firstname, lastname = owner_name.split(" ")
        #         firstname = " ".join(firstname)

        #         user_obj = User.objects.create_user(
        #             owner_email_add, owner_email_add, '1234', first_name=firstname, last_name=lastname)
        #         user_obj.save()

        # else:
        #     # print("SHOULD NOT WORK")
        #     user_obj = User.objects.get(email=owner_email_add)

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

        # CREATE/GET agent_skill

        agent_skill_qs = AgentSkill.objects.filter(name=scope)

        if agent_skill_qs.exists():
            agent_skill_obj = agent_skill_qs.first()
        else:
            agent_skill_obj = AgentSkill.objects.create(name=scope)

        if not Team.objects.filter(agent_skill__name=scope).exists():
            team_obj = Team.objects.create(agent_skill=agent_skill_obj)
        else:
            team_obj = Team.objects.get(agent_skill__name=scope)

        # ADD AGENT AS MEMBER OF THE TEAM AS PER SCOPE

        agent_obj.teams.add(team_obj)

        # tm_obj = TeamMember.objects.get_or_create(
        #     agent=agent_obj, team=team_obj)

        return agent_obj
