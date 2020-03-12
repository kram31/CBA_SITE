from rest_framework import serializers
from .models import Agent, AgentSkill, TeamLead, Team, TeamMember


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
    team_lead = TeamLeadSerializer()

    class Meta:
        model = Team
        fields = '__all__'


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

    # surveys = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     read_only=True

    # )

    class Meta:
        model = Agent
        fields = '__all__'
