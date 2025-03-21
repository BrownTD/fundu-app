## March 20th
1. Setting Up Nginx, Gunicorn, and Django:
Installed necessary packages: We installed Gunicorn, Nginx, and set up our Django app on an EC2 instance.
Nginx Configuration: We configured Nginx to proxy requests to our Gunicorn server using a Unix socket.
Gunicorn Configuration: We tried to set up Gunicorn with both Unix socket and TCP connection methods, encountering permission and connection issues with the socket.
Created Nginx Configuration: We configured fundu-app in /etc/nginx/sites-available/fundu-app and linked it to the sites-enabled directory, updating the server block for handling traffic.
2. Troubleshooting:
Permissions Issues: We encountered multiple issues related to permission denied errors for the .sock file. We fixed some of the permissions but still faced errors.
Gunicorn Not Starting Properly: We experienced issues starting Gunicorn as a service using systemd, with error messages indicating process exits.
Checked Gunicorn Logs: We used journalctl to view Gunicorn logs and realized the process was failing due to errors in the configuration or missing files.
Manual Gunicorn Start: We attempted to start Gunicorn manually and used a Unix socket (fundu-app.sock), but still faced issues with permissions and socket configuration.
3. Database and Django Admin Setup:
Custom User Model: We created a custom user model CustomUser with fields like role, first_name, last_name, and email for authentication and authorization.
Superuser Creation: We encountered an error while trying to create a superuser with the custom user model. Errors arose because the custom model didn’t properly handle the creation of a superuser without the username field.
4. EC2 Setup and Access:
Used EC2 Instance: We installed software, set up Nginx and Gunicorn, and accessed the instance using SSH.
Security Groups Configuration: We configured EC2 security groups and inbound rules for HTTP/HTTPS and SSH access.
Used SSHFS: We set up SSHFS for mounting our EC2 instance to our local machine (for easy file management and editing).
5. Testing:
Testing Django App: We ran Django's runserver to check if our application could be accessed through the public IP of the EC2 instance.
Admin Panel Issues: We struggled to see the Django Admin Panel because a superuser was not created correctly, and we ran into issues with the custom user model.
6. Final Gunicorn and Nginx Setup:
We were able to start Gunicorn manually and configure it to run with Nginx as a reverse proxy, using port 8000 for testing.
We also planned to update our EC2 instance, Gunicorn configuration, and ensure everything works with both Gunicorn running manually and Nginx correctly proxying requests.
7. RDS and EC2 Resource Monitoring:
We researched how to monitor memory usage for EC2 and RDS instances, particularly within the Free Tier limits, and learned about CloudWatch metrics, how to use the AWS CLI for memory stats, and how to track usage in the AWS Billing Dashboard.
Challenges:
We faced a variety of issues with permissions (especially with the .sock file access), setting up Gunicorn, and configuring Nginx to proxy requests.
There were issues with creating a superuser using Django’s default process due to the custom user model not having a username.
We've manually run Gunicorn, but we’re also dealing with leftover service files (systemd) that may be trying to start Gunicorn.
Next Steps:
Ensure permissions for the .sock file are set correctly to allow Gunicorn to bind to the socket.
Consider fully removing any leftover systemd configurations if not needed.
Complete the creation of a Django superuser correctly with the custom user model.
Continue testing the setup with Nginx and Gunicorn to ensure everything works as expected.
