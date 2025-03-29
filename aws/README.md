# FundU Backend Deployment (Django + AWS)

This repository powers the backend for the FundU platform — a crowdfunding app for student organizations. It is built with Django and deployed using AWS (EC2 for the app server and RDS for MySQL).

---

## ✅ EC2 Server Setup (Ubuntu + Django)

1. **Created EC2 instance** (Ubuntu 22.04 LTS) in AWS (Region: Virginia).
2. Opened **security group inbound rules**:
   - Port `22` for SSH
   - Port `8000` for Django dev server
   - Port `3306` for MySQL (RDS access)

3. **Connected via SSH** from local machine:
   ```bash
   ssh -i ~/Desktop/ec2_key.pem ubuntu@3.88.11.128
   ```

4. **Cloned backend repo** to EC2:
   ```bash
   git clone https://github.com/BrownTD/fundu-app.git
   cd fundu-app/backend
   ```

5. **Created and activated virtual environment**:
   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

---

## ✅ RDS Setup (MySQL Database)

1. Created AWS RDS instance:
   - Engine: MySQL
   - Name: `fundu-db`
   - DB Name: `fundu_db`
   - Username: `admin`
   - Enabled public access
   - Free tier configuration

2. **Connected Django to RDS** using `.env` file:
   ```env
   DB_NAME=fundu_db
   DB_USER=admin
   DB_PASSWORD=**********
   DB_HOST=fundu-db.c4lw0iq6u2dj.us-east-1.rds.amazonaws.com
   DB_PORT=3306
   ```

3. Confirmed RDS access from EC2 using:
   ```bash
   mysql -h fundu-db.c4lw0iq6u2dj.us-east-1.rds.amazonaws.com -u admin -p
   ```

---

## ✅ Schema & Data Migration to RDS

1. **Dumped full schema + data** from local Workbench database:
   ```bash
   mysqldump -u root -p fundu_db > fundu_full.sql
   ```

2. **Uploaded `.sql` file to EC2 server**:
   ```bash
   scp -i ~/Desktop/ec2_key.pem ~/Desktop/fundu-app/database/fundu_full.sql ubuntu@3.88.11.128:~/fundu-app/database/
   ```

3. **Imported into RDS from EC2**:
   ```bash
   mysql -h fundu-db.c4lw0iq6u2dj.us-east-1.rds.amazonaws.com -u admin -p fundu_db < ~/fundu-app/database/fundu_full.sql
   ```

4. **Verified data in RDS** using:
   ```sql
   SHOW TABLES;
   SELECT * FROM users LIMIT 3;
   SELECT * FROM campaigns LIMIT 3;
   ```

---

## ✅ Django Custom User Model (Email Login)

- Replaced `username` with `email` as the login field.
- Used `AbstractUser` + custom user manager.
- Set default role to `"manager"` when creating superusers.

**models.py (partial):**
```python
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
        extra_fields.setdefault('role', 'manager')
        return self.create_user(email, password, **extra_fields)
```

```python
class CustomUser(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        db_table = 'users'
```

---

## ✅ Superuser & Admin Panel Access

1. **Created Django superuser**:
   ```bash
   python manage.py createsuperuser
   ```

2. **Ran dev server**:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

3. **Visited admin panel**:
   ```
   http://3.88.11.128:8000/admin
   ```

4. **Logged in successfully** with superuser credentials.

5. **Verified all models and imported data**:
   - Users
   - Campaigns
   - Organizations
   - Donations
   - Transactions

---

## ✅ Project Structure

```
fundu-app/
├── backend/
│   ├── app/
│   │   ├── models.py
│   │   └── admin.py
│   ├── manage.py
│   ├── database/
│   │   ├── schema.sql
│   │   └── fundu_full.sql
│   ├── .env
│   └── env/ (virtual environment)
```

---

## ✅ Next Steps

- [ ] Deploy Django app with Gunicorn + Nginx
- [ ] Set `DEBUG=False` and add allowed hosts
- [ ] Enable HTTPS with Certbot (Let’s Encrypt)
- [ ] Build RESTful API endpoints
- [ ] Connect frontend (React Native) to backend

---

## Author

**Nevyn Brown**  
UNC Charlotte — Computer Science 
