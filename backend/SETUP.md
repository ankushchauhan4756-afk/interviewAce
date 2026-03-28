# Backend Setup Guide

## Overview
The InterviewAce backend is built with Express.js and MongoDB using Mongoose for data management.

## Directory Structure

```
backend/
├── src/
│   └── server.js        # Main server file
├── config/
│   └── db.js           # Database configuration
├── models/             # Mongoose schemas
├── controllers/        # Route handlers
├── routes/            # API endpoints
├── middleware/        # Custom middleware
├── utils/            # Utility functions
└── uploads/          # File storage
```

## Installation

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Configuration

### Environment Variables

Create `.env` file in backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewace?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
```

### MongoDB Setup

#### Using MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get connection string
5. Add IP whitelist
6. Update `MONGODB_URI` in .env

#### Local MongoDB

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Windows
# Download from mongodb.com

# Start MongoDB
mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/interviewace
```

## API Endpoints

### Authentication

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/profile           - Get user profile (protected)
PUT    /api/auth/profile           - Update profile (protected)
```

### Questions

```
GET    /api/questions              - Get all questions with filters
GET    /api/questions/:id          - Get single question
GET    /api/questions/difficulty/:difficulty  - Get by difficulty
POST   /api/questions              - Create question (admin)
PUT    /api/questions/:id          - Update question (admin)
DELETE /api/questions/:id          - Delete question (admin)
```

### Submissions

```
POST   /api/submissions            - Submit code (protected)
GET    /api/submissions/user/submissions     - Get user submissions (protected)
GET    /api/submissions/:id        - Get submission (protected)
PUT    /api/submissions/:id        - Update submission (protected)
GET    /api/submissions/user/stats - Get user statistics (protected)
```

### Feedback

```
POST   /api/feedback               - Create feedback (protected)
GET    /api/feedback/submission/:submissionId - Get feedback (protected)
GET    /api/feedback/user/feedback - Get user feedback (protected)
GET    /api/feedback/user/weak-areas - Get weak areas (protected)
```

### Resume

```
POST   /api/resume/analyze         - Analyze resume (protected)
GET    /api/resume/user/resumes    - Get user resumes (protected)
GET    /api/resume/:id             - Get resume (protected)
DELETE /api/resume/:id             - Delete resume (protected)
```

## Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- profilePicture (String)
- totalQuestionsAttempted (Number)
- totalQuestionsCorrect (Number)
- averageScore (Number)
- topicWisePerformance (Map)

### Question
- title (String)
- description (String)
- difficulty (Enum: Easy, Medium, Hard)
- topic (String)
- examples (Array of objects)
- solution (String)
- constraints (String)
- attemptCount (Number)
- avgAccuracy (Number)

### Submission
- userId (Reference)
- questionId (Reference)
- code (String)
- language (String)
- isCorrect (Boolean)
- score (Number)
- testsPassed (Number)
- feedback (String)
- timeTaken (Number)

### Feedback
- submissionId (Reference)
- userId (Reference)
- questionId (Reference)
- codeQuality (Object)
- efficiency (Object)
- correctness (Object)
- readability (Object)
- overallScore (Number)
- strengths (Array)
- improvements (Array)

### Resume
- userId (Reference)
- fileName (String)
- fileURL (String)
- atsScore (Number)
- sections (Object)
- strengths (Array)
- improvements (Array)
- suggestions (Array)

## Middleware

### authMiddleware
Verifies JWT token and extracts user information from request headers.

```javascript
// Usage
router.get('/protected', authMiddleware, controller);
```

### errorHandler
Centralized error handling middleware.

## Database Population

To populate sample data:

```javascript
// Create a seed file: backend/seed.js
const Question = require('./models/Question');

const sampleQuestions = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers...',
    difficulty: 'Easy',
    topic: 'Arrays',
    // ... more fields
  }
];

await Question.insertMany(sampleQuestions);
```

Run with:
```bash
node seed.js
```

## Error Handling

All errors are caught and formatted consistently:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Best Practices

1. **Environment Variables**: Never commit .env file
2. **Password Hashing**: Using bcryptjs with 10 salt rounds
3. **JWT**: Tokens expire after 7 days
4. **CORS**: Restricted to frontend origin
5. **Input Validation**: Using express-validator
6. **Rate Limiting**: Recommended for production

## Production Deployment

### Render.com

1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

### Environment Variables Production

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=long_random_secret_key
```

## File Uploads

Resumes are uploaded to `uploads/resumes/` directory using multer.

Configure upload size limit:
```javascript
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});
```

## Database Backup

```bash
# Backup MongoDB
mongodump --uri="mongodb_connection_string"

# Restore MongoDB
mongorestore --uri="mongodb_connection_string"
```

## Monitoring & Logging

For production, integrate:
- Morgan for HTTP logging
- Winston for application logging
- Sentry for error tracking

## Troubleshooting

### Database Connection Issues
- Check MONGODB_URI syntax
- Verify IP whitelist on MongoDB Atlas
- Ensure MongoDB service is running

### JWT Errors
- Check token format in Authorization header
- Verify JWT_SECRET matches between sessions
- Check token expiration

### CORS Errors
- Ensure frontend origin is allowed
- Check Access-Control headers

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## Testing

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

Example test:
```javascript
describe('Questions API', () => {
  it('should fetch all questions', async () => {
    const res = await request(app)
      .get('/api/questions');
    expect(res.status).toBe(200);
  });
});
```

## Performance Tips

1. Add database indexes for frequently queried fields
2. Implement caching (Redis)
3. Use pagination for large datasets
4. Optimize database queries
5. Enable compression middleware

## Support & Documentation

- Express.js: [expressjs.com](https://expressjs.com)
- MongoDB: [mongodb.com/docs](https://mongodb.com/docs)
- Mongoose: [mongoosejs.com](https://mongoosejs.com)
- JWT: [jwt.io](https://jwt.io)
