# Generated by Django 3.0.3 on 2020-02-24 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ccms', '0032_auto_20200225_0033'),
    ]

    operations = [
        migrations.RenameField(
            model_name='correctiveaction',
            old_name='ticket_number',
            new_name='fni',
        ),
    ]
