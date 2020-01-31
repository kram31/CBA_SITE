from rest_framework import serializers
from .models import Auth_Details


class Auth_DetailsSerializer(serializers.ModelSerializer):

    # user = serializers.RelatedField(read_only=True)

    username = serializers.SerializerMethodField()

    def get_username(self, obj):

        return obj.user.username

    fullname = serializers.SerializerMethodField()

    def get_fullname(self, obj):

        return f'{obj.user.last_name}, {obj.user.first_name}'

    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):

        return obj.user.is_staff

    class Meta:
        model = Auth_Details
        fields = '__all__'
