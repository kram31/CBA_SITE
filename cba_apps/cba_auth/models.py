from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Auth_Details(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    expires_in = models.IntegerField()
    ext_expires_in = models.IntegerField()
    access_token = models.CharField(max_length=10000)
    refresh_token = models.CharField(max_length=10000)
    id_token = models.CharField(max_length=10000)
    expires_at = models.FloatField()
