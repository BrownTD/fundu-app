# Fundu Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
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
## Deployment 
(AWS RDS MySQL Configuration)

### Overview
We configured an AWS RDS instance to host our MySQL database for the `fundu_db` project. This instance is connected to our Django backend to handle data storage for campaigns, donations, and users.

### AWS Configuration Steps
1. **Created AWS RDS Instance**:
   - Chose MySQL as the database engine.
   - Set up automated backups with a retention period of 7 days.
   - Configured storage to automatically scale based on usage.

2. **Security Group Configuration**:
   - Created an inbound rule for port 3306 (MySQL) to allow inbound traffic from the IP address of the EC2 instance.

3. **Public Access**:
   - Ensured the RDS instance is publicly accessible to allow external connections.

### Security Configurations
- Inbound rule for MySQL on port 3306:
  - Allowed traffic from the EC2 instance's security group.

### Database Configuration in Django
