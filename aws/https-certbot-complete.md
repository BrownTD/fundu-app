# SSL Setup with Certbot + HTTPS for Django on Nginx

This guide documents how we secured the Django app hosted on EC2 using a custom domain and HTTPS with Certbot.

---

## ✅ Prerequisites

- Gunicorn + Nginx already running
- Domain (`funduhub.com`) pointing to EC2 IP
- App already accessible at `http://funduhub.com`

---

## ✅ Step 1: Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

---

## ✅ Step 2: Issue SSL Certificate

```bash
sudo certbot --nginx -d funduhub.com -d www.funduhub.com
```

## ✅ Step 3: Manually Configure Nginx for SSL

Edit Nginx config:

```bash
sudo nano /etc/nginx/sites-available/fundu
```

Replace contents with:

```nginx
server {
    listen 80;
    server_name funduhub.com www.funduhub.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name funduhub.com www.funduhub.com;

    ssl_certificate /etc/letsencrypt/live/funduhub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/funduhub.com/privkey.pem;

    include snippets/ssl-params.conf;

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

---

## ✅ Step 4: Create SSL Params File

```bash
sudo nano /etc/nginx/snippets/ssl-params.conf
```

Paste this in:

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_session_timeout 1d;
ssl_session_cache shared:MozSSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;

add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
```

---

## ✅ Step 5: Restart Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Step 6: Test HTTPS

Visit:

```
https://funduhub.com
```

Should see a **padlock** and your Django app loaded over HTTPS.

---

## ✅ Step 7: Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

That's it! Django app is now secured with SSL and fully production-ready.
