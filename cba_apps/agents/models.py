from django.db import models
from django.apps import apps


class Agent(models.Model):
    name = models.CharField('Owner Name', max_length=100)
    operator_lan_id = models.CharField(
        'Operator Lan ID', max_length=100, primary_key=True)
    email = models.EmailField(blank=True)
    skill = models.ForeignKey(
        'Skill', on_delete=models.CASCADE, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    wave = models.CharField(max_length=100, blank=True, null=True)
    survey = models.ForeignKey(
        'bottombox.Survey', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.operator_lan_id


class Skill(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class TeamLead(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    agent = models.ForeignKey(
        'Agent', on_delete=models.CASCADE, related_name='agents')

    def __str__(self):
        return self.name
