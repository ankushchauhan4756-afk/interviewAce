# 🔧 TECHNICAL IMPLEMENTATION GUIDE

## File Structure Changes

### Backend
```
backend/src/
├── models/
│   ├── Violation.js (NEW)
│   └── Interview.js (UPDATED)
├── controllers/
│   ├── violationController.js (NEW)
│   └── interviewController.js (UPDATED)
├── routes/
│   └── violations.js (NEW)
└── server.js (UPDATED)
```

### Frontend
```
frontend/src/
├── utils/
│   ├── proctorMonitor.js (NEW - 250+ lines)
│   └── voiceUtils.js (NEW - 200+ lines)
├── pages/
│   ├── InterviewScreenPagePro.jsx (NEW - 350+ lines)
│   └── InterviewScreenPagePro.css (NEW - 350+ lines)
├── App.jsx (UPDATED - new route)
└── utils/apiService.js (UPDATED)
```

---

## Core Components

### 1. ProctorMonitor (proctorMonitor.js)

**Purpose**: Detects and reports cheating violations

**Main Methods**:
```javascript
class ProctorMonitor {
  start()                      // Start monitoring
  stop()                       // Stop monitoring
  
  // Event Handlers
  handleVisibilityChange()     // Tab/window hidden
  handleWindowBlur()           // Window lost focus
  handleFullscreenChange()     // Fullscreen exited
  handleCopyAttempt()          // Copy blocked
  handlePasteAttempt()         // Paste blocked
  handleRightClick()           // Right-click blocked
  detectDevTools()             // Developer tools check
  
  // Utilities
  reportViolation()            // Send to API
  enforceFullscreen()          // Enter fullscreen
  getSummary()                 // Get violation stats
}
```

**Event Listeners Attached**:
```
'visibilitychange' → handleVisibilityChange
'blur'             → handleWindowBlur
'focus'            → handleWindowFocus
'fullscreenchange' → handleFullscreenChange
'copy'             → handleCopyAttempt
'cut'              → handleCopyAttempt
'paste'            → handlePasteAttempt
'contextmenu'      → handleRightClick
interval 2000ms    → detectDevTools
```

**Violation Types**:
```javascript
'tab_switch'         // Window.hidden = true
'window_blur'        // Window blur event
'camera_off'         // Camera stopped
'fullscreen_exit'    // document.fullscreenElement = null
'copy_paste_attempt' // Copy/paste blocked
'right_click'        // Context menu attempt
'dev_tools_open'     // Screen size suggests dev tools
'multiple_violations'// 3+ violations detected
```

---

### 2. Voice Utilities (voiceUtils.js)

#### TextToSpeech Class
```javascript
class TextToSpeech {
  speak(text, options)    // Read text aloud
  stop()                  // Stop speaking
  getSpeaking()           // Is currently speaking
  getVoices()             // Available voices
  setVoice(index)         // Select voice
}
```

**Usage**:
```javascript
const tts = new TextToSpeech();
tts.speak("Hello, answer this question", {
  rate: 0.9,
  pitch: 1,
  volume: 1,
  lang: 'en-US',
  onStart: () => console.log('Started'),
  onEnd: () => console.log('Finished'),
  onError: (err) => console.error(err)
});
```

#### SpeechToText Class
```javascript
class SpeechToText {
  start(options)          // Start listening
  stop()                  // Stop listening
  abort()                 // Abort recording
  getTranscript()         // Get text transcript
  reset()                 // Clear transcript
  getListening()          // Is listening now
  setLanguage(lang)       // Set language
  isSupported()           // Browser support check
}
```

**Usage**:
```javascript
const stt = new SpeechToText();
stt.start({
  onResult: (result) => {
    console.log('Transcript:', result.transcript);
    console.log('Confidence:', result.confidence);
    console.log('Is Final:', result.isFinal);
  },
  onEnd: (finalText) => console.log('Done:', finalText),
  onError: (error) => console.error(error)
});
```

---

### 3. InterviewScreenPagePro Component

**State Variables**:
```javascript
// Session
const [interviewId] = useState(...)        // From sessionStorage
const [domain] = useState(...)              // From sessionStorage
const [difficulty] = useState(...)          // From sessionStorage
const [totalQuestions] = useState(...)      // From sessionStorage

// Interview
const [currentQuestion, setCurrentQuestion]        // Current question data
const [questionNumber, setQuestionNumber]          // Q num tracking
const [answer, setAnswer]                          // Text answer
const [evaluation, setEvaluation]                  // Score & feedback
const [answerSubmitted, setAnswerSubmitted]        // Submission flag
const [loading, setLoading]                        // Loading indicator

// Voice
const [voiceMode, setVoiceMode]                    // Voice vs Text mode
const [isListening, setIsListening]                // Recording active
const [transcript, setTranscript]                  // Live transcription
const [confidence, setConfidence]                  // Speech confidence
const [speakingQuestion, setSpeakingQuestion]      // TTS active

// Anti-cheat
const [violations, setViolations]                  // Violation list
const [fullscreenActive, setFullscreenActive]      // Fullscreen status
const [cameraOn, setCameraOn]                      // Camera status
const [isInterviewEnded, setIsInterviewEnded]      // Interview ended flag
```

**Key Methods**:
```javascript
const initializeProctoring()      // Start ProctorMonitor
const handleViolation()            // Handle violation event
const fetchNextQuestion()          // Load next question
const readQuestionAloud()          // Use TTS
const toggleVoiceRecording()       // Toggle STT
const handleSubmitAnswer()         // Send answer to API
const handleNextQuestion()         // Load next question
const endInterview()               // Finalize interview
```

---

## API Integration

### Violations API

**Log Violation**
```
POST /api/violations/log
Headers: Authorization: Bearer {token}
Body: {
  interviewId: string,
  violationType: enum,
  description: string,
  severity: "low" | "medium" | "high" | "critical"
}
Response: {
  success: boolean,
  violation: Violation object,
  autoEnded: boolean
}
```

**Business Logic**:
- If 3+ violations of same type in 30 seconds → auto-end
- If severity === 'critical' → auto-end
- Stores timestamp, user, count
- Updates Interview model with cheatingDetected flag

**Get Interview Violations**
```
GET /api/violations/interview/:interviewId
Response: {
  success: boolean,
  violations: [Violation],
  summary: {
    totalViolations: number,
    byType: { type: count },
    bySeverity: { severity: count }
  }
}
```

**Get User Violation History**
```
GET /api/violations/history/all
Response: {
  success: boolean,
  violations: [Violation with interview details]
}
```

---

### Updated Interview API

**Submit Answer (Enhanced)**
```
POST /api/interview/submit-answer
Headers: Authorization: Bearer {token}
Body: {
  interviewId: string,
  questionId: string,
  answer: string,
  timeSpent: number,
  answerMode: "voice" | "text",
  confidence: number (0-1)
}
Response: {
  success: boolean,
  evaluation: {
    score: number (0-100),
    feedback: string,
    mistakes: string[],
    suggestions: string[],
    isCorrect: boolean,
    confidence: number (0-100),
    answerMode: string
  }
}
```

**Backend Logic**:
- Evaluates answer using keyword matching
- If voice mode + confidence > 0.8 → +5% bonus
- Score capped at 100
- Stores answerMode and confidence in Interview document
- Returns detailed evaluation

---

## Database Models

### Violation Schema
```javascript
{
  interviewId: ObjectId,          // Reference to interview
  userId: ObjectId,                // Reference to user
  violationType: string enum,      // Type of violation
  description: string,             // Human readable desc
  severity: string enum,           // low|medium|high|critical
  count: number,                   // How many times
  timestamp: Date,                 // When detected
  actionTaken: string enum,        // warning|recorded|interview_ended
  autoEnded: boolean,              // Was interview ended
  createdAt: Date,                 // DB created timestamp
  updatedAt: Date                  // DB updated timestamp
}
```

### Updated Interview Schema
```javascript
{
  // ... existing fields ...
  
  // NEW FIELDS
  cheatingDetected: boolean,       // Violations present?
  endedAt: Date,                   // When interview ended (if early)
  violationCount: number,          // Total violations in session
  
  // UPDATED
  status: enum,  // Now includes 'ended' state (from 'in-progress')
}
```

---

## Event Flow Diagram

### Interview Start
```
User clicks "Start Interview"
  ↓
Frontend: POST /api/interview/start
  ↓
Backend: Create Interview document
  ↓
Frontend: Store interviewId in sessionStorage
  ↓
Navigate to /interview
  ↓
interviewScreenPagePro mounts
  ↓
initializeProctoring() called
  ↓
ProctorMonitor.start()
  ↓
Attach all event listeners
  ↓
enforceFullscreen()
  ↓
readQuestionAloud() (TTS)
  ↓
Ready for interview ✅
```

### During Interview (User Switches Tab)
```
User switches tab
  ↓
visibilitychange event fires
  ↓
ProctorMonitor.handleVisibilityChange()
  ↓
violations.tab_switch++
  ↓
reportViolation('tab_switch', 'description', 'high')
  ↓
Frontend: POST /api/violations/log
  ↓
Backend: Create Violation document
  ↓
If count >= 3: Auto-end interview
  ↓
Frontend: setViolations([...violations])
  ↓
Show warning banner to user
```

### Answer Submission
```
User speaks answer OR types answer
  ↓
User clicks "Submit Answer"
  ↓
If voiceMode: answer = transcript
If textMode: answer = textarea value
  ↓
Frontend: POST /api/interview/submit-answer
  ↓
Backend: evaluateAnswer(answer, question)
  ↓
If voiceMode && confidence > 0.8: score += 5
  ↓
Store questionsAsked array item
  ↓
Return evaluation object
  ↓
Frontend: setEvaluation(response)
  ↓
Display score, feedback, mistakes, suggestions
```

---

## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| visibilitychange | ✅ | ✅ | ✅ | ✅ |
| blur/focus | ✅ | ✅ | ✅ | ✅ |
| Fullscreen API | ✅ | ✅ | ⚠️ | ✅ |
| SpeechRecognition | ✅ | ✅ | ⚠️ | ✅ |
| SpeechSynthesis | ✅ | ✅ | ✅ | ✅ |
| copy/paste events | ✅ | ✅ | ✅ | ✅ |
| contextmenu | ✅ | ✅ | ✅ | ✅ |

⚠️ = Limited or requires flags

---

## Performance Optimization Tips

### Frontend
1. **Question Caching**: Cache previous questions to avoid re-fetching
2. **Lazy Load CSS**: Split CSS into smaller chunks
3. **Debounce Voice Input**: Don't update state on every transcript event
4. **Memoize Components**: Use React.memo for static sections

### Backend
1. **Index Queries**: Add indexes on interviewId, userId in Violations
2. **Batch Violations**: Combine multiple violations if within 30s
3. **Pagination**: For violation history, use skip/limit
4. **Cache Questions**: Store questions in memory if dataset small

---

## Security Considerations

### Frontend Security
- ✅ Never send answers without interviewId verification
- ✅ Validate user authentication before starting
- ✅ Clear sessionStorage after interview
- ✅ HTTPS only in production

### Backend Security
- ✅ Verify JWT token on all protected routes
- ✅ Verify userId matches interview owner
- ✅ Validate violation types against enum
- ✅ Rate limit /violations/log endpoint
- ✅ Never allow violation deletion

### Violation Logging
- ✅ Immutable violation records
- ✅ Server-side timestamp (not client)
- ✅ Cannot modify existing violations
- ✅ Timestamps in UTC for consistency

---

## Future Enhancements

### Optional Phase 7: Analytics
- Interview comparison graphs
- Performance trends
- Strength/weakness tracking
- Recommend new topics

### Optional Phase 8: AI Integration
- GPT-based answer evaluation (instead of keyword matching)
- Confidence scoring from speech analysis
- Auto-suggest improvements
- Similar interview comparison

### Optional Phase 9: Recording
- Store video recording per interview
- Cloud storage integration
- Playback with violations timeline
- Screenshot capture on violations

### Optional Phase 10: Admin Dashboard
- View all violations
- Block users with excessive violations
- Analytics on platform usage
- Interview authenticity score

---

## Testing Checklist

- [ ] Anti-Cheating System
  - [ ] Tab switch detected
  - [ ] Window blur detected
  - [ ] Fullscreen exit recorded
  - [ ] Copy attempt blocked
  - [ ] Paste blocked (outside inputs)
  - [ ] Right-click blocked
  - [ ] Dev tools detected
  - [ ] 3+ violations auto-ends
  
- [ ] Voice Features
  - [ ] Question reads aloud
  - [ ] Repeat button works
  - [ ] Speech-to-text working
  - [ ] Live transcription updates
  - [ ] Confidence percentage shows
  - [ ] Voice/Text toggle works

- [ ] Interview Flow
  - [ ] Questions load dynamically
  - [ ] Next button instant
  - [ ] Score displayed correctly
  - [ ] Evaluation shows mistakes
  - [ ] Suggestions visible
  - [ ] Result page loads

- [ ] API Integration
  - [ ] /violations/log stores records
  - [ ] /interview/submit-answer works
  - [ ] Violations retrievable
  - [ ] Scores persistent

---

**Implementation Complete! 🎉**
