from rest_framework import serializers
from .models import Survey, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, Team
from django.core.exceptions import FieldDoesNotExist


class SurveySerializer(serializers.ModelSerializer):
    rcas = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='rca-detail')

    class Meta:
        model = Survey
        fields = '__all__'


class RCASerializer(serializers.ModelSerializer):

    class Meta:
        model = RCA
        fields = '__all__'


class DSAT_Code1Serializer(serializers.ModelSerializer):

    class Meta:
        model = DSAT_Code1
        fields = '__all__'


class BB_Driver_Code2Serializer(serializers.ModelSerializer):

    class Meta:
        model = BB_Driver_Code2

        fields = '__all__'


class BB_Driver_Code3Serializer(serializers.ModelSerializer):

    class Meta:
        model = BB_Driver_Code3

        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = '__all__'
