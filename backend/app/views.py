# views.py — Cleaned Up and Organized
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Campaign, Donation, Transaction, Organization
from .serializers import (
    UserSerializer, 
    CampaignSerializer, 
    DonationSerializer, 
    TransactionSerializer,
OrganizationSerializer
)

import logging
logger = logging.getLogger(__name__)

User = get_user_model()

# -------------------------------
# Registration View
# -------------------------------
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("INCOMING DATA:", request.data)  # log request data to console
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": serializer.data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)

        print("REGISTRATION FAILED:", serializer.errors)  # log the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------------------
# Login View
# -------------------------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")
            logger.info(f"Login attempt with email: {email}")

            user = User.objects.get(email=email)

            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                logger.info(f"Login successful for {email}")
                return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                })

            logger.warning(f"Password incorrect for {email}")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            logger.warning(f"Login failed: {email} not found")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            logger.exception("Unexpected error in login")
            return Response({"detail": "Internal server error"}, status=500)

# -------------------------------
# Campaign View
# -------------------------------
class CampaignView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET' and self.request.query_params.get('summary') == 'true':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        campaigns = Campaign.objects.all()
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------------------
# Donation View
# -------------------------------
class DonationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.query_params.get('summary') == 'true':
            donations = Donation.objects.all().order_by('created_at')
            data = [
                {
                    "amount": donation.amount,
                    "date": donation.created_at.strftime("%Y-%m-%d")
                }
                for donation in donations
            ]
            return Response(data, status=status.HTTP_200_OK)

        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------------------
# Transaction View
# -------------------------------
class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# -------------------------------
# Organization View
# -------------------------------
class OrganizationView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            org = serializer.save()
            return Response(OrganizationSerializer(org).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
