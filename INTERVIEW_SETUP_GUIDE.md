# 🎤 InterviewAce AI Mock Interview Platform - Setup & Testing Guide

## ✅ What Was Built

### Core Features Implemented:
1. **Interview Setup Page** - Select domain, difficulty, number of questions
2. **Live Interview Screen** - Camera + Microphone recording with real-time feedback
3. **Question Management** - Random question distribution with no repeats
4. **Auto Evaluation** - Intelligent answer evaluation with feedback
5. **Detailed Results Page** - Comprehensive analytics and performance metrics
6. **Interview History** - Track all past interviews with scores

---

## 🚀 QUICK START

### 1. Backend Setup

```bash
cd backend

# Ensure dependencies are installed
npm install

# Make sure .env has MongoDB connection
# Example .env:
# MONGODB_URI=mongodb://localhost:27017/interviewace
# JWT_SECRET=your_secret_key
# PORT=5000

# Start the server
npm run dev
```

**Server should run on:** `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (if not already installed)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

**Frontend should run on:** `http://localhost:5173`

---

## 📝 Database Seeding (IMPORTANT!)

Before testing interviews, add sample questions to the database:

### Option 1: MongoDB Compass (Recommended)
1. Open MongoDB Compass and connect to your MongoDB instance
2. Navigate to `interviewace` → `questions`
3. Click "Insert Document" and paste this sample:

```json
{
  "title": "Explain React Virtual DOM",
  "description": "Can you explain what the Virtual DOM is and how it differs from the actual DOM? Why is it important in React?",
  "difficulty": "Medium",
  "category": "Frontend",
  "tags": ["react", "dom", "performance"],
  "examples": [
    {
      "input": "What updates the DOM?",
      "output": "React updates the Virtual DOM first, then syncs with the actual DOM"
    }
  ],
  "solution": "The Virtual DOM is a lightweight JavaScript representation of the real DOM...",
  "solutionCode": "// React creates a virtual representation of the UI",
  "constraints": "Answer should explain reconciliation",
  "timeComplexity": { "optimal": "O(n)", "bruteForce": "O(n²)" },
  "spaceComplexity": { "optimal": "O(n)", "bruteForce": "O(n²)" }
}
```

### Option 2: Using Node Script
Create `backend/seed-interviews.js`:

```javascript
import mongoose from 'mongoose';
import Question from './src/models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleQuestions = [
  // Frontend Questions
  {
    title: "Explain React Hooks",
    description: "What are React Hooks? Why were they introduced?",
    difficulty: "Easy",
    category: "Frontend",
    tags: ["react", "hooks"],
    examples: [{ input: "What is useState?", output: "Hook for managing state in functional components" }],
    solution: "React Hooks allow you to use state and other React features without class components.",
    solutionCode: "const [count, setCount] = useState(0);",
    constraints: ""
  },
  // Backend Questions
  {
    title: "Explain REST API Design",
    description: "What are the best practices for designing RESTful APIs?",
    difficulty: "Medium",
    category: "Backend",
    tags: ["rest", "api"], 
    examples: [{ input: "HTTP Method for GET?", output: "Should be idempotent and safe" }],
    solution: "REST APIs should follow HTTP conventions and stateless principles.",
    solutionCode: "GET /api/users/:id",
    constraints: ""
  },
  // DSA Questions
  {
    title: "Two Sum Problem",
    description: "Given an array of integers, find two numbers that add up to a target.",
    difficulty: "Easy",
    category: "DSA",
    tags: ["arrays", "hashmap"],
    examples: [{ input: "[2, 7, 11, 15], target=9", output: "[0, 1]" }],
    solution: "Use a HashMap to store values and their indices for O(n) solution.",
    solutionCode: "function twoSum(nums, target) { const map = new Map(); ... }",
    constraints: "Return indices of two numbers"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('✅ Seeded questions successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
```

Then run:
```bash
node backend/seed-interviews.js
```

---

## 🧪 Testing the Interview System

### Step 1: Login/Register
1. Go to `http://localhost:5173/login`
2. Create a new account or login

### Step 2: Start Interview
1. Navigate to **Interview** in navbar OR go to `/interview-setup`
2. Select:
   - **Domain**: Frontend (must match a question's category in DB)
   - **Difficulty**: Medium
   - **Number of Questions**: 3

### Step 3: Interview Screen
1. Allow **camera & microphone** permissions when prompted
2. Click **"Start Recording"** button
3. Answer the displayed question in the text box
4. Click **"Submit Answer"**
5. Review feedback and click **"Next Question"**
6. Repeat for all questions

### Step 4: View Results
After completing the interview:
- See **Overall Score** (0-100)
- View **per-question breakdown** with feedback
- Check **strengths** and **areas to improve**
- Click **Question titles** to expand detailed feedback

### Step 5: Download History
- Go to **Dashboard** to see stats update
- Visit **Interview History** to see past attempts

---

## 🔧 Advanced Configuration

### Add More Sample Questions

Add questions for each domain in MongoDB:

```javascript
{
  "title": "Python Decorators",
  "category": "Python",
  "difficulty": "Medium",
  ...
}

{
  "title": "System Design: URL Shortener",
  "category": "System Design",
  "difficulty": "Hard",
  ...
}

{
  "title": "SQL Joins Explanation",  
  "category": "Data Analyst",
  "difficulty": "Medium",
  ...
}
```

### Supported Categories:
- Frontend
- Backend
- Full Stack
- Java
- Python
- Data Analyst
- DSA

---

## 🐛 Troubleshooting

### Issue: Camera not showing
**Solution:**
- Allow browser camera/microphone permissions
- Refresh the page
- Check browser console for errors
- Try a different browser

### Issue: Questions not loading
**Solution:**
- Verify questions exist in MongoDB with matching `category` field
- Check console for API errors
- Ensure backend is running on correct port

### Issue: Answers not submitting
**Solution:**
- Verify backend API is accessible: `http://localhost:5000/api/health`
- Check if JWT token is valid (check browser DevTools → Network)
- Clear browser cache and try again

### Issue: Results not showing
**Solution:**
- Check interview ID in URL matches session storage
- Verify Result document was created in MongoDB
- Check network tab for API response

---

## 📊 API Endpoints Reference

### Interview Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview/start` | Start new interview |
| GET | `/api/interview/:interviewId/next-question` | Get next question |
| POST | `/api/interview/submit-answer` | Submit answer for evaluation |
| POST | `/api/interview/end` | End interview and generate results |
| GET | `/api/interview/result/:resultId` | Get interview results |
| GET | `/api/interview/history/all` | Get user's interview history |

### Request/Response Examples

**Start Interview:**
```bash
POST /api/interview/start
{
  "domain": "Frontend",
  "difficulty": "Medium",
  "totalQuestions": 5
}

Response:
{
  "success": true,
  "interview": {
    "_id": "...",
    "domain": "Frontend",
    "difficulty": "Medium",
    "totalQuestions": 5
  }
}
```

**Submit Answer:**
```bash
POST /api/interview/submit-answer
{
  "interviewId": "...",
  "questionId": "...",
  "answer": "User's answer text",
  "timeSpent": 180
}

Response:
{
  "success": true,
  "evaluation": {
    "score": 85,
    "feedback": "Great explanation!",
    "mistakes": [...],
    "improvements": [...],
    "isCorrect": true
  }
}
```

---

## 📱 Features Demonstration

### 1. Camera Recording
- ✅ Real-time camera preview with mirror effect
- ✅ Start/Stop recording buttons
- ✅ Recording indicator with timer
- ✅ Auto-mute/unmute during interview

### 2. Question Management
- ✅ Load questions based on selected domain/difficulty
- ✅ Prevent repeated questions in same interview
- ✅ Display examples and constraints
- ✅ Show question count progress (Q1 of 5)

### 3. Evaluation System
- ✅ Keyword-based answer matching
- ✅ Score calculation (0-100)
- ✅ Identifying mistakes in answers
- ✅ Providing improvement suggestions
- ✅ Immediate feedback display

### 4. Results Analytics
- ✅ Overall performance score
- ✅ Per-question breakdown
- ✅ Strengths identification
- ✅ Weak areas detection
- ✅ Visual score indicators

---

## 🎯 Performance Tips

1. **Optimize Questions**: Ensure question documents are indexed on `category` and `difficulty`
2. **Camera Performance**: 
   - Use adequate video bitrate (2.5Mbps recommended)
   - Close unnecessary browser tabs
   - Use modern browser for better codec support
3. **Database**: Use connection pooling
4. **Frontend**: Enable lazy loading for result images

---

## 🚀 Production Deployment

### Environment Variables (.env)

```
# Backend
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_secret_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# Frontend
VITE_API_URL=https://api.yourdomain.com
```

### Deploy Backend (Heroku example)
```bash
heroku login
heroku create your-interview-api
git push heroku main
heroku config:set MONGODB_URI=...
```

### Deploy Frontend (Vercel example)
```bash
npm run build
vercel --prod
```

---

## 📈 Future Enhancements

- [ ] AI-powered evaluation using GPT API
- [ ] Speech-to-text transcription
- [ ] PDF report generation
- [ ] Interview analytics dashboard
- [ ] Peer comparison metrics
- [ ] Question difficulty adjustment (adaptive)
- [ ] Mock interviewer AI voice
- [ ] Browser recording consent UI

---

## ✨ Summary

Your InterviewAce platform now includes:
- **Real-time mock interviews** with camera recording
- **Intelligent question distribution**
- **Auto-evaluation system**
- **Comprehensive analytics**
- **Full interview history**

Start testing now! 🚀
