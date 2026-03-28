# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewace
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open Browser

Visit `http://localhost:3000`

---

## 📦 Key Folders

```
interviewAce/
├── frontend/          React UI
├── backend/           Express API
├── README.md          Main documentation
├── DEPLOYMENT.md      Deployment guide
├── CONTRIBUTING.md    Contribution guidelines
└── QUICK_START.md     This file
```

---

## 🗄️ Database

### Using MongoDB Atlas (Recommended)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `.env` with connection string

### Using Local MongoDB

```bash
# Install MongoDB Compass (GUI)
# Start MongoDB service
# Connect to mongodb://localhost:27017/interviewace
```

### Seed Sample Data

```bash
cd backend
node seed.js
```

---

## 🔐 Authentication

### Register/Login

1. Click "Get Started" on home page
2. Fill registration form
3. Credentials saved in MongoDB
4. JWT token in localStorage

---

## 🎯 Testing Features

### Practice Page
1. Go to `/practice`
2. Select a question
3. Write code in editor
4. Submit solution

### Mock Interview
1. Go to `/mock-interview`
2. Click "Start Interview"
3. Talk with AI interviewer

### Resume Analyzer
1. Go to `/resume-analyzer`
2. Upload resume PDF
3. View ATS score and feedback

---

## 📝 Add Sample Questions

```bash
cd backend
node seed.js
```

Or manually add via MongoDB Atlas interface.

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### MongoDB Connection Failed

- Check MongoDB is running
- Verify connection string
- Check username/password

### Frontend Can't Reach API

- Verify backend is running
- Check API URL in .env
- Check CORS settings

---

## 📚 Useful Commands

```bash
# Frontend
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview build

# Backend  
npm run dev          # Dev server with hot reload
npm start            # Production server
```

---

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://...                   # Database URL
JWT_SECRET=your_random_secret                # JWT signing key
NODE_ENV=development                         # Environment
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api # API endpoint
```

---

## 📱 Features Overview

| Feature | Path | Status |
|---------|------|--------|
| Coding Practice | `/practice` | ✅ Ready |
| Mock Interviews | `/interview-setup` | ✅ NEW! |
| Resume Analyzer | `/resume-analyzer` | ✅ Ready |

---

## 🎤 NEW - AI Mock Interview System

### Quick Start (2 minutes)

**Step 1:** Start both servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
cd frontend && npm run dev
```

**Step 2:** Seed interview questions
```bash
cd backend && node seed-interviews.js
```

**Step 3:** Start an interview
1. Go to `http://localhost:5173`
2. Login
3. Click "Interview" in navbar
4. Select domain (Frontend, Backend, etc.)
5. Choose difficulty (Easy, Medium, Hard)
6. Click "Start Interview"

### Features:
- 🎥 Camera + microphone recording (MediaRecorder API)
- 🎯 Smart question distribution (no repeats)
- 📊 Auto-evaluation with instant feedback
- 📈 Comprehensive analytics & results
- 💾 Interview history tracking

### API Endpoints:
```
POST   /api/interview/start           - Start new interview
GET    /api/interview/:id/next-question - Get next question
POST   /api/interview/submit-answer   - Submit & evaluate answer
POST   /api/interview/end             - End interview
GET    /api/interview/result/:id      - View results
GET    /api/interview/history/all     - View history
```

### Files Added:
- Backend: `src/models/Interview.js`, `src/models/Result.js`
- Backend: `src/routes/interview.js`, `src/controllers/interviewController.js`
- Frontend: `pages/InterviewSetupPage.jsx`, `pages/InterviewScreenPage.jsx`, `pages/InterviewResultPage.jsx`
- Frontend: `components/CameraRecorder.jsx`

### Test Flow:
1. Setup → Select Frontend + Easy + 3 questions
2. Interview → Answer questions with camera
3. Results → View scores and feedback
4. Dashboard → See updated stats

---

## 📚 Documentation

- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **INTERVIEW_SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_OVERVIEW.md** - Architecture overview
| Dashboard | `/dashboard` | ✅ Ready |
| Authentication | `/login`, `/register` | ✅ Ready |

---

## 🚀 Next Steps

1. ✅ [Read main README](./README.md)
2. ✅ [Setup guide for Backend](./backend/SETUP.md)
3. ✅ [Setup guide for Frontend](./frontend/SETUP.md)
4. ✅ [Deployment guide](./DEPLOYMENT.md)

---

## 💬 Need Help?

- Check README.md
- See SETUP.md files
- Check GitHub issues
- Contact: support@interviewace.com

---

**Happy coding! 🎉**
