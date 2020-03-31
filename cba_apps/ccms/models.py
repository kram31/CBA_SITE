from django.db import models
from django.contrib.auth.models import User
from cba_auth.models import Auth_Details

# mail, is_acknowledged?, acknowledged_by, is_resolved?, date_acknowledged


class Mail(models.Model):
    mail_id = models.CharField(editable=False, max_length=5000)
    email_subject = models.CharField(max_length=2000, blank=True)
    email_body = models.TextField(blank=True)
    sender_name = models.CharField(max_length=2000, blank=True)
    sender_email_address = models.CharField(max_length=2000, blank=True)
    receivedDateTime = models.CharField(max_length=2000, blank=True)

    def __str__(self):
        return self.email_subject


class Ccms(models.Model):

    mail = models.ForeignKey(
        "Mail", on_delete=models.CASCADE, related_name="mails", blank=True)
    acknowledged_by = models.CharField(max_length=2000, blank=True)
    is_acknowledged = models.BooleanField(default=False)
    is_resolved = models.BooleanField(default=False, blank=True)
    date_acknowledged = models.CharField(max_length=2000, blank=True)

    escalated_ticket = models.CharField(max_length=2000, blank=True)
    escalated_by = models.CharField(max_length=2000, blank=True)
    escalated_name = models.CharField(max_length=2000, blank=True)
    lan_id = models.CharField(max_length=2000, blank=True)
    escalated_email_address = models.EmailField(blank=True)
    specific_business_unit = models.CharField(max_length=2000, blank=True)
    specific_business_unit = models.CharField(max_length=2000, blank=True)
    rca_required = models.BooleanField(default=False)
    is_complaint = models.BooleanField(default=False)
    # is_compliment = models.BooleanField(default=False)
    summary_complaint = models.TextField(blank=True)

    business_unit = models.ForeignKey(
        "BusinessUnit", on_delete=models.SET_NULL, related_name="business_units", blank=True, null=True)
    escalation_type = models.ForeignKey(
        "EscalationType", on_delete=models.SET_NULL, related_name="escalation_types", blank=True, null=True)
    ccms_status = models.ForeignKey(
        "CCMSStatus", on_delete=models.SET_NULL, related_name="ccms_status", blank=True, null=True)
    ticket_status = models.ForeignKey(
        "TicketStatus", on_delete=models.SET_NULL, related_name="ticket_status", blank=True, null=True)
    silo = models.ForeignKey(
        "Silo", on_delete=models.SET_NULL, related_name="silos", blank=True, null=True)
    site_code = models.ForeignKey(
        "SiteCode", on_delete=models.SET_NULL, related_name="site_codes", blank=True, null=True)
    ccms_owner = models.ForeignKey(
        "CCMSOwner", on_delete=models.SET_NULL, related_name="ccms_owners", blank=True, null=True)
    accountable_team = models.ForeignKey(
        "AccountableTeam", on_delete=models.SET_NULL, related_name="accountable_teams", blank=True, null=True)
    ticket_type = models.ForeignKey(
        "TicketType", on_delete=models.SET_NULL, related_name="ticket_types", blank=True, null=True)

    def __str__(self):
        return f"CBA CCMS ID: {str(self.pk)}"


class Mailbox_Monitor(models.Model):
    monitor_on = models.BooleanField(default=False)
    mailbox_name = models.EmailField()

    def __str__(self):
        return self.mailbox_name


# comment_entry_date, contributor_name, ccms_entry(foreign key)
class Comment(models.Model):
    entry = models.TextField()
    contributor = models.ForeignKey(
        Auth_Details, on_delete=models.CASCADE, related_name="contributors", blank=True, null=True)
    comment_entry_date = models.DateField(auto_now=True)
    ccms = models.ForeignKey(
        "Ccms", on_delete=models.CASCADE, related_name="ccms", blank=True, null=True)
    ccms_status_during_comment = models.CharField(
        max_length=2000, blank=True, null=True)

    def __str__(self):
        return f"Comment for {self.ccms}"


class BusinessUnit(models.Model):
    name = models.CharField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.name


class EscalationType(models.Model):
    name = models.CharField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.name


class CCMSStatus(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class TicketStatus(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class Silo(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class SiteCode(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class CCMSOwner(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="users", blank=True, null=True)

    def __str__(self):
        return self.user.username


class AccountableTeam(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class TicketType(models.Model):
    name = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class CcmsAccessRequest(models.Model):
    user = models.ForeignKey(Auth_Details, on_delete=models.CASCADE,
                             related_name="users", blank=True)

    def __str__(self):
        return self.user.user.username


class CauseCode(models.Model):
    name = models.CharField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.name


class EscalationDriver(models.Model):
    name = models.CharField(max_length=2000, blank=True, null=True)
    cause_code = models.ForeignKey(
        CauseCode, on_delete=models.CASCADE, related_name="cause_codes")

    def __str__(self):
        return self.name


class EscalationDriverCause(models.Model):
    name = models.CharField(max_length=2000, blank=True, null=True)
    escalation_driver = models.ForeignKey(
        EscalationDriver, on_delete=models.CASCADE, related_name="escalation_drivers")

    def __str__(self):
        return self.name


class CcmsRca(models.Model):

    agent_name = models.CharField(max_length=2000, blank=True, null=True)

    agent_silo = models.ForeignKey(
        "Silo", on_delete=models.SET_NULL, related_name="agent_silos", blank=True, null=True)

    ticket_description = models.CharField(
        max_length=5000, blank=True, null=True)

    ccms_ticket_description = models.CharField(
        max_length=5000, blank=True, null=True)

    controllability = models.ForeignKey(
        "AccountableTeam", on_delete=models.SET_NULL, related_name="controllabilities", blank=True, null=True)

    cause_code = models.ForeignKey(
        CauseCode, on_delete=models.SET_NULL, related_name="rca_cause_codes", blank=True, null=True)

    escalation_driver = models.ForeignKey(
        EscalationDriver, on_delete=models.SET_NULL, related_name="rca_escalation_drivers", blank=True, null=True)

    escalation_driver_cause = models.ForeignKey(
        EscalationDriverCause, on_delete=models.SET_NULL, related_name="rca_escalation_driver_causes", blank=True, null=True)

    team_spg_accountability = models.CharField(
        max_length=2000, blank=True, null=True)

    business_unit = models.CharField(
        max_length=2000, blank=True, null=True)

    specific_bu = models.CharField(
        max_length=2000, blank=True, null=True)

    completed_by = models.ForeignKey(
        Auth_Details, on_delete=models.SET_NULL, related_name="completed_by_rca", blank=True, null=True)

    completed_on = models.CharField(max_length=2000, blank=True)

    ccms = models.ForeignKey(
        "Ccms", on_delete=models.CASCADE, related_name="ccms_rca", blank=True, null=True)

    event_description = models.TextField(blank=True)

    ticket_number = models.CharField(
        max_length=2000, blank=True, null=True)

    def __str__(self):
        return f"CCMS RCA for {self.ccms}"


class FindingsAndInvestigation(models.Model):

    ccms_rca = models.ForeignKey(
        "CcmsRca", on_delete=models.CASCADE, related_name="fni_ccms_rcas", blank=True, null=True)

    ticket_number = models.CharField(max_length=2000, blank=True, null=True)

    agent_name = models.CharField(max_length=2000, blank=True, null=True)

    description = models.TextField(blank=True)

    submitted_date = models.DateField(auto_now=True)

    def __str__(self):
        return f"Findings and Investigation for {self.ccms_rca.id}"


class CorrectiveAction(models.Model):

    fni = models.ForeignKey(
        "FindingsAndInvestigation", on_delete=models.CASCADE, related_name="ca_fni", blank=True, null=True)

    description = models.TextField(blank=True)

    submitted_date = models.DateField(auto_now=True)

    def __str__(self):
        return f"Corrective Action for {self.fni.ticket_number}"


class Recipient(models.Model):

    name = models.EmailField()

    def __str__(self):
        return self.name
