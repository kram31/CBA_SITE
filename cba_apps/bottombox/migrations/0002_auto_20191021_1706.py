# Generated by Django 2.2.5 on 2019-10-21 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bottombox', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dsat_code1',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
