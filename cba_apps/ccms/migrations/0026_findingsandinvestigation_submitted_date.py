# Generated by Django 3.0.3 on 2020-02-21 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ccms', '0025_correctiveaction_findingsandinvestigation'),
    ]

    operations = [
        migrations.AddField(
            model_name='findingsandinvestigation',
            name='submitted_date',
            field=models.DateField(auto_now=True),
        ),
    ]
