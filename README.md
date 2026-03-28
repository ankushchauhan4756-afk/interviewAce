# InterviewAce
**Ace Your Interviews with AI-Powered Practice**

A comprehensive full-stack MERN application designed to help users practice coding questions, take mock interviews, analyze resumes, and track their performance with intelligent AI feedback.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- **Coding Practice System**: 500+ carefully curated coding questions with multiple difficulty levels
- **AI-Powered Mock Interviews**: Practice with AI interviewers that provide real-time feedback
- **Resume Analyzer**: Get ATS-optimized resume analysis with actionable suggestions
- **Performance Dashboard**: Track progress with comprehensive analytics and charts
- **User Authentication**: Secure JWT-based authentication

### Advanced Features
- **Personalized Recommendations**: Questions recommended based on skill level and weak areas
- **Weak Topic Detection**: Automatic identification of topics needing improvement
- **Confidence Scoring**: AI evaluates solution quality and confidence level
- **Performance Reports**: Download detailed performance reports (PDF/CSV)
- **Dark Mode**: Optional dark theme support
- **Responsive Design**: Fully mobile-responsive UI

---

## 🛠️ Tech Stack

### Frontend
- **React 18**: UI library
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **Monaco Editor**: Code editor component
- **Chart.js**: Data visualization
- **Lucide React**: Icons
- **Vite**: Build tool
- **CSS3**: Styling with modern features

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin requests

### DevTools
- **Nodemon**: Development server auto-reload
- **Vite**: Frontend build tool

---

## 📁 Project Structure

```
interviewAce/
├── frontend/                    # React application
│   ├── public/                 # Static assets
│   │   └── logo.svg           # Application logo
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── Timer.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   └── FileUpload.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── PracticePage.jsx
│   │   │   ├── MockInterviewPage.jsx
│   │   │   └── ResumeAnalyzerPage.jsx
│   │   ├── context/            # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── utils/              # Utility functions
│   │   │   ├── api.js
│   │   │   ├── apiService.js
│   │   │   └── helpers.js
│   │   ├── styles/             # Global styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                    # Express server
│   ├── src/
│   │   ├── server.js           # Main server file
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Submission.js
│   │   ├── Feedback.js
│   │   └── Resume.js
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   ├── submissionController.js
│   │   ├── feedbackController.js
│   │   └── resumeController.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── questions.js
│   │   ├── submissions.js
│   │   ├── feedback.js
│   │   └── resume.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── utils/                  # Utility functions
│   ├── package.json
│   ├── .env.example
│   └── uploads/               # File upload directory
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/interviewace.git
cd interviewace
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. **Create .env file** in the `backend` directory:
```bash
cp .env.example .env
```

2. **Update .env with your values**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewace?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Frontend Configuration

1. **Create .env file** in the `frontend` directory:
```bash
cp .env.example .env
```

2. **Update .env with your API base URL**:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Backend Server**:
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend Application**:
```bash
cd frontend
npm run dev
```
Application runs on: `http://localhost:3000`

### Production Build

**Backend**:
```bash
cd backend
npm start
```

**Frontend**:
```bash
cd frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

### Questions Endpoints

#### Get All Questions
```http
GET /api/questions?difficulty=Medium&topic=Arrays&search=array
```

#### Get Single Question
```http
GET /api/questions/{id}
```

#### Get Questions by Difficulty
```http
GET /api/questions/difficulty/{difficulty}
```

### Submissions Endpoints

#### Create Submission
```http
POST /api/submissions
Authorization: Bearer {token}
Content-Type: application/json

{
  "questionId": "...",
  "code": "...",
  "language": "javascript",
  "timeTaken": 300
}
```

#### Get User Submissions
```http
GET /api/submissions/user/submissions
Authorization: Bearer {token}
```

#### Get User Stats
```http
GET /api/submissions/user/stats
Authorization: Bearer {token}
```

### Resume Endpoints

#### Analyze Resume
```http
POST /api/resume/analyze
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- resume: {file}
- extractedText: {text}
```

#### Get User Resumes
```http
GET /api/resume/user/resumes
Authorization: Bearer {token}
```

---

## 🌐 Deployment

### Deploy Backend on Render

1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy Frontend on Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### MongoDB Atlas Setup

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Add to backend `.env`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email support@interviewace.com or create an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Voice-based interview feature
- [ ] Real-time collaboration
- [ ] Advanced code execution engine
- [ ] More AI-powered features
- [ ] Mobile app (React Native)
- [ ] Integration with job platforms

---

**Made with ❤️ to help you ace your interviews**
