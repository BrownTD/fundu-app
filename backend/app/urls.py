from django.urls import path
from .views import RegisterView, LoginView, CampaignView, DonationView, TransactionView, OrganizationView, UpdateUserPositionView, UpdateOrgCategoryView, CollegeListView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .chatbot.views import ChatBotView
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
path("chatbot/ask/", ChatBotView.as_view(), name="chatbot-ask"),
path("users/update_position/", UpdateUserPositionView.as_view(), name="update-user-position"),
path('organizations/<int:pk>/update_category/', UpdateOrgCategoryView.as_view(), name='update-org-category'),
path("colleges/", CollegeListView.as_view(), name="college-list"),
]
