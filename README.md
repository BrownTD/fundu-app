# Fundu Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts.

Table of Contents

Features
Tech Stack
Project Structure
Setup Instructions
Deployment
Contributors

# Features

User Registration & Authentication (Firebase)
Homepage showcasing discoverable campaigns
Campaign Manager Page for admins to create/manage campaigns
Donor Page for donor interaction and contributions
QR Code Donation Page for in-person donations
Secure backend APIs for managing data and business logic

#Tech Stack

Layer	           Technology
Frontend	       React Native
Backend	         Python (Django)
Database	       MySQL
Authentication	 Firebase Authentication
Payment	         Stripe 
Cloud Hosting	AWS (EC2, RDS, S3)

# Project Structure

campus-crowdfund-app/
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
├── aws/                      # Deployment guides and scripts
├── docs/                     # Documentation
└── tests/                    # Test cases for frontend/backend
