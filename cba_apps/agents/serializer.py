from rest_framework import serializers
from .models import Agent, Skill, TeamLead


class AgentSerializer(serializers.ModelSerializer):

    surveys = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='survey-detail'
    )

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
