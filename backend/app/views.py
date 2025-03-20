# API Logic Handling


from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Campaign, Donation, Transaction
from .serializers import UserSerializer, CampaignSerializer, DonationSerializer, TransactionSerializer
from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken  # Import JWT authentication token handling

# Use custom user model
User = get_user_model()


# Homepage View (For Rendering HTML)
def homepage(request):
    """
    This function renders a homepage.html template.
    """
    return render(request, "homepage.html")


# Registration API View
class RegisterView(APIView):
    """
    Handles user registration.
    - Takes email, password, role, first_name, last_name.
    - Stores the user in the database after validation.
    """
    permission_classes = [AllowAny]  # No authentication needed to register

    def post(self, request):
        serializer = UserSerializer(data=request.data)  # ✅ Validate user input
        if serializer.is_valid():
            serializer.save()  # ✅ Save new user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login API View (Now Using JWT Tokens)
class LoginView(APIView):
    """
    Handles user login.
    - Finds user by email.
    - Manually checks password (since Django doesn't use email authentication by default).
    - Returns JWT tokens for authenticated users.
    """
    permission_classes = [AllowAny]  # No authentication required to log in

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)  # Fetch user by email
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(password):  # Check password manually
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Login successful",
                "access_token": str(refresh.access_token),  # Token for making API requests
                "refresh_token": str(refresh),  # Used to get a new access token when expired
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Campaign API View
class CampaignView(APIView):
    """
    Handles campaign-related operations:
    - GET: Retrieves all campaigns.
    - POST: Creates a new campaign (only for authenticated users).
    """
    permission_classes = [IsAuthenticated]  # Requires authentication

    def get(self, request):
        campaigns = Campaign.objects.all()  # Fetch all campaigns
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)  # Assign the campaign to the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Donation API View
class DonationView(APIView):
    """
    Handles donation-related operations:
    - GET: Retrieves all donations.
    - POST: Creates a new donation (authenticated users).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        donations = Donation.objects.all()  # Fetch all donations
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Link donation to the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Transaction API View
class TransactionView(APIView):
    """
    Handles transaction-related operations:
    - GET: Retrieves all transactions.
    - POST: Creates a new transaction record (authenticated users).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.all()  # Fetch all transactions
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save new transaction
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)