from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser, Campaign, Donation, Transaction, Organization

# --------------------------------------------
# USER SERIALIZER — Handles registration logic
# --------------------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['user_id', 'email', 'password', 'first_name', 'last_name', 'role','position']
        extra_kwargs = {
            'password': {'write_only': True}  # Prevent password from being returned in API responses
        }

    def create(self, validated_data):
        """
        Override the default create method to securely hash passwords.
        """
        password = validated_data.pop('password')  # Extract raw password
        user = CustomUser(**validated_data)        # Initialize user without password
        user.set_password(password)                # Hash and set the password securely
        user.save()                                # Save to DB
        return user

# -------------------------------------------------
# CAMPAIGN SERIALIZER — Converts Campaign to JSON
# -------------------------------------------------
class CampaignSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.email')  # Show email instead of full user object

    class Meta:
        model = Campaign
        fields = '__all__'

# -------------------------------------------------
# DONATION SERIALIZER — Converts Donation to JSON
# -------------------------------------------------
class DonationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')  # Show email of the donor

    class Meta:
        model = Donation
        fields = '__all__'

# -----------------------------------------------------
# TRANSACTION SERIALIZER — Converts Transaction to JSON
# -----------------------------------------------------
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
# -----------------------------------------------------
# ORGANIZATIOn SERIALIZER — Converts Organization to JSON
# -----------------------------------------------------
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'  
