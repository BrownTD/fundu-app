#This file is for registering models in the django admin panel. We need it so we can display all our models (users) in the admin admin interface because not using default user models caused issues.
#Without it, users appear in database but not in admin panel and managing users in admin isn't possible
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Campaign, Donation, Organization, OrganizationMember, Transaction

# Dynamically show all fields for a model in list_display
def all_fields(model):
    return [field.name for field in model._meta.fields]

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = all_fields(CustomUser)
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('user_id',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

class CampaignAdmin(admin.ModelAdmin):
    list_display = all_fields(Campaign)
    search_fields = ('title', 'org_name')
    list_filter = ('created_at',)

class DonationAdmin(admin.ModelAdmin):
    list_display = all_fields(Donation)
    list_filter = ('donation_date',)

class OrganizationAdmin(admin.ModelAdmin):
    list_display = all_fields(Organization)

class TransactionAdmin(admin.ModelAdmin):
    list_display = all_fields(Transaction)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(OrganizationMember)  # Still basic
admin.site.register(Transaction, TransactionAdmin)
