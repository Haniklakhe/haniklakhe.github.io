# Hanik Lakhe — Professional Portfolio Website

A full-stack, multi-page portfolio website with a React frontend, Node.js/Express backend, MongoDB database, and a complete admin panel to edit everything without touching code.

---

## 🗂 Project Structure

```
hanik-portfolio/
├── backend/              ← Node.js + Express API
│   ├── models/           ← MongoDB schemas
│   ├── routes/           ← REST API endpoints
│   ├── middleware/        ← JWT auth middleware
│   ├── utils/seed.js     ← Auto-populates DB on first run
│   ├── uploads/          ← Uploaded photos (local)
│   ├── server.js         ← Entry point
│   └── .env.example      ← Copy to .env and fill in
│
└── frontend/             ← React app
    └── src/
        ├── pages/        ← Home, Projects, Publications, About, Contact
        ├── pages/Admin/  ← Admin dashboard + all editors
        ├── components/   ← Navbar, Footer, BgCanvas
        ├── context/      ← Auth context (login state)
        ├── hooks/        ← useReveal (scroll animations)
        └── utils/api.js  ← Axios with auto JWT attach
```

---

## ⚡ Quick Start (Local Development)

### Step 1 — Prerequisites
Install these if you don't have them:
- [Node.js](https://nodejs.org/) v18 or higher
- A free [MongoDB Atlas](https://cloud.mongodb.com) account

### Step 2 — MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com and sign up free
2. Create a new **free cluster** (M0)
3. Under **Database Access** → Add user with username + password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect** → **Drivers** → Copy the connection string

### Step 3 — Backend Setup
```bash
cd backend
cp .env.example .env
# Open .env and fill in all values (MongoDB URI, JWT secret, admin password)
npm install
npm run dev
```
Backend runs at: http://localhost:5000

On first start, it auto-creates:
- Your admin account (from ADMIN_EMAIL + ADMIN_PASSWORD in .env)
- All your portfolio data (projects, publications, experience, profile)

### Step 4 — Frontend Setup
```bash
cd frontend
cp .env.example .env.local
# .env.local already points to localhost:5000 — no changes needed for local dev
npm install
npm start
```
Frontend runs at: http://localhost:3000

### Step 5 — Access the Admin Panel
Go to: http://localhost:3000/admin/login
- Email: whatever you set in `ADMIN_EMAIL` in .env
- Password: whatever you set in `ADMIN_PASSWORD` in .env

---

## 🌐 Free Deployment Guide

### Backend → Deploy on Render (free)

1. Push the `backend/` folder to a GitHub repository
2. Go to https://render.com and sign up free
3. Click **New → Web Service** → Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variables** (same as your .env):
   - `MONGODB_URI` → your Atlas connection string
   - `JWT_SECRET` → a long random string
   - `ADMIN_EMAIL` → hanik.lakhe@gmail.com
   - `ADMIN_PASSWORD` → your secure password
   - `FRONTEND_URL` → https://your-netlify-app.netlify.app
6. Deploy! Your API URL will be: `https://your-app.onrender.com`

### Frontend → Deploy on Netlify (free)

1. Push the `frontend/` folder to a GitHub repository
2. Go to https://netlify.com and sign up free
3. Click **Add new site → Import from Git**
4. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. Add **Environment Variable:**
   - `REACT_APP_API_URL` → `https://your-render-app.onrender.com/api`
6. Deploy! Your site will be at `https://your-app.netlify.app`

### Photo Storage for Production
By default photos are stored on your Render server disk (they disappear on redeploy).
For permanent photo storage, add [Cloudinary](https://cloudinary.com) (free tier):
1. Sign up at cloudinary.com
2. Add `CLOUDINARY_URL` to Render environment variables
3. Update `backend/routes/upload.js` to use cloudinary (ask for help if needed)

---

## 🔐 Admin Panel Features

| Section | What you can do |
|---------|----------------|
| **Profile** | Edit name, title, bio, social links, quote, languages, highlights |
| **Photos** | Upload/change profile photo and about page photo |
| **Stats** | Edit the 4 hero stats (years experience, papers, etc.) |
| **Roles** | Add/edit/remove current positions |
| **Skills** | Add/edit/remove skill categories and items |
| **Education** | Add/edit/remove education entries |
| **Awards** | Add/edit/remove awards |
| **References** | Add/edit/remove academic referees |
| **Projects** | Add/edit/delete projects, upload images, toggle featured/published |
| **Publications** | Add/edit/delete papers with DOI, status, type |
| **Experience** | Add/edit/delete work experience with bullet points |
| **Messages** | View all contact form submissions, mark read/replied, reply via email |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, CSS Modules |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |
| File Upload | Multer |
| Email | Nodemailer (Gmail) |
| Frontend Hosting | Netlify (free) |
| Backend Hosting | Render (free) |
| Database Hosting | MongoDB Atlas (free) |

---

## 📧 Email Setup (optional but recommended)

To receive contact form messages in your email:
1. Enable **2-Step Verification** on your Gmail account
2. Go to Google Account → Security → **App Passwords**
3. Generate an app password for "Mail"
4. Add to your .env: `EMAIL_PASS=xxxx xxxx xxxx xxxx`

---

## 🆘 Common Issues

**"Cannot connect to MongoDB"**
→ Check your MONGODB_URI in .env. Make sure 0.0.0.0/0 is whitelisted in Atlas Network Access.

**"Invalid token" on admin login**
→ Your JWT_SECRET might be wrong. Make sure .env has a JWT_SECRET and restart the server.

**Photos not showing after deploy**
→ Local uploads don't persist on Render. Use Cloudinary for production photo storage.

**Frontend shows blank page**
→ Check that REACT_APP_API_URL in Netlify environment variables points to your Render URL.
