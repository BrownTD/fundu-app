from django.db import models
from django.contrib.auth.models import AbstractUser

# ---------------- USERS ---------------- #
class CustomUser(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = None #To explicitly tell django to use email instead of username for authentication
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=100)  # Will be hashed
    ROLE_CHOICES = [
        ('donor', 'Donor'),
        ('member', 'Member'),
        ('manager', 'Manager'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'  # Tells Django to use email instead of username
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"

# ---------------- ORGANIZATIONS ---------------- #
class Organization(models.Model):
    organization_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    manager_email = models.EmailField(max_length=100)
    school = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    manager_uid = models.ForeignKey(CustomUser, on_delete=models.RESTRICT)

    def __str__(self):
        return self.org_name

# ---------------- ORGANIZATION MEMBERS ---------------- #
class OrganizationMember(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    org_member_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.RESTRICT)
    ROLE_CHOICES = [
        ('member', 'Member'),
        ('manager', 'Manager'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.organization} as {self.role}"

# ---------------- CAMPAIGNS ---------------- #
class Campaign(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    org_name = models.CharField(max_length=100)
    campaign_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=45)
    description = models.TextField()
    donation_goal = models.IntegerField()
    current_donations = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT)
    updated_at = models.DateTimeField(auto_now=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

# ---------------- DONATIONS ---------------- #
class Donation(models.Model):
    donation_id = models.AutoField(primary_key=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.RESTRICT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Donation {self.donation_id} - {self.amount} to {self.campaign}"


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    donation = models.ForeignKey(Donation, on_delete=models.RESTRICT)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    transaction_date = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    transaction_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.transaction_status}"

