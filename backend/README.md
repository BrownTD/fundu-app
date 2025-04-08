# Fundu Crowdfunding App - Backend Setup Guide

This guide provides step-by-step instructions to set up the backend for the Fundu Crowdfunding App, including Django configuration, MySQL database setup, authentication, API development, and admin panel setup.

---

## Prerequisites

Before starting, ensure the following are installed:

- Python 3.11+
- Django
- MySQL Server (local or AWS RDS)
- Git
- Postman or `curl` for API testing
- MySQL Workbench or CLI for database management

---

# Backend Structure
```
.
├── README.md
├── app
│   ├── __pycache__
│   │   ├── admin.cpython-311.pyc
│   │   ├── models.cpython-311.pyc
│   │   ├── serializers.cpython-311.pyc
│   │   ├── urls.cpython-311.pyc
│   │   └── views.cpython-311.pyc
│   ├── admin.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_remove_customuser_username.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── models.py
│   ├── serializers.py
│   ├── templates
│   │   └── homepage.html
│   ├── urls.py
│   └── views.py
├── fundu_backend
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-311.pyc
│   │   ├── settings.cpython-311.pyc
│   │   ├── urls.cpython-311.pyc
│   │   └── wsgi.cpython-311.pyc
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
└── venv
    ├── bin
    │   ├── Activate.ps1
    │   ├── __pycache__
    │   ├── activate
    │   ├── activate.csh
    │   ├── activate.fish
    │   ├── django-admin
    │   ├── doesitcache
    │   ├── dotenv
    │   ├── fixup_firestore_admin_v1_keywords.py
    │   ├── fixup_firestore_v1_keywords.py
    │   ├── normalizer
    │   ├── pip
    │   ├── pip3
    │   ├── pip3.11
    │   ├── pyrsa-decrypt
    │   ├── pyrsa-encrypt
    │   ├── pyrsa-keygen
    │   ├── pyrsa-priv2pub
    │   ├── pyrsa-sign
    │   ├── pyrsa-verify
    │   ├── python -> python3
    │   ├── python3 -> /Users/rodrigue/anaconda3/bin/python3
    │   ├── python3.11 -> python3
    │   └── sqlformat
    ├── lib
    │   └── python3.11
    └── pyvenv.cfg
```

## 1. Clone the Repository Onto a Local Device

`git clone https://github.com/BrownTD/fundu-app.git`

Then we ran this command to step into the backend folder

`cd fundu-app/backend`

### Create virtual environment in the backend folder

`python3 -m venv venv`

`source venv/bin/activate  # macOS/Linux`

`venv\Scripts\activate     # Windows (PowerShell)`

### Install required dependencies
`pip install -r requirements.txt`

## 2. Configure MySQL Database

### We verified our MySQL connection using, this command

`mysql -h <DB_HOST> -P 3306 -u <DB_USER> -p`

### Update settings.py in the backend to use MySQL 
We updated fundu_backend/settings.py

![image](https://github.com/user-attachments/assets/b42c0421-5ce8-41ec-a489-9d81b4d1b8b0)
(User and password hidden for security)

### Run migrations for the necessary tables

Commands:

`python manage.py makemigrations app`

`python manage.py migrate`

### Make sure everything is working and check if data exists in our MySQL database

Commands: 

`python manage.py shell`

(In the shell)
```
from app.models import Campaign

print(Campaign.objects.all()) 
```
## 3. Create a Superuser 

### We created a superuser to access the admin panel

Commands: 

`python manage.py createsuperuser`

### Register models in admin.py

To manage models in the admin panel, we register them in app/admin.py

![image](https://github.com/user-attachments/assets/c283dba2-5dd7-4479-a7a4-2cca765f523a)

![image](https://github.com/user-attachments/assets/4be31e3c-a6e4-4c2b-a9e7-6a5d21a7f4b2)

![image](https://github.com/user-attachments/assets/e7a42ee0-7550-4da1-aca7-f635caaced72)

### Run the Django Server

Command: 

`python manage.py runserver`

Your admin panel will be available at a link similar to this,

![image](https://github.com/user-attachments/assets/bf44c4bf-2e75-44b1-a53b-b6a9b03d50c2)

## 4. API Endpoints and Authentication

### Obtain an access token

#### In powershell run:

![image](https://github.com/user-attachments/assets/88734c05-c598-494b-bec2-55b14d7178d1)

and your response should JSON that looks like this,

![image](https://github.com/user-attachments/assets/9ff37a5f-14f7-455e-8a13-17971a5f04ee)

### Access protected endpoints

We use the token access API endpoints that require authentication. Run this curl command to test access to a protected API endpoint (endpoints that require authentication to access) using an acces token for authentication.

![image](https://github.com/user-attachments/assets/76ddb4eb-b8d1-4e39-9012-5e55a2f8f475)

### Refresh access token

If our access token expires, we can refresh it using:

![image](https://github.com/user-attachments/assets/3be02f7a-ea19-4729-9698-5b01cc4d5398)

## 5. Git and Deployment 

### Ignore Sensitive Files

Add sensitive files like the (.env) to .gitignore

### Push to Github

Commands:
```
git add .

git commit -m "Initial backend setup"

git push origin main
```
## Backend Challenges

### 1. Custom User Model Integration
- Replacing Django’s default `User` model with a `CustomUser` caused admin panel registration issues.
- Required a `CustomUserAdmin` configuration to make users visible and editable in the Django Admin panel.
- Role-based logic (`manager`, `member`, `donor`) required custom serialization and conditional access handling.

### 2. Multi-Part Form Handling & Image Upload
- Submitting multipart form data with both images and JSON fields required careful setup in React Native and Django views.
- Used `expo-image-picker` and `expo-image-manipulator` to compress images before upload.
- Image validation (type and size) caused frequent edge-case failures that required server-side handling.

### 3. AWS S3 Integration Issues
- Django continued using `FileSystemStorage` despite `DEFAULT_FILE_STORAGE` being set to S3 in `settings.py`.
- Root cause: environment variables were not being loaded properly, and S3 config was not in the correct `settings.py` scope.
- Uploaded images saved locally at `/media/org_logos/` instead of pushing to S3.

### 4. S3 Bucket Policy & Public Access
- Bucket was misconfigured to deny public access even with `AWS_QUERYSTRING_AUTH = False`.
- Policy lacked correct `s3:GetObject` permission for `arn:aws:s3:::bucket_name/*`, blocking file preview via public URL.
- Manually uploaded files appeared, but uploads from Django were invisible in S3 due to local fallback.

### 5. Form Submission Validation (manager_uid)
- `manager_uid` (a ForeignKey to `CustomUser`) was submitted as an object instead of a user ID string, causing serialization errors.
- Required casting `userId` to a string when appending it to `FormData` in the frontend.
- Server validation also required cleaning up serializer fields to expect a numeric foreign key reference.

### 6. View Debugging & API Errors
- Silent errors during registration/login/posting required adding print logs and better error handling.
- Form parsing required `MultiPartParser` and `FormParser` for uploads to work consistently.
- Several views needed conditional permission logic (`AllowAny`, `IsAuthenticated`) depending on GET/POST routes.

### 7. Static vs Media Conflicts
- Media files were saved locally even though `MEDIA_URL` pointed to S3.
- `BASE_DIR` inconsistencies and multiple `settings.py` files led to Django ignoring S3 config and defaulting to local storage.
- Confusion between `STATIC_URL`, `STATIC_ROOT`, and `MEDIA_ROOT` delayed deployment of static and uploaded content.

### 8. Deployment & Gunicorn Syncing
- Changes to environment variables required restarting Gunicorn using:





















