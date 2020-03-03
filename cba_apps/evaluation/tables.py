import django_tables2 as tables
from .models import Evaluation, Analyst


class EvaluationTable(tables.Table):

    class Meta:
        model = Evaluation

        fields = ['transaction_id', 'call_date', 'analyst',
                  'ticket_number', 'cqm_score', 'tqm_score', 'is_coached']
        orderable = False
        template_name = 'django_tables2/bootstrap-responsive.html'
        attrs = {'class': 'table table-striped table-dark'}


class ExportTable(tables.Table):

    name = tables.Column(accessor='analyst.name')
    silo = tables.Column(accessor='analyst.silo')
    team_lead = tables.Column(accessor='analyst.team_lead')
    supervisor = tables.Column(accessor='analyst.supervisor')

    # name = models.CharField(max_length=300)
    # cba_lan_id = models.CharField(max_length=300, primary_key=True)
    # location = models.CharField(max_length=300)
    # wave = models.CharField(max_length=300)
    # silo = models.CharField(max_length=300)
    # team_lead = models.CharField(max_length=300)
    # supervisor = models.CharField(max_length=300)
    # email = models.EmailField()

    class Meta:
        model = Evaluation
        fields = [f.name for f in Evaluation._meta.get_fields()[1:]]
        fields.insert(0, 'silo')
        fields.insert(0, 'team_lead')
        fields.insert(0, 'supervisor')
        fields.insert(0, 'name')
        template_name = 'django_tables2/bootstrap-responsive.html'
        attrs = {'class': 'table table-striped table-dark'}
        # sequence = ('name',)
