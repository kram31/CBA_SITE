# from rest_framework import serializers
# from .models import Survey
# # , RCA, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, AccountableTeam
# from django.core.exceptions import FieldDoesNotExist


# class SurveySerializer(serializers.ModelSerializer):

#     # owner_name = serializers.SerializerMethodField()

#     # def get_owner_name(self, obj):

#     #     return obj.agent.name

#     # operator_lan_id = serializers.SerializerMethodField()

#     # def get_operator_lan_id(self, obj):

#     #     return obj.agent.operator_lan_id

#     # rca = serializers.HyperlinkedRelatedField(
#     #     many=False,
#     #     read_only=True,
#     #     view_name='rca-detail'
#     # )

#     class Meta:
#         model = Survey
#         fields = '__all__'


# class DSAT_Code1Serializer(serializers.ModelSerializer):

#     class Meta:
#         model = DSAT_Code1
#         fields = '__all__'

#         extra_kwargs = {
#             'id': {
#                 'validators': []
#             },
#             'name': {
#                 'validators': []
#             }
#         }


# class BB_Driver_Code2Serializer(serializers.ModelSerializer):

#     class Meta:
#         model = BB_Driver_Code2

#         fields = '__all__'
#         extra_kwargs = {
#             'id': {
#                 'validators': []
#             },
#             'name': {
#                 'validators': []
#             },
#             'dsat_Code1': {
#                 'validators': []
#             }

#         }


# class BB_Driver_Code3Serializer(serializers.ModelSerializer):

#     class Meta:
#         model = BB_Driver_Code3

#         fields = '__all__'
#         extra_kwargs = {
#             'id': {
#                 'validators': []
#             },
#             'name': {
#                 'validators': []
#             },
#             'bb_Driver_Code2': {
#                 'validators': []
#             }

#         }


# class RCASerializer(serializers.ModelSerializer):

#     dsat_cause = serializers.SerializerMethodField()

#     def get_dsat_cause(self, obj):

#         return obj.dsat_cause.name

#     bb_driver_code2 = serializers.SerializerMethodField()

#     def get_bb_driver_code2(self, obj):

#         return obj.bb_driver_code2.name

#     bb_driver_code3 = serializers.SerializerMethodField()

#     def get_bb_driver_code3(self, obj):

#         return obj.bb_driver_code3.name

#     class Meta:
#         model = RCA
#         fields = '__all__'

#     def update_or_create_dsat_cause(self, validated_data):

#         data = validated_data.pop('dsat_cause', None)

#         if not data:
#             return None

#         dsat_cause, created = DSAT_Code1.objects.update_or_create(
#             name=data.pop('name'), defaults=data)

#         validated_data['dsat_cause'] = dsat_cause

#     def update_or_create_bb_driver_code2(self, validated_data):

#         data = validated_data.pop('bb_driver_code2', None)

#         if not data:
#             return None

#         bb_driver_code2, created = BB_Driver_Code2.objects.update_or_create(
#             name=data.pop('name'), dsat_Code1=data.pop('dsat_Code1'), defaults=data)

#         validated_data['bb_driver_code2'] = bb_driver_code2

#     def update_or_create_bb_driver_code3(self, validated_data):

#         data = validated_data.pop('bb_driver_code3', None)

#         if not data:
#             return None

#         bb_driver_code3, created = BB_Driver_Code3.objects.update_or_create(
#             name=data.pop('name'), bb_Driver_Code2=data.pop('bb_Driver_Code2'), defaults=data)

#         validated_data['bb_driver_code3'] = bb_driver_code3

#     def create(self, validated_data):
#         self.update_or_create_dsat_cause(validated_data)
#         self.update_or_create_bb_driver_code2(validated_data)
#         self.update_or_create_bb_driver_code3(validated_data)
#         return super(RCASerializer, self).create(validated_data)

#     def update(self, instance, validated_data):
#         self.update_or_create_dsat_cause(validated_data)
#         self.update_or_create_bb_driver_code2(validated_data)
#         self.update_or_create_bb_driver_code3(validated_data)
#         return super(RCASerializer, self).update(instance, validated_data)


# class AccountableTeamSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = AccountableTeam
#         fields = '__all__'
