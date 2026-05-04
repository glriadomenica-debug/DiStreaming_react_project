# 🎬 DiStreaming React Project

DiStreaming is a web-based application built with React that allows users to manage movie data, categories, and users with authentication features. This project is designed as a simple admin dashboard for streaming content management.

---

## 🚀 Features

* 🔐 Authentication (Login & Logout)
* 👤 User Management (CRUD)
* 🎭 Category Management
* 🎬 Movie Management
* 📦 API Integration (Laravel Backend)
* 💬 Modal for Create & Delete Confirmation
* 📱 Responsive Design (Mobile, Tablet, Desktop)

---

## 🛠️ Tech Stack

**Frontend:**

* React + TypeScript
* Tailwind CSS
* Axios
* React Router DOM
* React Icons

**Backend:**

* Laravel (API)

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── layouts/
│   ├── modals/
│
├── pages/
│   ├── user/
│   ├── category/
│   ├── movie/
│   ├── auth/
│
├── services/
├── routes/
└── App.tsx
```

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/glriadomenica-debug/DiStreaming_react_project.git
```

2. Navigate to project folder

```bash
cd DiStreaming_react_project
```

3. Install dependencies

```bash
npm install
```

4. Run the project

```bash
npm run dev
```

---

## 🔑 Environment Setup

Make sure your backend (Laravel API) is running.

Update API base URL if needed:

```ts
http://localhost:8000/api/
```

---

## 📸 Screenshots
Visitor side:
<img width="1857" height="892" alt="Screenshot (34)" src="https://github.com/user-attachments/assets/82e2a45d-64dc-4f93-b908-9e170d28d164" />

Admin Side:
<img width="1858" height="882" alt="Screenshot (35)" src="https://github.com/user-attachments/assets/30a5c8a5-92ec-4cfb-b042-8ea02948b17a" />
<img width="1880" height="853" alt="Screenshot (36)" src="https://github.com/user-attachments/assets/04965ebd-af1a-40f5-8824-209a34bb5697" />
<img width="1887" height="840" alt="Screenshot (37)" src="https://github.com/user-attachments/assets/57629d39-b3f5-46d0-864e-3c0e1084210f" />

---

## 📌 Notes

* This project uses token-based authentication stored in `localStorage`.
* Protected routes are implemented to restrict access.
* Password is not recommended to be displayed in UI (for security reasons).

---

## 🧠 Learning Purpose

This project was built to practice:

* Full-stack integration (React + Laravel)
* CRUD operations
* Authentication & Authorization
* Component-based architecture
* Responsive UI design

---

## 👤 Author

**Gloria Domenica Ferreira Da Costa E Silva**

* GitHub: https://github.com/glriadomenica-debug

---

## 📄 License

This project is for educational purposes.
