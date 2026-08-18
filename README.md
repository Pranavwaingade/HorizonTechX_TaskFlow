# TaskFlow

TaskFlow is a full-stack task and project management web application built with the MERN stack. It provides authentication, project management, task management, comments, team information, dashboard insights, profile management, and theme preferences.

## 🚀 Live Demo

**Frontend:** https://magenta-entremet-698087.netlify.app

**Backend API:** https://horizontechx-taskflow.onrender.com

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected routes
- Dashboard with projects, tasks, activity, and team information
- Create, update, and manage projects
- Create and manage tasks
- Task comments with add, edit, and delete functionality
- Team member information
- User profile management
- Change password support
- Notification preferences
- Light and dark theme
- Theme persistence after page reload
- Responsive UI
- React Router SPA routing with Netlify reload support
- Toast notifications

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Lucide React
- React Hot Toast
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- Cookie Parser
- dotenv

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas
- Source Code: GitHub

## 📁 Project Structure

```text
HorizonTechX_TaskFlow/
├── frontend/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Pranavwaingade/HorizonTechX_TaskFlow.git
cd HorizonTechX_TaskFlow
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

### 3. Backend Setup

Open another terminal:

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run:

```bash
npm start
```

or:

```bash
npm run dev
```

## 🔐 Environment Variables

Never commit `.env` files or secrets to GitHub.

### Frontend

```env
VITE_API_URL=your_backend_api_url
```

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🌐 Deployment

The frontend is deployed on Netlify and the backend is deployed on Render.

**Production API:**

```text
https://horizontechx-taskflow.onrender.com/api
```

## 🔄 React Router / Netlify

A `_redirects` file is used so React Router pages work correctly after browser refresh:

```text
/*    /index.html   200
```

## 📌 Main Modules

- Authentication
- Dashboard
- Projects
- Tasks
- Comments
- Team
- Profile
- Settings

## 👨‍💻 Author

**Pranav Waingade**

Computer Science Student | MERN Stack Developer

## 📄 License

This project is created for learning, portfolio, and demonstration purposes.
