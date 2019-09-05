from rest_framework import viewsets, permissions
from .models import Agent, Skill, TeamLead
from .serializer import AgentSerializer, SkillSerializer, TeamLeadSerializer


class AgentViewset(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class SkillViewset(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TeamLeadViewset(viewsets.ModelViewSet):
    queryset = TeamLead.objects.all()
    serializer_class = TeamLeadSerializer
    permission_classes = [
        permissions.AllowAny
    ]
