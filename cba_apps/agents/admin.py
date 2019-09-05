from django.contrib import admin
from .models import Agent, TeamLead, Skill

# Register your models here.
admin.site.register(Agent)
admin.site.register(TeamLead)
admin.site.register(Skill)
