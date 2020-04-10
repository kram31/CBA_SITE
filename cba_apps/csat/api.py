import datetime
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from agents.models import Agent
from .models import Survey, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, AccountableTeam, CsatAccessRequest
from .serializers import SurveySerializer, RCASerializer, DSAT_Code1Serializer, BB_Driver_Code2Serializer, BB_Driver_Code3Serializer, AccountableTeamSerializer, CsatAccessRequestSerializer


class SurveyViewset(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated
    ]

    # 25/07/2019 03:39:26 PM

    def create(self, request, *args, **kwargs):
        # if "Q4. How was your overall experience in relation to this issue or request? Where 1 = Didn't meet any of my needs and 5 = Met all of my needs" in request.data:
        #     request.data['q4'] = request.data.pop(
        #         "Q4. How was your overall experience in relation to this issue or request? Where 1 = Didn't meet any of my needs and 5 = Met all of my needs")

        # agent_fields = [f.name for f in Agent._meta.get_fields()]
        # Check if operator_lan_id exists, if not create using Agent model...
        # Get Agent Model fields

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CsatAccessRequestViewset(viewsets.ModelViewSet):
    queryset = CsatAccessRequest.objects.all()
    serializer_class = CsatAccessRequestSerializer
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated
    ]


class RCAViewset(viewsets.ModelViewSet):
    queryset = RCA.objects.all()
    serializer_class = RCASerializer
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated
    ]


class DSAT_Code1Viewset(viewsets.ModelViewSet):
    queryset = DSAT_Code1.objects.all()
    serializer_class = DSAT_Code1Serializer
    permission_classes = [
        permissions.AllowAny
    ]


class BB_Driver_Code2Viewset(viewsets.ModelViewSet):
    queryset = BB_Driver_Code2.objects.all()
    serializer_class = BB_Driver_Code2Serializer
    permission_classes = [
        permissions.AllowAny
    ]


class BB_Driver_Code3Viewset(viewsets.ModelViewSet):
    queryset = BB_Driver_Code3.objects.all()
    serializer_class = BB_Driver_Code3Serializer
    permission_classes = [
        permissions.AllowAny
    ]


class AccountableTeamViewset(viewsets.ModelViewSet):
    queryset = AccountableTeam.objects.all()
    serializer_class = AccountableTeamSerializer
    permission_classes = [
        permissions.AllowAny
    ]
