# Binh An Coffee Website

A low-cost, mobile-first coffee shop website for Binh An Coffee.

## Features included

- Public bilingual landing page: Vietnamese + English
- Full menu page
- Hidden staff login page
- Private staff dashboard for checking website content
- Demo admin menu and website status pages
- Firebase-ready service files
- Tailwind CSS responsive design

## Tech stack

- React
- Vite
- Tailwind CSS
- React Router
- Firebase-ready architecture

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Demo routes

- `/` landing page
- `/menu` public menu
- `/order?seat=5` customer QR ordering page
- `/staff` hidden staff entry
- `/admin/login` staff login
- `/admin/dashboard` staff dashboard
- `/admin/orders` kitchen order dashboard
- `/admin/seats` printable QR codes for seats
- `/admin/menu` admin menu demo
- `/admin/reports` website status demo

## QR ordering setup

The QR ordering feature uses Firebase Auth and Cloud Firestore directly from the web app.

1. Enable Cloud Firestore API for project `binh-an-coffee`.
2. Create the default Firestore database in production mode, preferably `asia-southeast1`.
3. Enable Firebase Authentication email/password provider.
4. Create a staff user in Firebase Auth.
5. Copy the staff user's UID.
6. In Firestore, create a document at `staff/{uid}`. The document can contain `{ "role": "staff" }`.
7. Deploy Firestore rules and indexes:

```bash
firebase deploy --only firestore --project binh-an-coffee
```

Customer QR URLs use the permanent seat IDs from `src/data/seats.js`, for example:

```text
https://binh-an-coffee.web.app/order?seat=5
https://binh-an-coffee.web.app/order?seat=cua-kinh
https://binh-an-coffee.web.app/order?seat=ban-dai
```

Staff can view printable QR codes at `/admin/seats` and live kitchen orders at `/admin/orders`.

## Next steps

1. Replace placeholder shop info in `src/data/shopInfo.js`
2. Replace sample menu in `src/data/menu.js`
3. Add real shop photos in `public/images`
4. Enable Firestore and Firebase Auth
5. Deploy Firestore rules
6. Connect menu/shop settings to Firestore if live editing is needed
7. Print permanent QR codes for each seat
