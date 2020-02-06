from rest_framework import serializers

from ccms.models import CCMSOwner

from .models import Auth_Details


class Auth_DetailsSerializer(serializers.ModelSerializer):

    # user = serializers.RelatedField(read_only=True)

    is_member_of_ccms_owners = serializers.SerializerMethodField()

    def get_is_member_of_ccms_owners(self, obj):

        return True if CCMSOwner.objects.get(user=obj.user.id) else False

    user_id = serializers.SerializerMethodField()

    def get_user_id(self, obj):

        return obj.user.pk

    group_list = serializers.SerializerMethodField()

    username = serializers.SerializerMethodField()

    def get_username(self, obj):

        return obj.user.username

    group_list = serializers.SerializerMethodField()

    def get_group_list(self, obj):

        # print()

        return list(obj.user.groups.all().values_list('name', flat=True))

    fullname = serializers.SerializerMethodField()

    def get_fullname(self, obj):

        return f'{obj.user.last_name}, {obj.user.first_name}'

    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):

        return obj.user.is_staff

    class Meta:
        model = Auth_Details
        fields = '__all__'
