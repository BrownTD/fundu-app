# Converts models to JSON

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'role', 'first_name', 'last_name']

def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  #Hash password before saving
        return super().create(validated_data)

from rest_framework import serializers
from .models import Campaign, Donation, Transaction

#Campaign Serializer
class CampaignSerializer(serializers.ModelSerializer):
    """
    Converts Campaign model instances to JSON and validates input data.
    """
    created_by = serializers.ReadOnlyField(source='created_by.email')  # Display email of campaign creator

    class Meta:
        model = Campaign
        fields = '__all__'  # Include all fields

#Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    """
    Converts Donation model instances to JSON and validates input data.
    """
    user = serializers.ReadOnlyField(source='user.email')  # Display email of donor

    class Meta:
        model = Donation
        fields = '__all__'

#Transaction Serializer
class TransactionSerializer(serializers.ModelSerializer):
    """
    Converts Transaction model instances to JSON and validates input data.
    """
    class Meta:
        model = Transaction
        fields = '__all__'
