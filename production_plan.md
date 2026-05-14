
# Tekunik SaaS Infrastructure: Production Implementation Plan

## 1. Overview
This document outlines the production-level architecture for **Tekunik**, a SaaS website builder. The infrastructure supports automated subdomain provisioning, custom domain mapping with verification, integrated payment flows, and a self-hosted deployment strategy.

---

## 2. Domain & Subdomain Architecture

### 2.1 Wildcard Subdomain System (`*.tekunik.in`)
**Objective:** Allow every user to have an instant website at `username.tekunik.in`.

*   **DNS Configuration (GoDaddy):**
    *   **Type:** `A` | **Name:** `*` | **Value:** `103.31.221.150` | **TTL:** 600
    *   **Type:** `A` | **Name:** `@` | **Value:** `103.31.221.150` | **TTL:** 600
*   **Next.js Middleware Logic:**
    1.  Intercept every request.
    2.  Extract `hostname` from headers (`req.headers.get('host')`).
    3.  Exclude main domain (`tekunik.in`, `www.tekunik.in`, `localhost`).
    4.  Extract the prefix (e.g., `user1`).
    5.  **Internal Rewrite:** Use `NextResponse.rewrite()` to silently point to `/sites/[subdomain]`.
    6.  The browser URL remains `user1.tekunik.in`.

### 2.2 Custom Domain System (`soulkadhi.com`)
**Objective:** Allow premium users to point their own domains to their Tekunik site.

*   **Verification Workflow (TXT Token):**
    1.  User enters `soulkadhi.com` in the dashboard.
    2.  System generates a unique token: `tekunik-verify-7a8b9c2d`.
    3.  User adds a **TXT Record** at `@` with that token in their DNS.
    4.  **Backend Logic:** Use `dns.promises.resolveTxt('soulkadhi.com')` to verify the record exists before activating the domain.
*   **Routing Workflow (CNAME/A):**
    *   User adds a **CNAME** for `www` pointing to `tekunik.in`.
    *   **Middleware Logic:** If the hostname is not a subdomain of `tekunik.in`, the middleware queries the database for a matching `customDomain` field.

---

## 3. Database Schema Recommendations (MongoDB)

### `sites` Collection
```json
{
  "userId": "ObjectId",
  "subdomain": "soulkadhi",
  "customDomain": "soulkadhi.com",
  "isDomainVerified": true,
  "verificationToken": "tekunik-verify-7a8b9c2d",
  "status": "active", // active, inactive, suspended
  "paymentStatus": "paid", // unpaid, paid, trialing
  "planId": "pro_monthly",
  "subscriptionId": "sub_12345",
  "expiryDate": "2026-06-12T00:00:00Z",
  "lastPublished": "2026-05-12T00:00:00Z"
}
```

---

## 4. Payment & Subscription Integration

### 4.1 Architecture (Stripe/Razorpay)
*   **Provider:** Stripe (Global) or Razorpay (India).
*   **Checkout Flow:**
    1.  User clicks "Upgrade".
    2.  Backend creates a `Checkout Session` with `metadata: { siteId: '...' }`.
    3.  User completes payment on the provider's secure page.
    4.  Redirect back to `/dashboard?success=true`.
*   **Webhook Flow (Crucial for Automation):**
    1.  Provider sends a signed `POST` request to `/api/webhooks`.
    2.  Backend verifies the signature to ensure authenticity.
    3.  If `checkout.session.completed`:
        - Update `paymentStatus` to `paid`.
        - Set `expiryDate` (e.g., current date + 30 days).
        - Update the `sites` collection to mark the site as "Live".

---

## 5. Automated Go-Live Workflow

### 5.1 Middleware Security Gates
Every request to a subdomain or custom domain must pass these checks:
1.  **Existence:** Does this site exist in the database?
2.  **Payment Check:** Is `paymentStatus === 'paid'`?
3.  **Expiry Check:** Is `new Date() < expiryDate`?
4.  **Status Check:** Is `status === 'active'`?

If any check fails, the middleware rewrites the request to a specific "Site Inactive" or "Payment Required" page instead of the site's homepage.

---

## 6. Server & Deployment Architecture

### 6.1 Office Self-Hosting Setup
*   **Static Public IP:** `103.31.221.150` (Assigned to your router).
*   **Router Configuration:**
    *   **Port Forwarding:** Forward Port `80` (HTTP) and Port `443` (HTTPS) to the internal IP of your server (e.g., `192.168.1.100`).
*   **Reverse Proxy (Nginx):**
    *   Install Nginx on your server to handle incoming traffic.
    *   Nginx acts as the entry point, handles SSL, and forwards requests to your Next.js app (running on `localhost:3000`).
*   **SSL Strategy:**
    *   **Cloudflare (Recommended):** Use Cloudflare to manage DNS. Enable the "Proxy" (orange cloud) feature. Cloudflare provides free SSL/TLS between the user and their network, and you can use a "Cloudflare Origin Certificate" on your server.
    *   **Let's Encrypt:** Use `Certbot` with Nginx to generate and auto-renew SSL certificates. For wildcard subdomains, you will need the `dns-01` challenge.

---

## 7. Request Flow Diagram

```text
User Request (e.g., soulkadhi.com)
      |
      v
Cloudflare / Public IP (103.31.221.150)
      |
      v
Office Router (Port 443 Forwarding)
      |
      v
Server Nginx (SSL Termination)
      |
      v
Next.js Middleware
      |-- 1. Identify Host: soulkadhi.com
      |-- 2. Query DB: Is it verified? Is it paid?
      |-- 3. If Valid: Rewrite URL to /sites/soulkadhi-content
      |-- 4. If Invalid: Rewrite URL to /site-inactive
      v
Next.js Page Rendering
```

---

## 8. Implementation Checklist

### Phase 1: DNS & Basic Routing
- [ ] Configure Wildcard A record (`*`) in GoDaddy to point to `103.31.221.150`.
- [ ] Implement `middleware.js` to extract hostnames.
- [ ] Test internal rewrites for subdomains.

### Phase 2: Custom Domains & Verification
- [ ] Add `customDomain` and `verificationToken` fields to MongoDB `sites` collection.
- [ ] Create API route for domain verification using `dns/promises`.
- [ ] Build the UI for users to add domains and see their verification token.

### Phase 3: Payments
- [ ] Setup Stripe/Razorpay account and API keys.
- [ ] Implement checkout session creation API.
- [ ] Implement secure Webhook listener to handle successful payments.

### Phase 4: Server Deployment
- [ ] Setup Nginx as a reverse proxy on the office server.
- [ ] Configure port forwarding on the office router.
- [ ] Setup SSL (via Cloudflare Proxy or Certbot).
- [ ] Implement basic monitoring (e.g., PM2) to keep the app running.

---
**Document Status:** Final Production Plan | **Project:** Tekunik SaaS
