from django.urls import path

from rest_framework import routers
from . import views

from .api import (
    MailViewset,
    Mailbox_MonitorViewset,
    CommentViewset,
    CcmsViewset,
    BusinessUnitViewset,
    EscalationTypeViewset,
    CCMSStatusViewset,
    TicketStatusViewset,
    SiloViewset,
    SiteCodeViewset,
    CCMSOwnerViewset,
    AccountableTeamViewset,
    TicketTypeViewset,
    UserViewset,
    CCMSOwnerListViewset,
    CcmsAccessRequestViewset,
    CauseCodeViewset,
    EscalationDriverViewset,
    EscalationDriverCauseViewset,
    CcmsRcaViewset,
    FindingsAndInvestigationViewset,
    CorrectiveActionViewset
)

urlpatterns = [

    path('control', views.app_control_view, name='control'),
]

router = routers.DefaultRouter()
router.register('api/mails', MailViewset, 'mails')
router.register('api/mailbox_monitor',
                Mailbox_MonitorViewset, 'mailbox_monitor')
router.register('api/comments', CommentViewset, 'comments')
router.register('api/ccms', CcmsViewset, 'ccms')
router.register('api/business_unit', BusinessUnitViewset, 'business_unit')
router.register('api/escalation_type',
                EscalationTypeViewset, 'escalation_type')
router.register('api/ccms_status', CCMSStatusViewset, 'ccms_status')
router.register('api/ticket_status', TicketStatusViewset, 'ticket_status')
router.register('api/silo', SiloViewset, 'silo')
router.register('api/site_code', SiteCodeViewset, 'site_code')
router.register('api/ccms_owners', CCMSOwnerViewset, 'ccms_owners')
router.register('api/accountable_team',
                AccountableTeamViewset, 'accountable_team')
router.register('api/ticket_type', TicketTypeViewset, 'ticket_type')
router.register('api/users', UserViewset, 'users')
router.register('api/ccms_owner_list', CCMSOwnerListViewset, 'ccms_owner_list')
router.register('api/ccms_access_request',
                CcmsAccessRequestViewset, 'ccms_access_request')
router.register('api/cause_code', CauseCodeViewset, 'cause_code')
router.register('api/escalation_driver',
                EscalationDriverViewset, 'escalation_driver')
router.register('api/escalation_driver_cause',
                EscalationDriverCauseViewset, 'escalation_driver_cause')
router.register('api/ccms_rca',
                CcmsRcaViewset, 'ccms_rca')
router.register('api/findings_and_investigation',
                FindingsAndInvestigationViewset, 'findings_and_investigation')
router.register('api/corrective_action',
                CorrectiveActionViewset, 'corrective_action')

urlpatterns.extend(router.urls)
