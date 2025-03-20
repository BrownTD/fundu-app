#This file is fore registering models in the django admin panel. We need it so we can display all our models (users) in the admin admin interface because not using default user models caused issues.
#Without it, users appear in database but not in admin panel and managing users in admin isn't possible

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Campaign, Donation, Organization, OrganizationMember, Transaction

# Ensures every user is visible in user list on admin panel

#Customizes how users are displayed
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'role', 'is_staff', 'is_superuser') #Columns in user list
    list_filter = ('role', 'is_staff', 'is_superuser')           #Filtering by role and admin status
    search_fields = ('email','first_name', 'last_name')          #Search users by name/email
    ordering = ('email',)                                        #Orders users alphabetically by email
    fieldsets = (                                                #Controls how user details appear when editing a user
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'org_name', 'donation_goal', 'current_donations', 'created_at')
    search_fields = ('title', 'org_name')
    list_filter = ('created_at',)

class DonationAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'campaign_id', 'amount', 'donation_date')
    list_filter = ('donation_date',)

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('org_name', 'manager_email', 'school', 'created_at')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('donation_id', 'amount', 'transaction_status', 'transaction_date')

#Registers models in Django admin
admin.site.register(CustomUser, CustomUserAdmin)  #Register model in admin panel
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(OrganizationMember)  # No customization needed
admin.site.register(Transaction, TransactionAdmin)
