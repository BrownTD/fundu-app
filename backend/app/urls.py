from django.urls import path
from .views import RegisterView, LoginView, CampaignView, DonationView, TransactionView, OrganizationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('campaigns/', CampaignView.as_view(), name='campaigns'),
    path('donations/', DonationView.as_view(), name='donations'),
    path('transactions/', TransactionView.as_view(), name='transactions'),
path('organizations/', OrganizationView.as_view(), name='organizations'),
]
