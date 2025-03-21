# Django Deployment to AWS - Fundu Crowdfunding App

This document outlines the steps we followed to deploy the Django backend for the Fundu Crowdfunding App on AWS using an EC2 instance, RDS for MySQL, and S3 for file storage. This guide will walk through the process and the configurations we made to get the backend up and running.

---

## Prerequisites

- **AWS Account**: Ensure we have an active AWS account and the necessary permissions to create and configure EC2 instances, RDS instances, and S3 buckets.
- **Django Project**: The backend for the Fundu App is built with Django. This guide assumes we have already developed the backend locally and are ready to deploy.
- **GitHub Repository**: The Django project code is stored in a GitHub repository, ready to be cloned onto the EC2 instance.
- **AWS CLI**: The AWS CLI should be installed on our local machines to manage resources and interact with AWS from the command line.

---

## Step-by-Step Guide

### Step 1: Set Up EC2 Instance

1. **Launch EC2 Instance**:
   - We go to the **EC2 Dashboard** in the AWS Management Console.
   - Click **Launch Instance** to create a new instance.
   - Choose an Amazon Machine Image (AMI) (e.g., Ubuntu Server 20.04 LTS).
   - Choose an instance type (e.g., t2.micro for testing or a larger one for production).
   - Configure instance details as needed (ensure the instance is in a security group that allows inbound HTTP (port 80) and SSH (port 22)).
   - Create or select a **key pair** for SSH access to the instance.

2. **Connect to EC2 Instance**:
   - Once the instance is running, we copy the public DNS of the instance (e.g., `ec2-3-145-105-183.us-east-2.compute.amazonaws.com`).
   - We use SSH to connect to the instance from our terminal:

     ```bash
     ssh -i ec2_key.pem ubuntu@ec2-3-145-105-183.us-east-2.compute.amazonaws.com
     ```

3. **Update and Install Dependencies on EC2**:
   - After SSH access, we update the instance and install required packages:

     ```bash
     sudo apt update
     sudo apt upgrade -y
     sudo apt install python3-pip python3-dev libpq-dev git nginx
     sudo apt install python3-venv  # For virtual environment
     ```

### Step 2: Set Up MySQL Database on AWS RDS

1. **Launch an RDS MySQL Instance**:
   - We go to the **RDS Dashboard** and click **Create Database**.
   - Select **MySQL** as the database engine and choose the instance specifications.
   - Set up automated backups and configure storage as per our project’s needs.

2. **Configure Security Group for RDS**:
   - We create a **Security Group** in RDS that allows inbound traffic on port `3306` (MySQL).
   - We ensure the EC2 instance's security group is allowed in the inbound rules of the RDS security group.

3. **Test the Connection**:
   - After creating the RDS instance, we note the **Endpoint** and **Port**.
   - We SSH into the EC2 instance and test if it can connect to the RDS MySQL instance using the `mysql` command:

     ```bash
     mysql -h fundu-db.cvkc6kumstw5.us-east-2.rds.amazonaws.com -u admin -p
     ```

### Step 3: Install and Set Up Django on EC2

1. **Clone the Repository**:
   - We navigate to the directory on the EC2 instance where we want to store the project:

     ```bash
     cd ~
     git clone https://github.com/BrownTD/fundu-app.git
     cd fundu-app/backend
     ```
2. # Install system dependencies globally on your EC2 instance
sudo apt update
sudo apt install pkg-config libmysqlclient-dev

3. **Create and Activate Virtual Environment**:
   - We create a virtual environment and activate it:

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

4. **Install Required BACKEND Packages**:
   - We install the project dependencies using `pip` (/backend/requirements.txt)
   - Make sure to naviagte to backend folder in terminal before installing

     ```bash
     pip install -r requirements.txt
     ```

5. **Set Up Django for Production**:
   - We update `settings.py` in Django for production deployment:
     - Set `DEBUG = False`.
     - Configure `ALLOWED_HOSTS` to include the EC2 public DNS (e.g., `['ec2-3-145-105-183.us-east-2.compute.amazonaws.com']`).
     - Configure `DATABASES` to connect to the RDS MySQL instance, using the RDS credentials (.env file).

     ```python
     # DATABASES configuration (from .env file)
      DATABASES = {
       'default': {
           'ENGINE': config('DB_ENGINE'),
           'NAME': config('DB_NAME'),
           'USER': config('DB_USER'),
           'PASSWORD': config('DB_PASSWORD'),
           'HOST': config('DB_HOST'),
           'PORT': config('DB_PORT', default=3306, cast=int),
        }
      }
     ```

6. **Run Django Migrations**:
   - We apply migrations to set up the database schema:

     ```bash
     python manage.py migrate
     ```

7. **Collect Static Files**:
   - We collect static files for the frontend to be served by Nginx:

     ```bash
     python manage.py collectstatic
     ```

### Step 4: Configure Nginx as a Reverse Proxy for Django

1. **Install and Configure Nginx ON EC@ instance**:
   - We install Nginx:

     ```bash
     sudo apt install nginx
     ```

   - We configure Nginx to proxy requests to the Django application:
     - We edit the Nginx configuration file to add a new site for our project.

     ```bash
     sudo nano /etc/nginx/sites-available/fundu-app
     ```

     - We add the following configuration:

     ```nginx
     server {
       listen 80;
       server_name 3.145.105.183;  # EC2 Public IP
        #proxy_pass http://127.0.0.1:8000;  # Bind to port 8000 instead of a Unix socket

       location / {
           proxy_pass http://unix:/home/ubuntu/fundu-app/backend/fundu-app.sock;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       location /static/ {
           alias /home/ubuntu/fundu-app/backend/static/;
       }

       location /media/ {
        alias /home/ubuntu/fundu-app/backend/media/;
       }

       error_log  /var/log/nginx/fundu-app_error.log;
       access_log /var/log/nginx/fundu-app_access.log;
      }

     ```

     - We enable the site and restart Nginx:

     ```bash
     sudo ln -s /etc/nginx/sites-available/fundu-app /etc/nginx/sites-enabled
     sudo systemctl restart nginx
     ```
  Our application should now be accessible via the EC2 instance’s public DNS at port 80.
  
2. **Start the Django Development Server**:
   - We run the Django development server to test it:

     ```bash
     python manage.py runserver 0.0.0.0:8000
     ```

### Step 5: Set Up Gunicorn for Production

2. **Run Gunicorn**:
   - We run Gunicorn to serve the Django app:

     ```bash
     gunicorn --bind 0.0.0.0:8000 fundu_backend.wsgi:application
     ```

   We can now configure Nginx to reverse proxy to Gunicorn for better production performance.

---
