from rest_framework import viewsets, permissions
from .models import Auth_Details
from django.contrib.auth.models import Group, User
from .serializers import Auth_DetailsSerializer, CcmsAdminSerializer

# import pprint


class Auth_DetailsViewset(viewsets.ModelViewSet):
    # queryset = Auth_Details.objects.all()
    serializer_class = Auth_DetailsSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):

        user = self.request.user

        try:
            return Auth_Details.objects.filter(user=user)
        except:
            return Auth_Details.objects.all()

        return Auth_Details.objects.all()


class CcmsAdminViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name="CCMS Admin")
    serializer_class = CcmsAdminSerializer
    permission_classes = [
        permissions.AllowAny
    ]
