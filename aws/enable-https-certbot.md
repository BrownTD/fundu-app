# Enabling HTTPS with Certbot & Let's Encrypt

This guide walks through securing Django app with a free SSL certificate using **Certbot** and **Nginx**.

---

## ✅ Prerequisites

- Have a domain name pointing to EC2 public IP (e.g., funduhub.com)
- Have Nginx + Gunicorn already configured and running
- Can visit `http://yourdomain.com` and see Django app

---

## ✅ Step 1: Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

---

## ✅ Step 2: Run Certbot for Nginx

```bash
sudo certbot --nginx -d funduhub.com -d www.funduhub.com
```

- Certbot will detect Nginx config and update it
- When prompted:
  - Choose to **redirect HTTP to HTTPS**
  - Certbot will automatically reload Nginx with cert installed

---

## ✅ Step 3: Verify HTTPS Works

Open browser and visit:

```
https://funduhub.com
```

Should see the padlock icon — site is now secure!

---

## ✅ Step 4: Test Auto-Renewal (Optional)

Certbot auto-renews every 60–90 days. Test:

```bash
sudo certbot renew --dry-run
```

---

Now running a **fully encrypted Django app in production**!
