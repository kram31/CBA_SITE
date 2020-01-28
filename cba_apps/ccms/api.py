from rest_framework import viewsets, permissions
from .models import (
    Mail, 
    Mailbox_Monitor, 
    Comment, 
    Ccms, 
    BusinessUnit, 
    EscalationType, 
    CCMSStatus, 
    TicketStatus, 
    Silo, 
    SiteCode, 
    CCMSOwner, 
    AccountableTeam, 
    TicketType
)
from .serializers import (
    MailSerializer, 
    Mailbox_MonitorSerializer, 
    CommentSerializer,
    CcmsSerializer, 
    BusinessUnitSerializer, 
    EscalationTypeSerializer, 
    CCMSStatusSerializer, 
    TicketStatusSerializer, 
    SiloSerializer, 
    SiteCodeSerializer, 
    CCMSOwnerSerializer, 
    AccountableTeamSerializer, 
    TicketTypeSerializer
)


class TicketTypeViewset(viewsets.ModelViewSet):
    queryset = TicketType.objects.all()
    serializer_class = TicketTypeSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    

class AccountableTeamViewset(viewsets.ModelViewSet):
    queryset = AccountableTeam.objects.all()
    serializer_class = AccountableTeamSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    

class CCMSOwnerViewset(viewsets.ModelViewSet):
    queryset = CCMSOwner.objects.all()
    serializer_class = CCMSOwnerSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    

class SiteCodeViewset(viewsets.ModelViewSet):
    queryset = SiteCode.objects.all()
    serializer_class = SiteCodeSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    

class SiloViewset(viewsets.ModelViewSet):
    queryset = Silo.objects.all()
    serializer_class = SiloSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    

class TicketStatusViewset(viewsets.ModelViewSet):
    queryset = TicketStatus.objects.all()
    serializer_class = TicketStatusSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class CCMSStatusViewset(viewsets.ModelViewSet):
    queryset = CCMSStatus.objects.all()
    serializer_class = CCMSStatusSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class EscalationTypeViewset(viewsets.ModelViewSet):
    queryset = EscalationType.objects.all()
    serializer_class = EscalationTypeSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class BusinessUnitViewset(viewsets.ModelViewSet):
    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class CcmsViewset(viewsets.ModelViewSet):
    queryset = Ccms.objects.all()
    serializer_class = CcmsSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class MailViewset(viewsets.ModelViewSet):
    queryset = Mail.objects.all()
    serializer_class = MailSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class Mailbox_MonitorViewset(viewsets.ModelViewSet):
    queryset = Mailbox_Monitor.objects.all()
    serializer_class = Mailbox_MonitorSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class CommentViewset(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
