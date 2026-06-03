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
- `/staff` hidden staff entry
- `/admin/login` staff login
- `/admin/dashboard` staff dashboard
- `/admin/menu` admin menu demo
- `/admin/reports` website status demo

## Demo login

Use any values on the login page. It stores a demo login flag in localStorage.

## Next steps

1. Replace placeholder shop info in `src/data/shopInfo.js`
2. Replace sample menu in `src/data/menu.js`
3. Add real shop photos in `public/images`
4. Create Firebase project
5. Add Firebase config in `src/services/firebase.js`
6. Connect menu/shop settings to Firestore if live editing is needed
7. Deploy to Firebase Hosting
