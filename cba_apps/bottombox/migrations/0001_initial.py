# Generated by Django 2.2.5 on 2019-10-21 09:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('agents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BB_Driver_Code2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='BB_Driver_Code3',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('bb_Driver_Code2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bb_Driver_Code3s', to='bottombox.BB_Driver_Code2')),
            ],
        ),
        migrations.CreateModel(
            name='DSAT_Code1',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('reference_number', models.CharField(blank=True, max_length=100, primary_key=True, serialize=False, verbose_name='Reference_Number')),
                ('callback_reference_number', models.CharField(blank=True, max_length=100, verbose_name='Callback Request #')),
                ('related_incident_record', models.CharField(blank=True, max_length=100, verbose_name='Related Incident/Records')),
                ('company_name', models.CharField(blank=True, max_length=100, verbose_name='Company_Name')),
                ('site_location', models.CharField(blank=True, max_length=100, verbose_name='Site_Location')),
                ('city', models.CharField(blank=True, max_length=100, verbose_name='City')),
                ('state', models.CharField(blank=True, max_length=100, verbose_name='State')),
                ('user_location', models.CharField(blank=True, max_length=100, verbose_name='User Location')),
                ('first_name', models.CharField(blank=True, max_length=100, verbose_name='First_Name')),
                ('last_name', models.CharField(blank=True, max_length=100, verbose_name='Last_Name')),
                ('vip', models.CharField(blank=True, max_length=100, verbose_name='VIP')),
                ('customer_email_address', models.EmailField(blank=True, max_length=254, verbose_name='Customer_Email_Address')),
                ('date_time', models.CharField(blank=True, max_length=100, verbose_name='DateTime')),
                ('origination_source', models.CharField(blank=True, max_length=100, verbose_name='Origination_Source')),
                ('call_type', models.CharField(blank=True, max_length=100, verbose_name='Call_Type')),
                ('phone_number', models.CharField(blank=True, max_length=100, verbose_name='Phone_Number')),
                ('service_type', models.CharField(blank=True, max_length=100, verbose_name='Service_Type')),
                ('service', models.CharField(blank=True, max_length=100, verbose_name='Service')),
                ('service_component', models.CharField(blank=True, max_length=100, verbose_name='Service_Component')),
                ('assignment_group', models.CharField(blank=True, max_length=100, verbose_name='Assignment_Group')),
                ('q1', models.CharField(blank=True, max_length=500, verbose_name='Q1. We understand that your request has been resolved, is this correct?')),
                ('q2', models.CharField(blank=True, max_length=500, verbose_name='Q2. How much effort did you personally have to put forth to handle your request? Where 1 = A great deal and 5 = Very little')),
                ('q2a', models.CharField(blank=True, max_length=500, verbose_name='Q2a. Which aspect of the experience disappointed you?')),
                ('q3', models.CharField(blank=True, max_length=500, verbose_name='Q3. Did you feel as though you were being supported by a trusted and capable colleague? Where 1 = Strongly disagree and 5 = Strongly agree')),
                ('q3a', models.CharField(blank=True, max_length=500, verbose_name='Q3a. Which aspect of the experience disappointed you?')),
                ('q4', models.CharField(blank=True, max_length=500, verbose_name="Q4. How was your overall experience in relation to this issue or request? Where 1 = Didn't meet any of my needs and 5 = Met all of my needs")),
                ('q5', models.CharField(blank=True, max_length=500, verbose_name='Q5. Would you like to add any further comments about your recent experience?')),
                ('q6', models.CharField(blank=True, max_length=500, verbose_name='Q6. Lastly, would you like us to contact you again regarding this ticket?')),
                ('average_score', models.CharField(blank=True, max_length=100, verbose_name='Average Score')),
                ('fulfillment', models.CharField(blank=True, max_length=100, verbose_name='Fulfillment')),
                ('follow_up_comments', models.CharField(blank=True, max_length=3000, verbose_name='Follow up Comments')),
                ('originating_ticket_description', models.CharField(blank=True, max_length=500, verbose_name='Originating Ticket Brief Description')),
                ('budi_bu', models.CharField(blank=True, max_length=100, verbose_name='BUDI BU')),
                ('budi_lv7', models.CharField(blank=True, max_length=100, verbose_name='BUDI LV7')),
                ('bu_catg', models.CharField(blank=True, max_length=100, verbose_name='BU Catg')),
                ('date_issued', models.CharField(blank=True, max_length=100, verbose_name='Date Issued')),
                ('bottombox', models.IntegerField(blank=True)),
                ('completed', models.BooleanField(default=False)),
                ('uploaded_by', models.CharField(blank=True, max_length=100)),
                ('date_uploaded', models.DateField(auto_now_add=True)),
                ('agent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='surveys', to='agents.Agent')),
            ],
        ),
        migrations.CreateModel(
            name='RCA',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agent', models.CharField(blank=True, max_length=100)),
                ('support_silo_issue_based', models.CharField(blank=True, max_length=100, verbose_name='Support Silo Skill based on issue')),
                ('service', models.CharField(blank=True, max_length=100, verbose_name='Service')),
                ('service_component', models.CharField(blank=True, max_length=100, verbose_name='Service Component')),
                ('brief_description', models.CharField(blank=True, max_length=3000, verbose_name='Brief Description')),
                ('user_verbatim', models.CharField(blank=True, max_length=3000, verbose_name="User's Verbatim")),
                ('actual_issue', models.CharField(blank=True, max_length=3000, verbose_name='Actual issue')),
                ('rca_date', models.DateField(auto_now_add=True, verbose_name='RCA Date')),
                ('controllability', models.CharField(choices=[('ITSD Controllable', 'ITSD Controllable'), ('Non ITSD Controllable', 'Non ITSD Controllable')], default='ITSD Controllable', max_length=100, verbose_name='Controllability')),
                ('related_ticket_number', models.CharField(blank=True, max_length=100, verbose_name='Related ticket number')),
                ('q1_answer', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='Yes', max_length=20, verbose_name='Q1 answer')),
                ('contacted_customer', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='Yes', max_length=20, verbose_name='Contacted customer?')),
                ('summary', models.CharField(blank=True, max_length=3000, verbose_name='Summary')),
                ('obs_in_call', models.CharField(blank=True, max_length=3000, verbose_name='Observation in call')),
                ('accountable_entity', models.CharField(blank=True, max_length=1000, verbose_name='Accountable entity')),
                ('overall_reason_dsat', models.CharField(blank=True, max_length=3000, verbose_name='Overall reason for DSAT')),
                ('coaching', models.BooleanField(default=False)),
                ('corrective_actions', models.CharField(blank=True, max_length=3000, verbose_name='Corrective actions')),
                ('completed_by', models.CharField(blank=True, max_length=100)),
                ('date_completed', models.DateField(auto_now_add=True)),
                ('accountable_team', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bottombox.Team')),
                ('bb_driver_code2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bb_driver_codes_2', to='bottombox.BB_Driver_Code2')),
                ('bb_driver_code3', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bb_driver_codes_3', to='bottombox.BB_Driver_Code3')),
                ('dsat_cause', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dsat_causes', to='bottombox.DSAT_Code1')),
                ('surveyed_ticket', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='rca', to='bottombox.Survey')),
            ],
        ),
        migrations.AddField(
            model_name='bb_driver_code2',
            name='dsat_Code1',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bb_Driver_Code2s', to='bottombox.DSAT_Code1'),
        ),
    ]
