# Fundu Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#Frontend)
- [Backend](#Backend)
- [Setup Instructions](#setup-instructions)
- [Deployment Guides](#deployment)
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
## Frontend
1. **assets/**:
   - Contains all the static assets used in the app, including images, fonts, and media files.
   - **Images**: Contains logos, icons, background images, etc.
   - **Fonts**: Includes custom fonts used for UI consistency across the app.

2. **components/**:
   - Holds reusable UI components that are used across different screens. This promotes code reusability, modularity, and maintains consistency in UI design.

3. **screens/**:
   - Contains the main screens of the app. Each screen represents a view or section of the app, such as onboarding, campaign details, user profile, etc.
   
   Example screens:
   - **Profile.js**: Displays the user profile and allows users to edit their information.
   - **Search.js**: A screen that allows users to search for campaigns, causes, or fundraising events.
   - **DonatePayScreen.js**: A screen that facilitates donation transactions or payment processing for users.

4. **navigation/**:
   - Handles the navigation setup of the app using **React Navigation**, defining how users can transition between different screens.

5. **services/**:
   - Contains logic to interact with external services, such as **Firebase** for user authentication or third-party APIs for campaign management and donations.

6. **App.js**:
   - The main entry point for the React Native app.
   - Sets up the root component, defines global context or state providers (e.g., user context), and configures the main navigation stack.
   - Integrates the primary components and ensures proper navigation flow within the app.

# Backend
# Deployment Guides
- [AWS RDS MySQL Setup](aws/SQL-RDS-Deployment.md)
- [Django Backend Deployment on AWS](aws/Django-Deployment-README.md)
