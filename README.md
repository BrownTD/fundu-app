# FundU Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#Frontend)
- [Backend](#Backend)
- [Setup Instructions](#setup-instructions)
- [Deployment Guides](#deployment-guides)
- [Contributors](#contributors)

# Features

User Registration & Authentication 
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
| Authentication   | Django                        |
| Payment          | Stripe                        |
| Cloud Hosting    | AWS (EC2, RDS, S3)            |

## Project Structure
```
fundu-app/
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

## ** Expo Installation**
1. Navigate to the project folder:

- cd fundu-app

2. Install dependencies:

- npm install

3. Create a new Expo app:

- npx create-expo-app@latest

4. Install the following dependencies:

npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons

5. Run the project (for Expo):

- npx expo start

Dependencies

The following packages are used in this project:

Expo:

create-expo-app@latest
React Navigation:

@react-navigation/native
@react-navigation/stack
React Native packages:

react-native-screens
react-native-safe-area-context
react-native-gesture-handler
react-native-reanimated
react-native-vector-icons

# Backend
# Deployment Guides
- [AWS RDS MySQL Setup](aws/SQL-RDS-Deployment.md)
- [Django Backend Deployment on AWS](aws/Django-Deployment-README.md)

# Contributors
## Contributors

- [Nevyn Brown](https://github.com/BrownTD) – Project Lead, Full Stack Developer, AWS Infrastructure, Database Admin
- [Ro Musassa](https://github.com/24ro) – Backend Developer
- [Monique Gilmore](https://github.com/monique3443) – Frontend Developer
- [Morgan Simmons](https://github.com/morgan0paige) – Frontend Developer


