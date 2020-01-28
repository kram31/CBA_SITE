from rest_framework import serializers
from .models import (Mail, 
                    Mailbox_Monitor, 
                    Comment, 
                    Ccms, 
                    BusinessUnit, 
                    EscalationType, 
                    CCMSStatus, 
                    TicketStatus, 
                    Silo, 
                    SiteCode, 
                    CCMSOwner, 
                    AccountableTeam, 
                    TicketType
                    )


class MailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mail
        fields = '__all__'


class Mailbox_MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mailbox_Monitor
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'



class CcmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ccms
        fields = '__all__'

class BusinessUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUnit
        fields = '__all__'

class EscalationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EscalationType
        fields = '__all__'


class CCMSStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CCMSStatus
        fields = '__all__'


class TicketStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketStatus
        fields = '__all__'


class SiloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Silo
        fields = '__all__'


class SiteCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteCode
        fields = '__all__'



class CCMSOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CCMSOwner
        fields = '__all__'


class AccountableTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountableTeam
        fields = '__all__'


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = '__all__'

