# Generated by Django 3.0.3 on 2020-02-22 15:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ccms', '0028_auto_20200222_1419'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='correctiveaction',
            name='ticket_number',
        ),
        migrations.RemoveField(
            model_name='findingsandinvestigation',
            name='ticket_number',
        ),
        migrations.AddField(
            model_name='ccmsrca',
            name='event_description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ccmsrca',
            name='ticket_number',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='correctiveaction',
            name='ccms_rca',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ca_fni_ccms_rcas', to='ccms.CcmsRca'),
        ),
        migrations.AddField(
            model_name='findingsandinvestigation',
            name='ccms_rca',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fni_ccms_rcas', to='ccms.CcmsRca'),
        ),
        migrations.DeleteModel(
            name='RcaTicketNumber',
        ),
    ]
