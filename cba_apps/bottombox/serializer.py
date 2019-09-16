from rest_framework import serializers
from .models import Survey, RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, Team
from django.core.exceptions import FieldDoesNotExist
from agents.serializer import AgentSerializer


class SurveySerializer(serializers.ModelSerializer):

    owner_name = serializers.SerializerMethodField()

    def get_owner_name(self, obj):

        return obj.agent.name

    operator_lan_id = serializers.SerializerMethodField()

    def get_operator_lan_id(self, obj):

        return obj.agent.operator_lan_id

    rca = serializers.HyperlinkedRelatedField(
        many=False,
        read_only=True,
        view_name='rca-detail'
    )

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
