from django.db import models


class Survey(models.Model):
    reference_number = models.CharField(
        'Reference_Number', max_length=100, blank=True, primary_key=True)

    agent = models.ForeignKey(
        "agents.Agent", on_delete=models.CASCADE, related_name="surveys")

    callback_reference_number = models.CharField('Callback Request #',
                                                 max_length=100, blank=True)
    related_incident_record = models.CharField('Related Incident/Records',
                                               max_length=100, blank=True)
    company_name = models.CharField(
        'Company_Name', max_length=100, blank=True)
    site_location = models.CharField(
        'Site_Location', max_length=100, blank=True)
    city = models.CharField('City', max_length=100, blank=True)
    state = models.CharField('State', max_length=100, blank=True)
    user_location = models.CharField(
        'User Location', max_length=100, blank=True)
    first_name = models.CharField(
        'First_Name', max_length=100, blank=True)
    last_name = models.CharField(
        'Last_Name', max_length=100, blank=True)
    vip = models.CharField('VIP', max_length=100, blank=True)
    customer_email_address = models.EmailField(
        'Customer_Email_Address', blank=True)
    date_time = models.CharField(
        'DateTime', max_length=100, blank=True)
    origination_source = models.CharField(
        'Origination_Source', max_length=100, blank=True)
    call_type = models.CharField(
        'Call_Type', max_length=100, blank=True)
    phone_number = models.CharField(
        'Phone_Number', max_length=100, blank=True)
    service_type = models.CharField(
        'Service_Type', max_length=100, blank=True)
    service = models.CharField(
        'Service', max_length=100, blank=True)
    service_component = models.CharField(
        'Service_Component', max_length=100, blank=True)
    assignment_group = models.CharField(
        'Assignment_Group', max_length=100, blank=True)
    q1 = models.CharField('Q1. We understand that your request has been resolved, is this correct?',
                          max_length=500, blank=True)
    q2 = models.CharField('Q2. How much effort did you personally have to put forth to handle your request? Where 1 = A great deal and 5 = Very little',
                          max_length=500, blank=True)
    q2a = models.CharField(
        'Q2a. Which aspect of the experience disappointed you?', max_length=500, blank=True)
    q3 = models.CharField('Q3. Did you feel as though you were being supported by a trusted and capable colleague? Where 1 = Strongly disagree and 5 = Strongly agree',
                          max_length=500, blank=True)
    q3a = models.CharField(
        'Q3a. Which aspect of the experience disappointed you?', max_length=500, blank=True)
    q4 = models.CharField("Q4. How was your overall experience in relation to this issue or request? Where 1 = Didn't meet any of my needs and 5 = Met all of my needs",
                          max_length=500, blank=True)
    q5 = models.CharField('Q5. Would you like to add any further comments about your recent experience?',
                          max_length=500, blank=True)
    q6 = models.CharField('Q6. Lastly, would you like us to contact you again regarding this ticket?',
                          max_length=500, blank=True)
    average_score = models.CharField(
        'Average Score', max_length=100, blank=True)

    fulfillment = models.CharField(
        'Fulfillment', max_length=100, blank=True)
    follow_up_comments = models.CharField('Follow up Comments',
                                          max_length=3000, blank=True)
    originating_ticket_description = models.CharField('Originating Ticket Brief Description',
                                                      max_length=500, blank=True)
    budi_bu = models.CharField(
        'BUDI BU', max_length=100, blank=True)
    budi_lv7 = models.CharField(
        'BUDI LV7', max_length=100, blank=True)
    bu_catg = models.CharField(
        'BU Catg', max_length=100, blank=True)
    date_issued = models.CharField(
        'Date Issued', max_length=100, blank=True)
    bottombox = models.IntegerField(blank=True)
    completed = models.BooleanField(default=False)
    uploaded_by = models.CharField(max_length=100, blank=True)
    date_uploaded = models.DateField(auto_now_add=True)

    # if owner does not exist do agent instance

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
        Survey, on_delete=models.CASCADE, related_name="rca")
    agent = models.CharField(max_length=100, blank=True)
    support_silo_issue_based = models.CharField(
        "Support Silo Skill based on issue", max_length=100, blank=True)
    service = models.CharField("Service", max_length=100, blank=True)
    service_component = models.CharField(
        "Service Component", max_length=100, blank=True)
    brief_description = models.CharField(
        "Brief Description", max_length=3000, blank=True)
    user_verbatim = models.CharField(
        "User's Verbatim", max_length=3000, blank=True)
    dsat_cause = models.ForeignKey(
        'DSAT_Code1', on_delete=models.CASCADE, null=True, related_name="dsat_causes")
    bb_driver_code2 = models.ForeignKey(
        'BB_Driver_Code2', on_delete=models.CASCADE, null=True, related_name="bb_driver_codes_2")
    bb_driver_code3 = models.ForeignKey(
        'BB_Driver_Code3', on_delete=models.CASCADE, null=True, related_name="bb_driver_codes_3")
    actual_issue = models.CharField(
        "Actual issue", max_length=3000, blank=True)
    rca_date = models.DateField("RCA Date", auto_now_add=True)
    controllability = models.CharField("Controllability",
                                       max_length=100, choices=CONTROL, default='ITSD Controllable')
    accountable_team = models.ForeignKey(
        'Team', on_delete=models.CASCADE, null=True)
    related_ticket_number = models.CharField(
        "Related ticket number", max_length=100, blank=True)
    # rca_owner = models.CharField(max_length=100, blank=True)
    q1_answer = models.CharField(
        "Q1 answer", max_length=20, choices=ANSWER, default="Yes")
    contacted_customer = models.CharField("Contacted customer?",
                                          max_length=20, choices=ANSWER, default="Yes")
    summary = models.CharField("Summary", max_length=3000, blank=True)
    obs_in_call = models.CharField(
        "Observation in call", max_length=3000, blank=True)
    accountable_entity = models.CharField(
        "Accountable entity", max_length=1000, blank=True)
    overall_reason_dsat = models.CharField(
        "Overall reason for DSAT", max_length=3000, blank=True)
    coaching = models.BooleanField(default=False)
    corrective_actions = models.CharField(
        "Corrective actions", max_length=3000, blank=True)
    completed_by = models.CharField(max_length=100, blank=True)
    date_completed = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.surveyed_ticket)


class DSAT_Code1(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class BB_Driver_Code2(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    dsat_Code1 = models.ForeignKey(
        "DSAT_Code1", on_delete=models.CASCADE, related_name="bb_Driver_Code2s", blank=True, null=True)

    def __str__(self):
        return self.name


class BB_Driver_Code3(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    bb_Driver_Code2 = models.ForeignKey(
        "BB_Driver_Code2", on_delete=models.CASCADE, related_name="bb_Driver_Code3s", blank=True, null=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name
