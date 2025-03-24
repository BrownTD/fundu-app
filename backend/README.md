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






















