# Generated by Django 2.2.5 on 2019-10-20 02:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bottombox', '0005_auto_20191020_1006'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bb_driver_code2',
            name='bb_Driver_Code3',
        ),
        migrations.RemoveField(
            model_name='dsat_code1',
            name='bb_Driver_Code2',
        ),
    ]
