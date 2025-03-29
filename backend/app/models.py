from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# ---------------- USER MANAGER ---------------- #
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'manager')  # Default role

        return self.create_user(email, password, **extra_fields)


# ---------------- USERS ---------------- #
class CustomUser(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = None
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"

    class Meta:
        db_table = 'users'


# ---------------- ORGANIZATIONS ---------------- #
class Organization(models.Model):
    organization_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    manager_email = models.EmailField(max_length=100)
    school = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    manager_uid = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, db_column='manager_uid')

    def __str__(self):
        return self.org_name

    class Meta:
        db_table = 'organizations'


# ---------------- ORGANIZATION MEMBERS ---------------- #
class OrganizationMember(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, db_column='organization_id')
    org_member_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, db_column='user_id')
    ROLE_CHOICES = [
        ('member', 'Member'),
        ('manager', 'Manager'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.organization} as {self.role}"

    class Meta:
        db_table = 'organization_members'


# ---------------- CAMPAIGNS ---------------- #
class Campaign(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, db_column='organization_id')
    org_name = models.CharField(max_length=100)
    campaign_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=45)
    description = models.TextField()
    donation_goal = models.IntegerField()
    current_donations = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, db_column='created_by')
    updated_at = models.DateTimeField(auto_now=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'campaigns'


# ---------------- DONATIONS ---------------- #
class Donation(models.Model):
    donation_id = models.AutoField(primary_key=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, db_column='campaign_id')
    user = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, db_column='user_id')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Donation {self.donation_id} - {self.amount} to {self.campaign}"

    class Meta:
        db_table = 'donations'


# ---------------- TRANSACTIONS ---------------- #
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    donation = models.ForeignKey(Donation, on_delete=models.RESTRICT, db_column='donation_id')
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

    class Meta:
        db_table = 'transactions'
