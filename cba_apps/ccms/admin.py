from django.contrib import admin
from .models import Mail, Mailbox_Monitor, BusinessUnit

# Register your models here.
admin.site.register(Mail)
admin.site.register(Mailbox_Monitor)
admin.site.register(BusinessUnit)
