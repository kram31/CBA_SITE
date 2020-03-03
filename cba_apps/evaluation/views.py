from django.shortcuts import render, redirect, HttpResponseRedirect, HttpResponse

from django.views.generic import View, ListView, DetailView, CreateView, UpdateView

from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import Analyst_Form, Evaluation_Form

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

from .models import Analyst, Evaluation, Score, Application
from django.contrib.auth.models import User
from .serializers import EvaluationSerializer

from django.http import JsonResponse

from django.urls import reverse_lazy
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.urls import reverse
from django.contrib import messages

from .tables import EvaluationTable, ExportTable
from django_tables2.export.export import TableExport

from operator import itemgetter

from datetime import datetime


parameters = ["Opened_the_call_properly",
              "Validated_customers_contact_details",
              "Checked_for_the_customers_ticket_history",
              "Used_the_hold_mute_transfer_procedure_correctly",
              "Followed_the_complete_remote_connection_process",
              "Offered_the_call_ticket_number_to_customer",
              "Confirmed_closure_of_call_ticket",
              "Used_the_standard_call_closing",
              "Delivered_information_politely_and_courteously",
              "Usage_of_Jargon_Dual_Language_and_Cultural_Awareness",
              "Showed_empathy_and_willingness_to_assist",
              "Displayed_active_listening_throughout_the_call",
              "Maintained_call_control",
              "Effective_Speaking",
              "Paraphrased_issue_of_the_user",
              "Used_effective_and_appropriate_questioning",
              "Provide_complete_and_accurate_information",
              "Provide_answer_action_to_all_the_customers_requests",
              "Resolution_Accuracy",
              "Ensure_customer_understood_resolution",
              "Took_Full_Ownership_and_Followed_up",
              "Entered_the_correct_information_in_the_Brief_Description_field",
              "Entered_the_correct_information_in_the_Call_Type_field",
              "Entered_the_correct_information_in_the_Service_field",
              "Entered_the_correct_information_in_the_Service_Component_field",
              "Selected_the_correct_source_Phone_Web",
              "Alternate_Contact_field_used_when_customer_is_calling_on_behalf_of_the_affected_user",
              "Selected_the_correct_Severity_and_Priority_of_ticket",
              "Dispatched_the_case_to_the_right_Fulfillment_Group",
              "Selected_correct_Business_Units",
              "Used_and_updated_the_Description_field_correctly",
              "Used_correct_Spelling_Grammar_in_the_ticket",
              "Clear_resolution_summary_documented_accurately",
              "Used_and_completed_the_escalation_template_correctly",
              "Analyst_entered_the_right_Asset_ID_tag",
              "Correct_closure_code_entered_in_the_Interaction_Outcome_field",
              "Used_and_linked_the_correct_KM_article",
              "Created_a_call_ticket",
              "Complied_with_the_CBA_security_process_for_verification",
              "Maintained_professional_and_positive_approach_while_handling_the_call"]


class Home_View(View):
    template_name = 'evaluation/home.html'
    post_context = {}
    get_context = {}

    def get(self, request):

        curr_month = datetime.now()

        violations = []
        evaluations = Evaluation.objects.all()

        for param in parameters:
            ticket_list = []

            for e in evaluations:
                date_obj = datetime.strptime(e.call_date, '%m/%d/%Y')
                if date_obj.month == curr_month.month:
                    if getattr(e, param) == False:
                        ticket_list.append(e.ticket_number)

            if len(ticket_list):

                violations.append({'parameter': param.replace(
                    "_", " "), 'count': len(ticket_list)})

        newlist = sorted(violations, key=itemgetter('count'), reverse=True)

        self.get_context['violations'] = newlist[:3]
        self.get_context['num_audits_month'] = evaluations.filter(
            call_date__startswith=curr_month.strftime('%m')).count()

        self.post_context['violations'] = newlist[:3]
        self.post_context['num_audits_month'] = evaluations.filter(
            call_date__startswith=curr_month.strftime('%m')).count()

        return render(request, self.template_name, self.get_context)

    def post(self, request):

        if request.POST.get('btn-download') == 'download-file':
            print('Download Data')

            exporter = TableExport('xlsx', ExportTable(
                self.post_context['queryset']))

            return exporter.response('cba_evaluations.xlsx')

        if request.POST.get('btn-search'):

            start_date = request.POST.get('from_date')
            end_date = request.POST.get('end_date')

            queryset = Evaluation.objects.filter(
                call_date__range=(start_date, end_date))

            self.post_context['queryset'] = queryset

            home_table = EvaluationTable(queryset)

            self.post_context['home_table'] = home_table

            return render(request, self.template_name, self.post_context)


class EvaluationList(ListView):
    model = Evaluation
    template_name = 'evaluation/evaluation.html'
    context_object_name = 'evaluations'


class EvaluationDetail(DetailView):
    model = Evaluation


class EvaluationCreate(LoginRequiredMixin, CreateView):

    login_url = 'login'

    def get(self, request, *args, **kwargs):
        context = {'form': Evaluation_Form(), 'eval_active': 'active'}
        return render(request, 'evaluation/evaluation_form.html', context)

    def post(self, request, *args, **kwargs):
        form = Evaluation_Form(request.POST)
        if form.is_valid():

            evaluation = form.save(commit=False)
            evaluation.audited_by = request.user.username
            evaluation.save()

            if request.POST.get('eval_save_send_email') == 'eval_save_send_email':

                _email = Analyst.objects.all().filter(
                    name=evaluation.analyst).values_list("email", flat=True)

                link = f'{request.get_host()}{reverse_lazy("eval_detail_data", args=[evaluation.transaction_id])}confirm'
                html_message = render_to_string(
                    'evaluation/mail_template.html', {'evaluation': evaluation, 'link': link})
                plain_message = strip_tags(html_message)
                subject = f'Transaction ID: {evaluation.transaction_id} - Evaluation for {evaluation.analyst}'

                send_mail(subject, html_message, request.user.email,
                          [_email[0]], html_message=html_message)

            return HttpResponseRedirect(reverse_lazy('eval_detail_data', args=[evaluation.transaction_id]))
        return render(request, 'evaluation/evaluation_form.html', {'form': form, 'eval_active': 'active'})


class EvaluationUpdate(LoginRequiredMixin, UpdateView):

    model: Evaluation
    fields = '__all__'
    login_url = 'login'

    # success_url = reverse_lazy('evaluation_list')

    def get_object(self, queryset=None):
        obj = Evaluation.objects.get(transaction_id=self.kwargs['pk'])

        return obj

    def get_form_class(self):
        return Evaluation_Form

    def post(self, request, *args, **kwargs):

        super(EvaluationUpdate, self).post(request, *args, **kwargs)

        evaluation = self.get_object()

        if request.POST.get('eval_save_send_email') == 'eval_save_send_email':

            _email = Analyst.objects.all().filter(
                name=evaluation.analyst).values_list("email", flat=True)

            link = f'{request.get_host()}{reverse_lazy("eval_detail_data", args=[evaluation.transaction_id])}confirm'
            html_message = render_to_string(
                'evaluation/mail_template.html', {'evaluation': evaluation, 'link': link})
            plain_message = strip_tags(html_message)
            subject = f'Transaction ID: {evaluation.transaction_id} - Evaluation for {evaluation.analyst}'

            send_mail(subject, html_message, request.user.email,
                      [_email[0]], html_message=html_message)

        return HttpResponseRedirect(reverse_lazy('eval_detail_data', args=[evaluation.transaction_id]))


class EvaluationConfirmUpdate(DetailView):

    model = Evaluation
    template_name = 'evaluation/evaluation_confirm.html'

    def post(self, request, *args, **kwargs):

        if request.POST.get('coached'):
            _eval = Evaluation.objects.get(transaction_id=kwargs['pk'])

            _eval.is_coached = True
            _eval.save()

            _email = Analyst.objects.all().filter(
                name=_eval.analyst).values_list("email", flat=True)

            _email_auditor = User.objects.all().filter(
                username=_eval.audited_by).values_list("email", flat=True)

            _message = "This email is just for confirmation, please do not reply"

            subject = f'Transaction ID: {_eval.transaction_id} - Evaluation for {_eval.analyst} has been confirmed'

            send_mail(subject, _message, 'DO_NOT_REPLY@NOEMAIL.com',
                      [_email_auditor[0], _email[0]])
            messages.success(request, 'Confirmation success')
        return HttpResponseRedirect(reverse_lazy('eval_confirm_update', args=[kwargs['pk']]))


class EvaluationAPI(APIView):

    def get(self, request):
        evaluations = Evaluation.objects.all()
        serializer = EvaluationSerializer(evaluations, many=True)

        return Response(serializer.data)


class Analysts_API(APIView):

    authentication_classes = []
    permission_classes = []
    data = {}

    def get(self, request, format=None):

        analysts = []
        analysts_pks = Analyst.objects.filter().values_list('pk').order_by('name')

        for analyst in analysts_pks:
            name = Analyst.objects.filter(
                pk=analyst[0]).values_list('name', flat=True)
            location = Analyst.objects.filter(
                pk=analyst[0]).values_list('location', flat=True)
            wave = Analyst.objects.filter(
                pk=analyst[0]).values_list('wave', flat=True)
            silo = Analyst.objects.filter(
                pk=analyst[0]).values_list('silo', flat=True)
            team_lead = Analyst.objects.filter(
                pk=analyst[0]).values_list('team_lead', flat=True)
            supervisor = Analyst.objects.filter(
                pk=analyst[0]).values_list('supervisor', flat=True)
            email = Analyst.objects.filter(
                pk=analyst[0]).values_list('email', flat=True)

            analysts.append({"pk": analyst[0], "name": name[0], "location": location[0], "wave": wave[0],
                             "silo": silo[0], "team_lead": team_lead[0], "supervisor": supervisor[0], "email": email[0]})

        list_scores = []
        scores = Score.objects.filter(pk=1).values()

        for score in scores:
            list_scores.append(score)

        self.data['scores'] = list_scores

        self.data['analysts'] = analysts

        # self.data['violations'] = violations

        return Response(self.data)

        # param, flat=True)


class AnalystList(ListView):
    model = Analyst
    template_name = 'evaluation/analyst.html'
    context_object_name = 'analysts'


class AnalystDetail(DetailView):
    model = Analyst


class AnalystCreateView(LoginRequiredMixin, CreateView):
    model = Analyst
    fields = '__all__'
    login_url = 'login'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['analyst'] = 'active'
        return context


class AnalystUpdate(LoginRequiredMixin, UpdateView):

    model: Analyst
    fields = '__all__'
    login_url = 'login'
    success_url = reverse_lazy('analyst_list')

    def get_object(self, queryset=None):
        obj = Analyst.objects.get(cba_lan_id=self.kwargs['pk'])
        return obj


class ScoreDetail(DetailView):
    model = Score


class ScoreUpdate(LoginRequiredMixin, UpdateView):

    model: Score
    fields = '__all__'
    login_url = 'login'

    def get_object(self, queryset=None):
        obj = Score.objects.get(pk=self.kwargs['pk'])
        return obj


class ApplicationCreateView(LoginRequiredMixin, CreateView):
    model = Application
    fields = '__all__'
    login_url = 'login'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ApplicationList(ListView):
    model = Application
    template_name = 'evaluation/application.html'
    context_object_name = 'application'


class ApplicationDetail(DetailView):
    model = Application


class ApplicationUpdate(LoginRequiredMixin, UpdateView):

    model: Application
    fields = '__all__'
    login_url = 'login'
    success_url = reverse_lazy('app_list')

    def get_object(self, queryset=None):
        obj = Application.objects.get(pk=self.kwargs['pk'])
        return obj
