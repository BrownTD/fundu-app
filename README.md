# Fundu Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#Frontend)
- [Backend](#Backend)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Contributors](#contributors)

# Features

User Registration & Authentication (Firebase)
Homepage showcasing discoverable campaigns
Campaign Manager Page for admins to create/manage campaigns
Donor Page for donor interaction and contributions
QR Code Donation Page for in-person donations
Secure backend APIs for managing data and business logic

# Tech Stack

| **Layer**        | **Technology**                |
|------------------|-------------------------------|
| Frontend         | React Native                  |
| Backend          | Python (Django)               |
| Database         | MySQL                         |
| Authentication   | Firebase Authentication       |
| Payment          | Stripe                        |
| Cloud Hosting    | AWS (EC2, RDS, S3)            |

## Project Structure
```
fundu_app/
├── frontend/                 # React Native app
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable UI components
│   ├── screens/              # App screens (Homepage, Campaign, etc.)
│   ├── navigation/           # App navigation setup
│   ├── services/             # Firebase and API services
│   └── App.js
├── backend/                  # Flask/Django backend
│   ├── app/
│   │   ├── models.py         # Database models
│   │   ├── routes/           # API routes (auth, campaigns, donors, etc.)
│   │   └── utils/            # Utility functions (e.g., QR code generator)
│   └── run.py
├── database/                 # SQL schema files
├── docs/                     # Documentation
└── tests/                    # Test cases for frontend/backend
```
## Frontend
## Backend
## Deployment 
(AWS RDS MySQL Configuration)

### Overview
We configured an AWS RDS instance to host our MySQL database for the `fundu_db` project. This instance is connected to our Django backend to handle data storage for campaigns, donations, and users.

### AWS Configuration Steps
1. **Created AWS RDS Instance**:
   - Chose MySQL as the database engine.
   - Set up automated backups with a retention period of 7 days.
   - Configured storage to automatically scale based on usage.
   - Set the instance to be publicly accessible so that it can be reached from our development environment.

2. **Security Group Configuration**:
   - Created an inbound rule for port 3306 (MySQL) to allow inbound traffic from the IP address of the EC2 instance.

3. **Public Access**:
   - We edited the inbound rules of the RDS instance’s security group to allow traffic on port 3306.
	- For testing purposes, we temporarily allowed connections from anywhere (0.0.0.0/0) and from our EC2 instance’s security group. Later, this will be tightened to only include trusted IP addresses.

4. Schema Import:
   - Using mysqldump and our schema.sql file, we successfully imported our entire database schema (tables and relationships) into the RDS instance.
	- This confirms that our table structures (for users, campaigns, donations, organizations, transactions, and organization members) are set up correctly on AWS.

### Security Configurations
   - Inbound rule for MySQL on port 3306:
   - Allowed traffic from the EC2 instance's security group.

### Database Configuration in Django
   - Django backend is configured to connect to the AWS RDS MySQL instance by updating the DATABASES setting in settings.py as follows:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'fundu_db',
        'USER': 'admin',
        'PASSWORD': '**********', 
        'HOST': 'fundu-db.cvkc6kumstw5.us-east-2.rds.amazonaws.com',
        'PORT': '3306',
    }
}
```
   - This configuration allows our Django app to interact seamlessly with the cloud-hosted database.
	- Once the settings are updated, running python manage.py migrate applies our database migrations to the AWS RDS instance.
