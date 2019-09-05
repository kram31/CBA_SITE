from rest_framework import serializers
from .models import Agent, Skill, TeamLead


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class TeamLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamLead
        fields = '__all__'
