# Frontend Setup Guide

## Overview
The InterviewAce frontend is built with React 18, using Vite as the build tool for optimal performance.

## Directory Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── context/        # React Context API
│   ├── utils/          # Helper functions
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Components

### Navbar
- Responsive navigation with mobile menu
- Authentication links
- Logo with branding

### Footer
- Quick links
- Social media links
- Copyright information

### QuestionCard
- Displays coding question summary
- Shows difficulty level and topic
- Attempt counter

### CodeEditor
- Monaco Editor integration
- Multiple language support
- Copy and download functionality

### Timer
- Countdown timer for mock interviews
- Color warning when time is running out

### ChatBox
- AI interviewer chat interface
- Message history
- Typing indicators

### FileUpload
- Drag-and-drop resume upload
- File validation
- Progress indication

## Pages

### HomePage
- Feature showcase
- Call-to-action buttons
- Statistics display

### LoginPage / RegisterPage
- Form validation
- Error handling
- Password visibility toggle

### DashboardPage
- User statistics
- Performance metrics
- Quick action links

### PracticePage
- Question filtering (difficulty, topic)
- Code editor interface
- Solution submission

### MockInterviewPage
- Interview start screen
- Interview session with timer
- Chat interface

### ResumeAnalyzerPage
- Resume upload
- ATS score display
- Improvement suggestions

## API Integration

All API calls are centralized in `src/utils/apiService.js`.

```javascript
import { submissionsAPI } from '../utils/apiService';

// Example usage
const response = await submissionsAPI.create({
  questionId: '...',
  code: '...',
  language: 'javascript'
});
```

## Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token attached to all API requests
4. Token auto-refresh on 401 response
5. Logout clears token and redirects to home

## Styling

- CSS Modules for component-scoped styles
- Global styles in `index.css`
- CSS variables for theming:
  - `--primary-blue`: #2563eb
  - `--success`: #16a34a
  - `--danger`: #dc2626

## Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Image optimization
- CSS bundling with Vite

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3001
```

### Module Not Found
```bash
npm install
```

### API Connection Issues
- Check backend is running on port 5000
- Verify `VITE_API_BASE_URL` in .env
- Check browser console for CORS errors

## Build & Deployment

### Local Build
```bash
npm run build
```

### Deploy to Vercel

1. Push to GitHub
2. Connect project on Vercel
3. Set environment variables
4. Deploy

### Deploy to Netlify

1. Push to GitHub
2. Connect project on Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Development Tips

- Use React DevTools browser extension
- Check Network tab for API issues
- Use console for debugging
- Test on mobile using dev tools
