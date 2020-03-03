from django.db import models
from django.urls import reverse
from datetime import datetime


class Analyst(models.Model):
    name = models.CharField(max_length=300)
    cba_lan_id = models.CharField(max_length=300, primary_key=True)
    location = models.CharField(max_length=300)
    wave = models.CharField(max_length=300)
    silo = models.CharField(max_length=300)
    team_lead = models.CharField(max_length=300)
    supervisor = models.CharField(max_length=300)
    email = models.EmailField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('analyst_detail_data', kwargs={'pk': self.cba_lan_id})


class Evaluation(models.Model):

    WEEKS = (('week_1', 'Week 1'), ('week_2', 'Week 2'), ('week_3',
                                                          'Week 3'), ('week_4', 'Week 4'), ('week_5', 'Week 5'))
    TYPE_OF_MONITORING = (('Bottom_Box', 'Bottom Box'), ('Complaint',
                                                         'Complaint'), ('Random', 'Random'), ('Calibration', 'Calibration'))

    analyst = models.ForeignKey('Analyst', on_delete=models.CASCADE)
    transaction_id = models.AutoField(primary_key=True)
    ticket_number = models.CharField(max_length=300)
    Qfiniti_Transaction_Number = models.CharField(
        max_length=300, blank=True, null=True)
    application_service = models.ForeignKey(
        'Application', on_delete=models.CASCADE)
    audited_by = models.CharField(max_length=300, blank=True, null=True)
    issue = models.CharField(max_length=300, blank=True, null=True)
    call_date = models.CharField(max_length=300)
    type_monitoring = models.CharField(
        max_length=300, blank=True, null=True, choices=TYPE_OF_MONITORING)
    week_number = models.CharField(
        max_length=300, blank=True, null=True, choices=WEEKS)
    cqm_score = models.CharField(
        max_length=300, blank=True, null=True, default=100)
    week_starting = models.CharField(max_length=300, blank=True, null=True)
    tqm_score = models.CharField(
        max_length=300, blank=True, null=True, default=100)
    attribute = models.CharField(max_length=300, blank=True, null=True)
    mark = models.CharField(max_length=300, blank=True, null=True)
    comments = models.CharField(max_length=300, blank=True, null=True)
    is_coached = models.BooleanField(default=False)
    total_score = models.CharField(max_length=300, blank=True, null=True)

    # Call Parameters (Boolean)

    CHOICES = (('no_value', 'N/A'), (True, 'Yes'), (False, 'No'))

    CHOICES_NO_NA = ((True, 'Yes'), (False, 'No'))

    Opened_the_call_properly = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Validated_customers_contact_details = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Checked_for_the_customers_ticket_history = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_the_hold_mute_transfer_procedure_correctly = models.NullBooleanField(
        choices=CHOICES, default=True)
    Followed_the_complete_remote_connection_process = models.NullBooleanField(
        choices=CHOICES, default=True)
    Offered_the_call_ticket_number_to_customer = models.NullBooleanField(
        choices=CHOICES, default=True)
    Confirmed_closure_of_call_ticket = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_the_standard_call_closing = models.NullBooleanField(
        choices=CHOICES, default=True)
    Complied_with_the_CBA_security_process_for_verification = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)

    Maintained_professional_and_positive_approach_while_handling_the_call = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Delivered_information_politely_and_courteously = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Usage_of_Jargon_Dual_Language_and_Cultural_Awareness = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Showed_empathy_and_willingness_to_assist = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Displayed_active_listening_throughout_the_call = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Maintained_call_control = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Effective_Speaking = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Paraphrased_issue_of_the_user = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Used_effective_and_appropriate_questioning = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Provide_complete_and_accurate_information = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Provide_answer_action_to_all_the_customers_requests = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Resolution_Accuracy = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Ensure_customer_understood_resolution = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Took_Full_Ownership_and_Followed_up = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)

    Created_a_call_ticket = models.NullBooleanField(
        choices=CHOICES_NO_NA, default=True)
    Entered_the_correct_information_in_the_Brief_Description_field = models.NullBooleanField(
        choices=CHOICES, default=True)
    Entered_the_correct_information_in_the_Call_Type_field = models.NullBooleanField(
        choices=CHOICES, default=True)
    Entered_the_correct_information_in_the_Service_field = models.NullBooleanField(
        choices=CHOICES, default=True)
    Entered_the_correct_information_in_the_Service_Component_field = models.NullBooleanField(
        choices=CHOICES, default=True)
    Selected_the_correct_source_Phone_Web = models.NullBooleanField(
        choices=CHOICES, default=True)
    Alternate_Contact_field_used_when_customer_is_calling_on_behalf_of_the_affected_user = models.NullBooleanField(
        choices=CHOICES, default=True)
    Selected_the_correct_Severity_and_Priority_of_ticket = models.NullBooleanField(
        choices=CHOICES, default=True)
    Dispatched_the_case_to_the_right_Fulfillment_Group = models.NullBooleanField(
        choices=CHOICES, default=True)
    Selected_correct_Business_Units = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_and_updated_the_Description_field_correctly = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_correct_Spelling_Grammar_in_the_ticket = models.NullBooleanField(
        choices=CHOICES, default=True)
    Clear_resolution_summary_documented_accurately = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_and_completed_the_escalation_template_correctly = models.NullBooleanField(
        choices=CHOICES, default=True)
    Analyst_entered_the_right_Asset_ID_tag = models.NullBooleanField(
        choices=CHOICES, default=True)
    Correct_closure_code_entered_in_the_Interaction_Outcome_field = models.NullBooleanField(
        choices=CHOICES, default=True)
    Used_and_linked_the_correct_KM_article = models.NullBooleanField(
        choices=CHOICES, default=True)

    # Call Parameters (Comments)

    comment_Opened_the_call_properly = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Validated_customers_contact_details = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Checked_for_the_customers_ticket_history = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_the_hold_mute_transfer_procedure_correctly = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Followed_the_complete_remote_connection_process = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Offered_the_call_ticket_number_to_customer = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Confirmed_closure_of_call_ticket = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_the_standard_call_closing = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Complied_with_the_CBA_security_process_for_verification = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Maintained_professional_and_positive_approach_while_handling_the_call = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Delivered_information_politely_and_courteously = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Usage_of_Jargon_Dual_Language_and_Cultural_Awareness = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Showed_empathy_and_willingness_to_assist = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Displayed_active_listening_throughout_the_call = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Maintained_call_control = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Effective_Speaking = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Paraphrased_issue_of_the_user = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_effective_and_appropriate_questioning = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Provide_complete_and_accurate_information = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Provide_answer_action_to_all_the_customers_requests = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Resolution_Accuracy = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Ensure_customer_understood_resolution = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Took_Full_Ownership_and_Followed_up = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Created_a_call_ticket = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Entered_the_correct_information_in_the_Brief_Description_field = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Entered_the_correct_information_in_the_Call_Type_field = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Entered_the_correct_information_in_the_Service_field = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Entered_the_correct_information_in_the_Service_Component_field = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Selected_the_correct_source_Phone_Web = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Alternate_Contact_field_used_when_customer_is_calling_on_behalf_of_the_affected_user = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Selected_the_correct_Severity_and_Priority_of_ticket = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Dispatched_the_case_to_the_right_Fulfillment_Group = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Selected_correct_Business_Units = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_and_updated_the_Description_field_correctly = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_correct_Spelling_Grammar_in_the_ticket = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Clear_resolution_summary_documented_accurately = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_and_completed_the_escalation_template_correctly = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Analyst_entered_the_right_Asset_ID_tag = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Correct_closure_code_entered_in_the_Interaction_Outcome_field = models.CharField(
        max_length=300, blank=True, null=True)
    comment_Used_and_linked_the_correct_KM_article = models.CharField(
        max_length=300, blank=True, null=True)

    def save(self):
        if self.tqm_score and self.cqm_score:
            self.total_score = int(
                (int(self.cqm_score) + int(self.tqm_score)) / 2)
        super(Evaluation, self).save()

    def __str__(self):
        return f'Transaction ID: {self.transaction_id} / {self.analyst}'

    def get_absolute_url(self):
        return reverse('eval_detail_data', kwargs={'pk': self.transaction_id})


class Score(models.Model):

    score_Opened_the_call_properly = models.IntegerField()
    score_Validated_customers_contact_details = models.IntegerField()
    score_Checked_for_the_customers_ticket_history = models.IntegerField()
    score_Used_the_hold_mute_transfer_procedure_correctly = models.IntegerField()
    score_Followed_the_complete_remote_connection_process = models.IntegerField()
    score_Offered_the_call_ticket_number_to_customer = models.IntegerField()
    score_Confirmed_closure_of_call_ticket = models.IntegerField()
    score_Used_the_standard_call_closing = models.IntegerField()
    score_Complied_with_the_CBA_security_process_for_verification = models.IntegerField()
    score_Maintained_professional_and_positive_approach_while_handling_the_call = models.IntegerField()
    score_Delivered_information_politely_and_courteously = models.IntegerField()
    score_Usage_of_Jargon_Dual_Language_and_Cultural_Awareness = models.IntegerField()
    score_Showed_empathy_and_willingness_to_assist = models.IntegerField()
    score_Displayed_active_listening_throughout_the_call = models.IntegerField()
    score_Maintained_call_control = models.IntegerField()
    score_Effective_Speaking = models.IntegerField()
    score_Paraphrased_issue_of_the_user = models.IntegerField()
    score_Used_effective_and_appropriate_questioning = models.IntegerField()
    score_Provide_complete_and_accurate_information = models.IntegerField()
    score_Provide_answer_action_to_all_the_customers_requests = models.IntegerField()
    score_Resolution_Accuracy = models.IntegerField()
    score_Ensure_customer_understood_resolution = models.IntegerField()
    score_Took_Full_Ownership_and_Followed_up = models.IntegerField()
    score_Created_a_call_ticket = models.IntegerField()
    score_Entered_the_correct_information_in_the_Brief_Description_field = models.IntegerField()
    score_Entered_the_correct_information_in_the_Call_Type_field = models.IntegerField()
    score_Entered_the_correct_information_in_the_Service_field = models.IntegerField()
    score_Entered_the_correct_information_in_the_Service_Component_field = models.IntegerField()
    score_Selected_the_correct_source_Phone_Web = models.IntegerField()
    score_Alternate_Contact_field_used_when_customer_is_calling_on_behalf_of_the_affected_user = models.IntegerField()
    score_Selected_the_correct_Severity_and_Priority_of_ticket = models.IntegerField()
    score_Dispatched_the_case_to_the_right_Fulfillment_Group = models.IntegerField()
    score_Selected_correct_Business_Units = models.IntegerField()
    score_Used_and_updated_the_Description_field_correctly = models.IntegerField()
    score_Used_correct_Spelling_Grammar_in_the_ticket = models.IntegerField()
    score_Clear_resolution_summary_documented_accurately = models.IntegerField()
    score_Used_and_completed_the_escalation_template_correctly = models.IntegerField()
    score_Analyst_entered_the_right_Asset_ID_tag = models.IntegerField()
    score_Correct_closure_code_entered_in_the_Interaction_Outcome_field = models.IntegerField()
    score_Used_and_linked_the_correct_KM_article = models.IntegerField()


class Application(models.Model):
    name = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse('app_detail_data', kwargs={'pk': self.id})
