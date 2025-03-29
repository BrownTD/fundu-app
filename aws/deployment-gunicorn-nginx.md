# Production Deployment: Gunicorn + Nginx + Custom Domain

This guide documents the exact steps taken to deploy a Django backend using:

- **Gunicorn** (app server)
- **Nginx** (reverse proxy)
- **EC2 instance** (Ubuntu)
- **Custom domain** (`funduhub.com`)

---

## ✅ Step 1: Install and Test Gunicorn

### Install inside virtual environment:
```bash
pip install gunicorn
```

### Test it manually:
```bash
gunicorn --bind 0.0.0.0:8000 fundu_backend.wsgi:application
```

---

## ✅ Step 2: Create Gunicorn Systemd Service

### Create service file:
```bash
sudo nano /etc/systemd/system/gunicorn.service
```

### Paste this (edit paths if needed):
```ini
[Unit]
Description=gunicorn daemon for FundU Django app
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/fundu-app/backend
ExecStart=/home/ubuntu/fundu-app/backend/env/bin/gunicorn --access-logfile - --workers 3 --bind 127.0.0.1:8000 fundu_backend.wsgi:application

[Install]
WantedBy=multi-user.target
```

### Start + enable the service:
```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn
```

---

## ✅ Step 3: Install and Configure Nginx

```bash
sudo apt update
sudo apt install nginx
```

### Create Nginx config file:
```bash
sudo nano /etc/nginx/sites-available/fundu
```

### Paste this:
```nginx
server {
    listen 80;
    server_name funduhub.com www.funduhub.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/ubuntu/fundu-app/backend;
    }

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

### Enable the config:
```bash
sudo ln -s /etc/nginx/sites-available/fundu /etc/nginx/sites-enabled
```

### Test and reload:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Step 4: Set `ALLOWED_HOSTS` in Django

In `fundu_backend/settings.py`:

```python
ALLOWED_HOSTS = ['funduhub.com', 'www.funduhub.com', '3.88.11.128']
```

Restart Gunicorn:

```bash
sudo systemctl daemon-reexec
sudo systemctl restart gunicorn
```

---

## ✅ Step 5: Domain Configuration

- Domain purchased: `funduhub.com`
- Set up an **A record**:
  - **Name**: `@`
  - **Type**: A
  - **Value**: `3.88.11.128` (EC2 public IP)
  - -  Add `www` A record too

---

## ✅ Success Confirmation

Visit:

```
http://funduhub.com
```

