from django.db import models
from agents.models import Agent, AgentSkill

# Create your models here.


class Survey(models.Model):
    reference_number = models.CharField(
        max_length=100, blank=True, primary_key=True)

    callback_reference_number = models.CharField(max_length=100, blank=True)
    related_incident_record = models.CharField(max_length=100, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    site_location = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    user_location = models.CharField(max_length=100, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    vip = models.CharField(max_length=100, blank=True)
    customer_email_address = models.EmailField(blank=True)
    date_time = models.CharField(max_length=100, blank=True)
    origination_source = models.CharField(max_length=100, blank=True)
    call_type = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=100, blank=True)
    service_type = models.CharField(max_length=100, blank=True)
    service = models.CharField(max_length=100, blank=True)
    service_component = models.CharField(max_length=100, blank=True)
    assignment_group = models.CharField(max_length=100, blank=True)
    q1 = models.CharField(max_length=10000, blank=True)
    q2 = models.CharField(max_length=10000, blank=True)
    q2a = models.CharField(max_length=10000, blank=True)
    q3 = models.CharField(max_length=500, blank=True)
    q3a = models.CharField(max_length=10000, blank=True)
    q4 = models.CharField(max_length=10000, blank=True)
    q5 = models.CharField(max_length=10000, blank=True)
    q6 = models.CharField(max_length=10000, blank=True)
    average_score = models.CharField(max_length=100, blank=True)

    fulfillment = models.CharField(max_length=100, blank=True)
    follow_up_comments = models.CharField(max_length=10000, blank=True)
    originating_ticket_description = models.CharField(
        max_length=500, blank=True)
    budi_bu = models.CharField(max_length=100, blank=True)
    budi_lv7 = models.CharField(max_length=100, blank=True)
    bu_catg = models.CharField(max_length=100, blank=True)
    date_issued = models.CharField(max_length=100, blank=True)
    scope = models.CharField(max_length=1000, blank=True)

    bottombox = models.IntegerField(blank=True)
    uploaded_by = models.CharField(max_length=100, blank=True)
    date_uploaded = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):

        self.bottombox = 0 if int(self.q4) >= 3 else 1

        super().save(*args, **kwargs)

    def __str__(self):
        return self.reference_number


class RCA(models.Model):

    CONTROL = (
        ('ITSD Controllable', 'ITSD Controllable'),
        ('Non ITSD Controllable', 'Non ITSD Controllable')
    )

    ANSWER = (
        ('Yes', 'Yes'),
        ('No', 'No')
    )

    surveyed_ticket = models.OneToOneField(
        Survey, on_delete=models.CASCADE, related_name="surveyed_tickets")
    agent = models.ForeignKey(
        Agent, on_delete=models.SET_NULL, null=True, related_name="agents")
    support_silo_issue_based = models.ForeignKey(
        AgentSkill, on_delete=models.SET_NULL, null=True, related_name="agent_skills")
    service = models.CharField(max_length=100, blank=True, null=True)
    service_component = models.CharField(max_length=100, blank=True, null=True)
    brief_description = models.CharField(
        max_length=3000, blank=True, null=True)
    user_verbatim = models.CharField(max_length=3000, blank=True, null=True)
    dsat_code1 = models.ForeignKey(
        'DSAT_Code1', on_delete=models.CASCADE, null=True, related_name="dsat_code1")
    bb_driver_code2 = models.ForeignKey(
        'BB_Driver_Code2', on_delete=models.CASCADE, null=True, related_name="bb_driver_codes_2")
    bb_driver_code3 = models.ForeignKey(
        'BB_Driver_Code3', on_delete=models.CASCADE, null=True, related_name="bb_driver_codes_3")
    actual_issue = models.CharField(max_length=3000, blank=True, null=True)
    controllability = models.CharField(
        max_length=100, choices=CONTROL, default='ITSD Controllable')
    accountable_team = models.ForeignKey(
        'AccountableTeam', on_delete=models.CASCADE, null=True)
    related_ticket_number = models.CharField(
        max_length=100, blank=True, null=True)
    q1_answer = models.CharField(max_length=20, choices=ANSWER, default="Yes")
    contacted_customer = models.CharField(
        max_length=20, choices=ANSWER, default="Yes")
    summary = models.CharField(max_length=3000, blank=True, null=True)
    obs_in_call = models.CharField(max_length=3000, blank=True, null=True)
    accountable_entity = models.CharField(
        max_length=1000, blank=True, null=True)
    overall_reason_dsat = models.CharField(
        max_length=3000, blank=True, null=True)
    service_component_bb_ticket = models.CharField(
        max_length=3000, blank=True, null=True)
    service_bb_ticket = models.CharField(
        max_length=3000, blank=True, null=True)
    transferred_bb = models.CharField(
        max_length=3000, blank=True, null=True)
    employee_type = models.CharField(
        max_length=3000, blank=True, null=True)
    coaching = models.BooleanField(default=False)
    corrective_actions = models.CharField(
        max_length=3000, blank=True, null=True)
    completed_by = models.CharField(max_length=100, blank=True, null=True)
    date_completed = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.surveyed_ticket.reference_number)


class DSAT_Code1(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class BB_Driver_Code2(models.Model):
    name = models.CharField(max_length=100)
    dsat_Code1 = models.ForeignKey(
        "DSAT_Code1", on_delete=models.CASCADE, related_name="bb_Driver_Code2s", null=True)

    def __str__(self):
        return f'{self.dsat_Code1} - {self.name}'


class BB_Driver_Code3(models.Model):
    name = models.CharField(max_length=100)
    bb_Driver_Code2 = models.ForeignKey(
        "BB_Driver_Code2", on_delete=models.CASCADE, related_name="bb_Driver_Code3s", null=True)

    def __str__(self):
        return self.name


class AccountableTeam(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name
