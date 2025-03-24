# FundU Crowd Funding App
A mobile first crowdfunding platform designed to empower college campus organizations by connecting them with donors and simplifying fundraising efforts. The platform allows student organizations to create fundraiser campaigns, streamline donation collection and visualize campaign analytics.


# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [AWS Deployment Guides](#aws-deployment-guides)
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
│   ├── fundu_backend
│   ├── manage.py
│   ├── requirements.txt
│   └── venv
├── database
│   ├── README.md
│   ├── eer_diagram.png
│   ├── schema.sql
│   └── seed_and_update.sql
├── frontendV2
│   ├── README.md
│   ├── app
│   ├── app.json
│   ├── assets
│   ├── components
│   ├── constants
│   ├── expo-env.d.ts
│   ├── frontend_structure.txt
│   ├── hooks
│   ├── package-lock.json
│   ├── package.json
│   ├── scripts
│   └── tsconfig.json
└── tests
    ├── test_backend.py
    └── test_frontend.js
```
# Frontend
- [Front Setup](frontendV2/README.md)
# Backend
- [Backend Setup](backend/README.md)
  
# AWS Deployment Guides
- [AWS RDS MySQL Deployment](aws/SQL-RDS-Deployment.md)
- [Django Backend Deployment on AWS](aws/Django-Deployment-README.md)

# Contributors

- [Nevyn Brown](https://github.com/BrownTD) – Project Lead, Full Stack Developer, AWS Infrastructure, Database Admin
- [Ro Musassa](https://github.com/24ro) – Backend Developer
- [Monique Gilmore](https://github.com/monique3443) – Frontend Developer
- [Morgan Simmons](https://github.com/morgan0paige) – Frontend Developer


