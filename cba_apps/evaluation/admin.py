from django.contrib import admin
from .models import Evaluation, Analyst, Score, Application


admin.site.register(Analyst)
admin.site.register(Evaluation)
admin.site.register(Score)
admin.site.register(Application)
