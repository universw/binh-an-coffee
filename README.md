# Binh An Coffee Website

Mobile-first website and QR ordering system for **Tiệm Cà Phê Bình An**.

Live site:

```text
https://binh-an-coffee.web.app/
```

GitHub repository:

```text
https://github.com/universw/binh-an-coffee
```

## What This Project Does

- Public bilingual website in Vietnamese and English
- Homepage with rotating photo gallery
- Public menu page
- Permanent QR ordering links for each seat/table
- Customer order page
- Firebase Auth staff login
- Firestore-backed kitchen order dashboard
- Printable QR code admin page
- Firebase Hosting deployment through GitHub Actions

Sapo integration is intentionally not included in the current version.

## Main Links

Public:

```text
/                       Homepage
/menu                   Public menu
/order?seat=5           Customer QR order page example
```

Staff:

```text
/admin/login            Staff login
/admin/orders           Kitchen dashboard
/admin/seats            Printable QR codes
/admin/dashboard        Website overview
/admin/menu             Menu status demo
/admin/reports          Website status
```

Production URLs:

```text
https://binh-an-coffee.web.app/admin/login
https://binh-an-coffee.web.app/admin/orders
https://binh-an-coffee.web.app/admin/seats
https://binh-an-coffee.web.app/order?seat=5
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Firebase Hosting
- Firebase Auth
- Cloud Firestore
- GitHub Actions

## Local Development

Install dependencies:

```bash
npm install
```

Start local dev server:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Deployment

The site deploys automatically from GitHub.

Push to `main`:

```bash
git push
```

GitHub Actions runs:

```text
npm ci && npm run build
```

Then deploys to Firebase Hosting.

Manual deploy is also available:

```bash
npm run deploy
```

## Firebase Setup

Firebase project:

```text
binh-an-coffee
```

The web app config is in:

```text
src/services/firebase.js
```

Firestore config files:

```text
firestore.rules
firestore.indexes.json
firebase.json
```

Deploy Firestore rules and indexes:

```bash
firebase deploy --only firestore --project binh-an-coffee
```

Deploy hosting only:

```bash
firebase deploy --only hosting --project binh-an-coffee
```

## Staff Access

Staff login uses Firebase Auth email/password.

To allow a staff user into the kitchen dashboard:

1. Create the user in Firebase Authentication.
2. Copy the user's UID.
3. In Firestore, create:

```text
staff/{USER_UID}
```

Example:

```text
staff/GWH7zTfmJTWgeH35m1fEnBdfux73
```

Add this field:

```json
{
  "role": "staff"
}
```

Only users with a matching `staff/{uid}` document can read and update kitchen orders.

## QR Ordering

Customer QR links use permanent seat IDs from:

```text
src/data/seats.js
```

Current seat labels:

```text
5
6
Cửa Kính
Sofa Nâu
Sofa Màu
Cửa Sổ 1
Cửa Sổ 2
13
14
15
16
17
18
Lầu 19
lầu 20
lầu 21
lầu 22
Bàn Dài
```

Example QR URLs:

```text
https://binh-an-coffee.web.app/order?seat=5
https://binh-an-coffee.web.app/order?seat=cua-kinh
https://binh-an-coffee.web.app/order?seat=sofa-nau
https://binh-an-coffee.web.app/order?seat=ban-dai
```

QR codes can be printed from:

```text
https://binh-an-coffee.web.app/admin/seats
```

Use browser print:

```text
Cmd + P -> Save as PDF or Print
```

## Order Flow

Customer:

```text
Scan QR -> choose items -> submit order
```

Website:

```text
Writes new order to Firestore collection orders
```

Kitchen:

```text
/admin/orders reads active orders in realtime
```

Order statuses:

```text
new          Đơn mới
preparing    Đang làm
ready        Sẵn sàng
served       Đã phục vụ
cancelled    Đã hủy
```

## Manual Content Editing

Shop info:

```text
src/data/shopInfo.js
```

Menu:

```text
src/data/menu.js
```

Seat/table list:

```text
src/data/seats.js
```

Translations:

```text
src/locales/vi.json
src/locales/en.json
```

Hero slideshow:

```text
src/components/sections/Hero.jsx
public/images/hero-slides/
```

General images:

```text
public/images/
```

After editing:

```bash
npm run build
git add .
git commit -m "Update website content"
git push
```

## Important Notes

- Admin pages are intended for Vietnamese staff.
- Public pages support Vietnamese and English.
- Firestore rules allow public order creation but restrict order reading/updating to staff users.
- QR codes are permanent. Each order is new, but the seat URL stays the same.
- Keep Firebase service account secrets in GitHub Secrets, not in source code.

## Useful Files

```text
src/pages/Order.jsx                 Customer QR order page
src/pages/AdminOrders.jsx           Kitchen dashboard
src/pages/AdminSeats.jsx            QR code page
src/services/orderService.js        Firestore order operations
src/services/authService.js         Firebase Auth helpers
src/services/firebase.js            Firebase client setup
src/router/AppRoutes.jsx            App routes
.github/workflows/                  GitHub Actions deploy workflows
```
