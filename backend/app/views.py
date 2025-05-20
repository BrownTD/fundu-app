from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Campaign, Donation, Transaction, Organization, CustomUser
from .chatbot.client import chat_with_gpt
from django.shortcuts import get_object_or_404
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
        print("INCOMING DATA:", request.data)
        print("HOST HEADER:", request.META.get("HTTP_HOST"))

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": serializer.data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)

        print("REGISTRATION FAILED:", serializer.errors)
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

# -------------------------------
# ChatBot View
# -------------------------------
class ChatBotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        user_role = getattr(request.user, "role", "member")

        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)

        response = chat_with_gpt(prompt, user_role=user_role)
        return Response({"response": response})

# -------------------------------
# Update Position View
# -------------------------------
class UpdateUserPositionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get("user_id")
        position = request.data.get("position")

        if not user_id or not position:
            return Response({"error": "Missing user_id or position"}, status=400)

        try:
            user = get_object_or_404(CustomUser, user_id=user_id)
            user.position = position
            user.save()
            return Response({"message": "Position updated successfully"}, status=200)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
