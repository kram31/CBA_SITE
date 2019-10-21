from django.contrib import admin
from .models import Survey, Team, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3

# Register your models here.

admin.site.register(Survey)
admin.site.register(Team)
admin.site.register(RCA)
admin.site.register(DSAT_Code1)
admin.site.register(BB_Driver_Code2)
admin.site.register(BB_Driver_Code3)
