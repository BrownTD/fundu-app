# Server Protection & Hardening Guide (DevOps + SecOps)

This guide documents the implementation of essential production-level security configurations on a cloud-hosted Ubuntu server using UFW and Fail2Ban. It covers SSH access control, firewall setup, port security, and custom intrusion detection using Fail2Ban with a modified filter to detect public key brute-force attempts.

---

## 1. Firewall Configuration with UFW (Uncomplicated Firewall)

### Installation and Setup

```bash
sudo apt update
sudo apt install ufw -y
```

### Allow Required Ports

```bash
sudo ufw allow 22     # SSH
sudo ufw allow 80     # HTTP
sudo ufw allow 443    # HTTPS
```

### Enable Firewall

```bash
sudo ufw enable
sudo ufw status
```

### Result:
Only essential ports (22, 80, 443) are accessible; all others are blocked.

---

## 2. SSH Access Hardening (DevOps + SecOps)

### Restrict SSH to Specific IP Address

Configure AWS EC2 Security Group to allow inbound SSH (port 22) **only from a trusted IP address**:
```
Type: SSH
Port: 22
Source: <TRUSTED_PUBLIC_IP>/32
```

### Disable Port 8000 (Django Dev Server)

Port 8000 should be closed in production. It is used only for development (`runserver`) and should not be exposed.

---

## 3. Fail2Ban Installation & Configuration

### Install Fail2Ban

```bash
sudo apt install fail2ban -y
```

### Enable and Start Service

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 4. Custom Fail2Ban Filter for SSH (Public Key Brute Force Protection)

### Problem:
AWS EC2 instances use key-based auth. Failed login attempts do not trigger the default `sshd` Fail2Ban filter.

### Solution:
Create a custom filter to detect failed public key authentication.

### Custom Filter File

```bash
sudo nano /etc/fail2ban/filter.d/sshd-custom.conf
```

Paste:

```ini
[Definition]
failregex = Connection closed by authenticating user .* <HOST> port \d+ \[preauth\]
ignoreregex =
```

---

### Update Jail Configuration

```bash
sudo nano /etc/fail2ban/jail.local
```

Add or modify:

```ini
[sshd]
enabled = true
port = ssh
filter = sshd-custom
logpath = /var/log/auth.log
maxretry = 3
bantime = 600
findtime = 600
```

### Restart Fail2Ban

```bash
sudo systemctl restart fail2ban
```

---

## 5. Monitoring & Management

### Check Fail2Ban Status

```bash
sudo fail2ban-client status sshd
```

### Unban an IP

```bash
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>
```

### Whitelist an IP to Prevent Future Bans

```bash
sudo fail2ban-client set sshd addignoreip <IP_ADDRESS>
```

---

## 6. Security Summary

| Port | Status     | Reason                                  |
|------|------------|------------------------------------------|
| 22   | Restricted | SSH access only from trusted IPs         |
| 80   | Open       | For HTTP traffic and SSL certificate renewal |
| 443  | Open       | For secure HTTPS traffic                 |
| 8000 | Closed     | Used only for development; not exposed   |

Fail2Ban and UFW work together to protect the server against brute-force attacks, while AWS Security Groups and SSH key-based authentication limit surface area and exposure.

---

## 7. DevOps & SecOps Scope

- **DevOps**: Automates firewall, server access, and SSH management
- **SecOps**: Implements log-based intrusion detection and response
