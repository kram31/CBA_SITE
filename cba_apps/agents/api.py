from rest_framework import viewsets, permissions
from .models import Agent, AgentSkill, TeamLead, Team, TeamMember, CsatAdministrator
from .serializer import AgentSerializer, AgentSkillSerializer, TeamLeadSerializer, TeamSerializer, TeamMemberSerializer, TeamReadSerializer, CsatAdministratorSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication


class CsatAdministratorViewset(viewsets.ModelViewSet):
    queryset = CsatAdministrator.objects.all()
    serializer_class = CsatAdministratorSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TeamReadViewset(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamReadSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class AgentViewset(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class AgentSkillViewset(viewsets.ModelViewSet):
    queryset = AgentSkill.objects.all()
    serializer_class = AgentSkillSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TeamLeadViewset(viewsets.ModelViewSet):
    queryset = TeamLead.objects.all()
    serializer_class = TeamLeadSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TeamViewset(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TeamMemberViewset(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    authentication_classes = [TokenAuthentication, ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['agent', ]
    permission_classes = [
        permissions.AllowAny
    ]
