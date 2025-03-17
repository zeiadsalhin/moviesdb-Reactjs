# 🎬 The Movies - Streaming & Watchlist Platform

A Netflix-inspired movie and TV show web app built with **React**, **Supabase**, and **TMDB API**. Users can create accounts, manage watchlists, get personalized recommendations, and interact with a clean, modern UI.

![screenshot](https://moviesreactalfa.netlify.app/screenshot.png) <!-- Optional: Replace with a real screenshot -->

## ✨ Features

- 🔐 **Authentication** with Supabase (Email/Password, Google, GitHub)
- 🎭 **Netflix-style Design** using Material UI (MUI)
- ⭐ **Watchlist** for Movies & TV Shows (Saved to Supabase)
- 🎯 **Personalized Recommendations** based on your favorite movies
- 📝 **Ratings & Reviews** system
- 🛠 **Profile Dashboard** (Profile Info, Settings, Auth Providers)
- 🔐 **2FA (Two-Factor Authentication)** with Google Authenticator
- 🎥 **Media Cards & Details** using TMDB API
- 💡 **Responsive** and **Dark Mode** ready
- 📊 **User Stats Section** with random or real data (e.g. Avg Rating, Total Hours Watched, Fav Genre)
- 🛡 **Protected Routes** for authenticated users
- 📦 **Reusable Components** (Media Cards, Recommendations, Auth Forms)

---

## 🛠️ Tech Stack

- ⚛️ **React 19** - Frontend framework
- 🎨 **Material UI (MUI)** - Component library & UI styling
- 🟦 **Supabase** - Authentication & Database backend
- 🍿 **TMDB API** - Movie & TV show data
- ☁️ **Supabase Storage** - User profile picture & media storage
- 🔒 **Google Authenticator** - Two-Factor Authentication (2FA)
- 🔔 **React Toastify** - Notifications & Alerts
- 📦 **Axios** - API requests
- 🧪 **Formik + Yup** - Form handling and validation
- 🛡️ **Protected Routes** - Custom middleware for auth-protected pages
- 🎥 **OBS Studio** - For streaming-related content (optional)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/zeiadsalhin/the-movies.git
cd the-movies
npm install
```
---

## 🧩 Folder Structure

```bash
/src
 ┣ /components
 ┃ ┣ MediaCard.jsx
 ┃ ┣ NetflixOtpInput.jsx
 ┃ ┗ TwoFactorAuthInput.jsx
 ┣ /pages
 ┃ ┣ Home.jsx
 ┃ ┣ Profile.jsx
 ┃ ┣ Recommendations.jsx
 ┃ ┗ Watchlist.jsx
 ┣ /utils
 ┃ ┣ authConfig.js
 ┃ ┣ favoritesUtils.js
 ┃ ┗ tmdbUtils.js
 ┗ /auth
    ┣ SignIn.jsx
    ┣ SignUp.jsx
    ┗ ForgotPassword.jsx
```
---

## ✅ Completed Features

- 🔐 Authentication (Sign In / Sign Up / Forgot Password)
- 🔒 OTP-based and Password-based login
- 🧩 Two-Factor Authentication with Google Authenticator
- 📥 Save Movies and TV Shows to Watchlist
- 📝 Ratings & Reviews Section
- ❤️ Favorite Films Section
- 🤖 TMDB-based Recommendations System
- 🎨 Netflix-style Dashboard UI
- 🌑 Dark Mode (default)
- 🌐 Responsive Design (Mobile + Desktop)
- 🧰 Supabase Integration for Auth & Database

## ⚙️ Features In Progress

- 🎞 **Upcoming Releases Section**
- 🗂 **Categories & Filters for Watchlist**
- 🧠 **AI-Powered Recommendations** (optional)
- 💬 **Community Features** (Comments, Discussions)

---

## 🌍 Live Demo

[🔗 Live Demo](https://moviesreactalfa.netlify.app) <!-- Replace # with your actual live demo URL -->

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License.

## 🙌 Credits

[![TMDB](https://img.shields.io/badge/Powered%20by-TMDB-01b4e4)](https://www.themoviedb.org/documentation/api)  
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3fcf8e)](https://supabase.com/)  
[![Material UI](https://img.shields.io/badge/UI-Material%20UI-0081CB)](https://mui.com/)
[![Zeiad Abdeltawab](https://img.shields.io/github/license/zeiadsalhin/moviesdb-Reactjs)](https://github.com/zeiadsalhin)