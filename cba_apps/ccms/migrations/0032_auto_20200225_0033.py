# Generated by Django 3.0.3 on 2020-02-24 16:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ccms', '0031_auto_20200224_1802'),
    ]

    operations = [
        migrations.RenameField(
            model_name='correctiveaction',
            old_name='fni',
            new_name='ticket_number',
        ),
    ]
