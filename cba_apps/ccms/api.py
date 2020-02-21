from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.authentication import TokenAuthentication


from django.contrib.auth.models import User
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
    TicketType,
    CcmsAccessRequest,
    CauseCode,
    EscalationDriver,
    EscalationDriverCause,
    CcmsRca,
    FindingsAndInvestigation,
    CorrectiveAction
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
    TicketTypeSerializer,
    UserSerializer,
    CcmsAccessRequestSerializer,
    CauseCodeSerializer,
    EscalationDriverSerializer,
    EscalationDriverCauseSerializer,
    CcmsRcaSerializer,
    FindingsAndInvestigationSerializer,
    CorrectiveActionSerializer
)


class CCMSOwnerListViewset(viewsets.ModelViewSet):

    serializer_class = CcmsSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):

        user = self.request.user

        return Ccms.objects.filter(ccms_owner__user__username=user)


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TicketTypeViewset(viewsets.ModelViewSet):
    queryset = TicketType.objects.all()
    serializer_class = TicketTypeSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class AccountableTeamViewset(viewsets.ModelViewSet):
    queryset = AccountableTeam.objects.all()
    serializer_class = AccountableTeamSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CCMSOwnerViewset(viewsets.ModelViewSet):
    queryset = CCMSOwner.objects.all()
    serializer_class = CCMSOwnerSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class SiteCodeViewset(viewsets.ModelViewSet):
    queryset = SiteCode.objects.all()
    serializer_class = SiteCodeSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class SiloViewset(viewsets.ModelViewSet):
    queryset = Silo.objects.all()
    serializer_class = SiloSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class TicketStatusViewset(viewsets.ModelViewSet):
    queryset = TicketStatus.objects.all()
    serializer_class = TicketStatusSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CCMSStatusViewset(viewsets.ModelViewSet):
    queryset = CCMSStatus.objects.all()
    serializer_class = CCMSStatusSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class EscalationTypeViewset(viewsets.ModelViewSet):
    queryset = EscalationType.objects.all()
    serializer_class = EscalationTypeSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class BusinessUnitViewset(viewsets.ModelViewSet):
    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CcmsViewset(viewsets.ModelViewSet):
    queryset = Ccms.objects.all()
    serializer_class = CcmsSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class MailViewset(viewsets.ModelViewSet):
    queryset = Mail.objects.all()
    serializer_class = MailSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class Mailbox_MonitorViewset(viewsets.ModelViewSet):
    queryset = Mailbox_Monitor.objects.all()
    serializer_class = Mailbox_MonitorSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


# @csrf_exempt
class CommentViewset(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ccms__id', ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CcmsAccessRequestViewset(viewsets.ModelViewSet):
    queryset = CcmsAccessRequest.objects.all()
    serializer_class = CcmsAccessRequestSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CauseCodeViewset(viewsets.ModelViewSet):
    queryset = CauseCode.objects.all()
    serializer_class = CauseCodeSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class EscalationDriverViewset(viewsets.ModelViewSet):
    queryset = EscalationDriver.objects.all()
    serializer_class = EscalationDriverSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class EscalationDriverCauseViewset(viewsets.ModelViewSet):
    queryset = EscalationDriverCause.objects.all()
    serializer_class = EscalationDriverCauseSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CcmsRcaViewset(viewsets.ModelViewSet):
    queryset = CcmsRca.objects.all()
    serializer_class = CcmsRcaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ccms__id', ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class FindingsAndInvestigationViewset(viewsets.ModelViewSet):
    queryset = FindingsAndInvestigation.objects.all()
    serializer_class = FindingsAndInvestigationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ccms_rca__id', ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]


class CorrectiveActionViewset(viewsets.ModelViewSet):
    queryset = CorrectiveAction.objects.all()
    serializer_class = CorrectiveActionSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['ccms__id', ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [
        permissions.AllowAny
    ]
