# FundU Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts. The platform allows student organizations to create fundraiser campaigns, streamline donation collection and visualize campaign analytics.

![FundU Logo](./docs/images/FundU.png)


# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment Guides](#deployment-guides)
- [DevOps/SecOps](#devopssecops-documentation)
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

# Project Structure
```
.
├── LICENSE
├── README.md
├── aws
│   ├── Django-Deployment-README.md
│   ├── SQL-RDS-Deployment.md
│   └── progress.md
├── backend
│   ├── README.md
│   ├── app
│   │   ├── __pycache__
│   │   ├── admin.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── templates
│   │   ├── urls.py
│   │   └── views.py
│   ├── fundu_backend
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── venv
│       ├── bin
│       ├── lib
│       └── pyvenv.cfg
├── database
│   ├── README.md
│   ├── eer_diagram.png
│   ├── schema.sql
│   └── seed_and_update.sql
├── docs
│   ├── FundU_App_Demo.mp4
│   ├── images
│   │   ├── DevelopmentTeam.png
│   │   └── FundU.png
│   └── planning
│       ├── BOFA Code-A-Thon Project Outline-2.pptx
│       └── BOFA Code-A-Thon Project Outline.docx
├── frontendV2
│   ├── README.md
│   ├── app
│   │   ├── (tabs)
│   │   ├── +not-found.tsx
│   │   └── _layout.tsx
│   ├── app.json
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   ├── components
│   │   ├── Collapsible.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── HapticTab.tsx
│   │   ├── HelloWave.tsx
│   │   ├── ParallaxScrollView.tsx
│   │   ├── ThemedText.tsx
│   │   ├── ThemedView.tsx
│   │   ├── __tests__
│   │   └── ui
│   ├── constants
│   │   └── Colors.ts
│   ├── expo-env.d.ts
│   ├── frontend_structure.txt
│   ├── hooks
│   │   ├── useColorScheme.ts
│   │   ├── useColorScheme.web.ts
│   │   └── useThemeColor.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── scripts
│   │   └── reset-project.js
│   └── tsconfig.json
├── project_structure.txt
└── tests
    ├── test_backend.py
    └── test_frontend.js

```
# Frontend
- [Frontend Setup Guide](frontendV2/README.md)  
  Step-by-step instructions for setting up the React Native frontend, including dependencies and project structure.

# Backend
- [Backend Setup Guide](backend/README.md)  
  Django backend configuration, environment setup, and API architecture overview.

# Deployment Guides
- [Backend Deployment (Django + AWS)](aws/README.md)  
  Guide for deploying the Django backend to AWS EC2, including environment setup and MySQL integration.
  
- [Production Deployment: Gunicorn + Nginx + Custom Domain](aws/deployment-gunicorn-nginx.md)  
  Instructions for configuring Gunicorn and Nginx with HTTPS and custom domain routing.

# DevOps/SecOps Documentation
- [Server Protection Documentation](aws/server_protection_readme.md)  
  Firewall, fail2ban, SSH lockdown, and best practices for securing an Ubuntu production server.

# Contributors

- [Nevyn Brown](https://github.com/BrownTD)
    - Project Lead
    - Full Stack Development
    - AWS Infrastructure
    - Database Admin
- [Ro Musassa](https://github.com/24ro)
    -  Backend Development
- [Monique Gilmore](https://github.com/monique3443)
    - Frontend Development
- [Morgan Simmons](https://github.com/morgan0paige)
    - Frontend Development

![Development Team](./docs/images/DevelopmentTeam.png)

