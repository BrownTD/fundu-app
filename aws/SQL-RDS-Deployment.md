# AWS RDS MySQL Configuration

## Overview
We configured an AWS RDS instance to host our MySQL database for the `fundu_db` project. This instance is connected to our Django backend to handle data storage for campaigns, donations, and users.

---

## AWS Configuration Steps

### 1. Created AWS RDS Instance
- Chose **MySQL** as the database engine.
- Set up automated backups with a retention period of **7 days**.
- Configured storage to **automatically scale** based on usage.
- Enabled **public accessibility** so it can be reached from our development environment.

### 2. Security Group Configuration
- Created an **inbound rule for port 3306 (MySQL)** to allow inbound traffic **from the IP address of the EC2 instance**.
  
### 3. Public Access
- Edited the inbound rules of the RDS instance’s security group to allow traffic on **port 3306**.
- For testing purposes, temporarily allowed connections from **anywhere (0.0.0.0/0)** and from our **EC2 instance’s security group**.
- **Note:** This will be tightened later to only include trusted IP addresses.

### 4. Schema Import
- Used `mysqldump` and our `schema.sql` file to import our database schema (tables and relationships) into the RDS instance.
- Confirmed that our table structures for:
  - **Users**
  - **Campaigns**
  - **Donations**
  - **Organizations**
  - **Transactions**
  - **Organization Members**

  were set up correctly on AWS.
Refer to `/database/schema.sql` for the complete database structure.

---

## Security Configurations

| Rule Type        | Port Range | Source                     | Description                                 |
|------------------|------------|----------------------------|---------------------------------------------|
| MySQL/Aurora     | 3306       | EC2 Security Group         | Allow traffic from EC2 instance             |
| MySQL/Aurora     | 3306       | 0.0.0.0/0 (Temporary)      | Allowed for testing; will restrict in production |

- Inbound rule for **MySQL on port 3306**:
- Allowed traffic **only** from the EC2 instance's security group.

