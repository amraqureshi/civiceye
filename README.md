# CivicEye 👁️

> AI-powered civic issue reporting platform built with React + Vite

CivicEye is an AI-powered civic issue reporting and monitoring platform that helps citizens report local problems like potholes, garbage dumps, water leakage, traffic issues, broken streetlights, and more. The platform aims to bridge the gap between citizens and local authorities by making issue reporting faster, smarter, and more transparent.

---

# 🚀 Features

* 📸 Upload images of civic issues
* 📍 Location-based issue reporting
* 🤖 AI-assisted issue categorization
* 🗺️ Interactive map view of reported issues
* 📊 Real-time status tracking
* 🔔 Notifications and updates
* 👥 User-friendly dashboard
* ☁️ Firebase backend integration

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Vite

## Backend / Services

* Firebase Authentication
* Firebase Firestore
* Firebase Storage
* Firebase Hosting

## APIs & Tools

* Google Maps API
* AI/ML integrations (if applicable)

---

# 📂 Project Structure

```bash
civiceye/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── App.jsx
│
├── firebase.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/amraqureshi/civiceye.git
```

Go to the project folder:

```bash
cd civiceye
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 🔑 Firebase Setup

1. Create a Firebase project.
2. Enable Authentication.
3. Create Firestore Database.
4. Enable Firebase Storage.
5. Add your Firebase configuration inside:

```js
firebase.js
```

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

# 🌍 Future Improvements

* AI-based severity detection
* Authority dashboard
* Live complaint analytics
* Multi-language support
* Emergency alert integration
* Community voting system

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# ⚡ Built With Vite

This project uses React with Vite for a fast development experience, including:

* ⚡ Instant Hot Module Replacement (HMR)
* 🚀 Fast builds with Vite
* 🧹 ESLint configuration included
* 🎨 Modern React setup

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed by Amra Qureshi

GitHub: [https://github.com/amraqureshi](https://github.com/amraqureshi)
