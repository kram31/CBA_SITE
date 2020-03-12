from django import forms
from .models import Analyst, Evaluation, Score


CHOICES = (('no_value', 'N/A'), (True, 'Yes'), (False, 'No'))

CHOICES_NO_NA = ((True, 'Yes'), (False, 'No'))


class Analyst_Form(forms.ModelForm):
    class Meta:
        model = Analyst
        fields = '__all__'
        ordering = ['name']


class Evaluation_Form(forms.ModelForm):

    comment_Opened_the_call_properly = forms.CharField(
        label='', required=False)
    comment_Validated_customers_contact_details = forms.CharField(
        label='', required=False)
    comment_Checked_for_the_customers_ticket_history = forms.CharField(
        label='', required=False)
    comment_Used_the_hold_mute_transfer_procedure_correctly = forms.CharField(
        label='', required=False)
    comment_Followed_the_complete_remote_connection_process = forms.CharField(
        label='', required=False)
    comment_Offered_the_call_ticket_number_to_customer = forms.CharField(
        label='', required=False)
    comment_Confirmed_closure_of_call_ticket = forms.CharField(
        label='', required=False)
    comment_Used_the_standard_call_closing = forms.CharField(
        label='', required=False)
    comment_Complied_with_the_CBA_security_process_for_verification = forms.CharField(
        label='', required=False)
    comment_Maintained_professional_and_positive_approach = forms.CharField(
        label='', required=False)
    comment_Delivered_information_politely_and_courteously = forms.CharField(
        label='', required=False)
    comment_Usage_of_Jargon_Dual_Language_and_Cultural_Awareness = forms.CharField(
        label='', required=False)
    comment_Showed_empathy_and_willingness_to_assist = forms.CharField(
        label='', required=False)
    comment_Displayed_active_listening_throughout_the_call = forms.CharField(
        label='', required=False)
    comment_Maintained_call_control = forms.CharField(label='', required=False)
    comment_Effective_Speaking = forms.CharField(label='', required=False)
    comment_Paraphrased_issue_of_the_user = forms.CharField(
        label='', required=False)
    comment_Used_effective_and_appropriate_questioning = forms.CharField(
        label='', required=False)
    comment_Provide_complete_and_accurate_information = forms.CharField(
        label='', required=False)
    comment_Provide_answer_action_to_all_the_customers_requests = forms.CharField(
        label='', required=False)
    comment_Resolution_Accuracy = forms.CharField(label='', required=False)
    comment_Ensure_customer_understood_resolution = forms.CharField(
        label='', required=False)
    comment_Took_Full_Ownership_and_Followed_up = forms.CharField(
        label='', required=False)
    comment_Created_a_call_ticket = forms.CharField(label='', required=False)
    comment_Entered_correct_Brief_Description = forms.CharField(
        label='', required=False)
    comment_Entered_the_correct_information_in_the_Call_Type_field = forms.CharField(
        label='', required=False)
    comment_Entered_the_correct_information_in_the_Service_field = forms.CharField(
        label='', required=False)
    comment_Entered_correct_Service_Component = forms.CharField(
        label='', required=False)
    comment_Selected_the_correct_source_Phone_Web = forms.CharField(
        label='', required=False)
    comment_Alternate_Contact_field_used_when_customer_calling = forms.CharField(
        label='', required=False)
    comment_Selected_the_correct_Severity_and_Priority_of_ticket = forms.CharField(
        label='', required=False)
    comment_Dispatched_the_case_to_the_right_Fulfillment_Group = forms.CharField(
        label='', required=False)
    comment_Selected_correct_Business_Units = forms.CharField(
        label='', required=False)
    comment_Used_and_updated_the_Description_field_correctly = forms.CharField(
        label='', required=False)
    comment_Used_correct_Spelling_Grammar_in_the_ticket = forms.CharField(
        label='', required=False)
    comment_Clear_resolution_summary_documented_accurately = forms.CharField(
        label='', required=False)
    comment_Used_and_completed_the_escalation_template_correctly = forms.CharField(
        label='', required=False)
    comment_Analyst_entered_the_right_Asset_ID_tag = forms.CharField(
        label='', required=False)
    comment_Correct_closure_code_entered = forms.CharField(
        label='', required=False)
    comment_Used_and_linked_the_correct_KM_article = forms.CharField(
        label='', required=False)

    Opened_the_call_properly = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Validated_customers_contact_details = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Checked_for_the_customers_ticket_history = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_the_hold_mute_transfer_procedure_correctly = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Followed_the_complete_remote_connection_process = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Offered_the_call_ticket_number_to_customer = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Confirmed_closure_of_call_ticket = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_the_standard_call_closing = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Complied_with_the_CBA_security_process_for_verification = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)

    Maintained_professional_and_positive_approach = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Delivered_information_politely_and_courteously = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Usage_of_Jargon_Dual_Language_and_Cultural_Awareness = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Showed_empathy_and_willingness_to_assist = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Displayed_active_listening_throughout_the_call = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Maintained_call_control = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Effective_Speaking = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Paraphrased_issue_of_the_user = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Used_effective_and_appropriate_questioning = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Provide_complete_and_accurate_information = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Provide_answer_action_to_all_the_customers_requests = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Resolution_Accuracy = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Ensure_customer_understood_resolution = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Took_Full_Ownership_and_Followed_up = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES_NO_NA), label="", required=False, initial=True)

    Created_a_call_ticket = forms.NullBooleanField(widget=forms.Select(
        choices=CHOICES_NO_NA), label="", required=False, initial=True)
    Entered_correct_Brief_Description = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Entered_the_correct_information_in_the_Call_Type_field = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Entered_the_correct_information_in_the_Service_field = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Entered_correct_Service_Component = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Selected_the_correct_source_Phone_Web = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Alternate_Contact_field_used_when_customer_calling = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Selected_the_correct_Severity_and_Priority_of_ticket = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Dispatched_the_case_to_the_right_Fulfillment_Group = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Selected_correct_Business_Units = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_and_updated_the_Description_field_correctly = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_correct_Spelling_Grammar_in_the_ticket = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Clear_resolution_summary_documented_accurately = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_and_completed_the_escalation_template_correctly = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Analyst_entered_the_right_Asset_ID_tag = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Correct_closure_code_entered = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)
    Used_and_linked_the_correct_KM_article = forms.NullBooleanField(
        widget=forms.Select(choices=CHOICES), label="", required=False, initial=True)

    class Meta:
        model = Evaluation
        fields = '__all__'
