from rest_framework import viewsets, permissions
from .models import Agent, AgentSkill, TeamLead, Team, TeamMember
from .serializer import AgentSerializer, AgentSkillSerializer, TeamLeadSerializer, TeamSerializer, TeamMemberSerializer


class AgentViewset(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class AgentSkillViewset(viewsets.ModelViewSet):
    queryset = AgentSkill.objects.all()
    serializer_class = AgentSkillSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TeamLeadViewset(viewsets.ModelViewSet):
    queryset = TeamLead.objects.all()
    serializer_class = TeamLeadSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TeamViewset(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TeamMemberViewset(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [
        permissions.AllowAny
    ]
