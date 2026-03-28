# 🎯 QUICK START GUIDE - Professional AI Mock Interview Platform

## 🚀 LAUNCHING THE PLATFORM

### Prerequisites
- Node.js and npm installed
- MongoDB running on localhost:27017
- Microphone connected
- Chrome/Firefox/Edge browser recommended

### Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access**: http://localhost:3000

---

## 📋 STEP-BY-STEP USAGE

### 1️⃣ LOGIN / REGISTER
```
Go to http://localhost:3000
Click "Register" or "Login"
Create account or log in with existing credentials
```

### 2️⃣ START INTERVIEW
```
From dashboard, click "Interview" in navbar
Or go to /interview-setup directly
```

### 3️⃣ INTERVIEW SETUP
```
Select Domain:
  - Frontend, Backend, Full Stack, Java, Python, Data Analyst, or DSA

Select Difficulty:
  - Easy, Medium, or Hard

Number of Questions:
  - Slide to select 3-10 questions

Grant Permissions:
  - Allow camera access
  - Allow microphone access
  - Allow fullscreen

Click "Start Interview" ▶️
```

### 4️⃣ DURING INTERVIEW

#### Interview Screen Overview
```
LEFT SIDE:
  📷 Camera preview (with recording indicator)
  ⏱️ Timer (5 minutes total)

RIGHT SIDE:
  🎤⌨️ Mode toggle (Voice / Text)
  📝 Question display
  🔊 Repeat button
  📢 Transcription (if Voice mode)
  📋 Answer input or 💬 Text area
  ✅ Submit button
  📊 Evaluation display
  ⏭️ Next Question button
```

#### VOICE MODE VS TEXT MODE

**VOICE MODE 🎤**
```
1. Click "Voice Mode" button (if not already selected)
2. Click "🎤 Start Recording"
3. speak your answer clearly
4. Watch live transcription appear
5. See confidence % increase
6. Click "Stop Recording" when done
7. Answer appears in transcript box
8. Click "Submit Answer"
9. Get instant evaluation
```

**TEXT MODE ⌨️**
```
1. Click "⌨️ Text Mode" button
2. Type your answer in the textarea
3. Can copy/paste from reference (allows pasting to inputs)
4. Format with code blocks if needed
5. Click "Submit Answer"
6. Get instant evaluation
```

#### ANTI-CHAETING FEATURES (Running in Background)

⚠️ **These actions will trigger violations:**
- 🔄 Switching to another tab
- 👁️ Clicking outside the browser window  
- 🖥️ Exiting fullscreen
- 📋 Trying to copy text
- 📋 Trying to paste (outside inputs)
- 🖱️ Right-clicking (context menu)
- 🔧 Opening developer tools

✅ **You can do:**
- Toggle between Voice/Text mode
- Switch modes mid-answer
- Repeat the question
- Move between camera and question
- Read displayed instructions

### 5️⃣ AFTER EACH ANSWER

**You'll see:**
```
┌─────────────────────────────────┐
│     Evaluation Results          │
├─────────────────────────────────┤
│  Score: 85/100  ✅ (Green)      │
│  Feedback: Good understanding   │
│                                 │
│  Mistakes:                      │
│  • Missing error handling       │
│  • No edge case mentioned       │
│                                 │
│  Improvements:                  │
│  ✓ Add try-catch blocks         │
│  ✓ Consider null checks         │
│                                 │
│  Mode: Voice  Confidence: 92%   │
└─────────────────────────────────┘

[⏭️ Next Question] (or [End Interview] if last)
```

---

## 🎯 SCORING EXPLANATION

### Score Ranges
- **90-100** 🟢 Excellent - Meets all requirements
- **75-89** 🟡 Good - Good understanding, minor issues
- **60-74** 🟠 Fair - Basic correct but missing details
- **40-59** 🔴 Needs Work - Significant issues
- **0-39** ❌ Incorrect - Major gaps or wrong approach

### Score Bonuses
- **Voice Mode**: +5% if confidence > 80%
- **Completeness**: Based on answer length and detail
- **Clarity**: Based on speech recognition confidence
- **Timeliness**: Faster correct answers valued

### Confidence Score (Voice Mode Only)
Shows how confident the speech recognition AI is that it understood you:
- **95-100%**: Crystal clear speech
- **85-94%**: Clear speech, understood well
- **75-84%**: Some background noise but understood
- **<75%**: Unclear - might wants to repeat

---

## 📊 RESULTS PAGE

After completing all questions:

### Overview Card
```
Overall Score: 82 🟡
Questions: 10/10
Time: 23:45
Status: Completed ✅
```

### Violations Report (If Any)
```
⚠️ Violations Detected: 2
  • Tab switched 1x
  • Window blur 1x
→ Interview flagged for admin review
```

### Per-Question Breakdown
Click each question to expand:
```
Q1: What is React?
  Your answer: "It's a JavaScript library..."
  Score: 90/100 ✅
  Feedback: Excellent explanation
  Mistakes: None
  
Q2: Explain state management
  Your Answer: (voice transcribed)
  Score: 75/100  🟡
  Feedback: Good but missing Redux mention
  Mistakes: • Redux not mentioned
```

---

## ⚙️ VOICE TIPS

### For Best Voice Recognition
✅ **DO:**
- Speak clearly and distinctly
- Use natural pauses between thoughts
- Ensure microphone is close (6 inches)
- Use proper grammar
- Speak at normal pace

❌ **DON'T:**
- Mumble or speak too fast
- Have loud background noise
- Read from script too quickly
- Whisper
- Interrupt yourself

### Troubleshooting Voice

**"No microphone detected"**
- Check browser permissions
- Ensure microphone is plugged in
- Restart interview

**"Transcription not appearing"**
- Check microphone volume
- Try speaking louder
- Check browser support (Chrome recommended)

**"Low confidence score"**
- Speak more clearly
- Reduce background noise
- Enunciate words better

---

## 🎮 KEYBOARD SHORTCUTS

| Key | Action |
|-----|--------|
| `M` | Toggle microphone (if recording) |
| `N` | Next Question (if evaluation shown) |
| `Q` | Quick exit (ends interview) |
| `T` | Toggle Voice/Text mode |
| `R` | Repeat Question |
| `S` | Submit Answer |

---

## 🐛 TROUBLESHOOTING

### "Error: Failed to start interview"
**Solution:**
- Refresh page
- Check backend is running (`npm run dev`)
- Clear browser cache
- Check MongoDB is running

### "Camera not showing"
**Solution:**
- Grant camera permission when prompted
- Refresh page
- Check device has camera
- Try different browser

### "Questions not loading"
**Solution:**
- Check internet connection
- Backend may be restarting (wait 5 sec)
- Clear sessionStorage: Ctrl+Shift+Delete

### "Interview auto-ended"
**Reason:** Too many violations detected
- Possible: Excessive tab switching
- Solution: Complete interview in single window

### "Voice not working"
**Solution:**
- Check microphone works
- Try in Chrome/Firefox (best support)
- Check volume settings
- Disable VPN (sometimes blocks APIs)

---

## 📱 BROWSER RECOMMENDATIONS

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Firefox | ✅ Full | Excellent support |
| Edge | ✅ Full | Chromium-based, works great |
| Safari | ⚠️ Partial | Voice may need permissions |
| Mobile | ❌ Limited | Desktop recommended |

---

## 🔒 PRIVACY & DATA

**What is stored:**
- Your answers (for evaluation)
- Your score and feedback
- Interview duration
- Violations (if any)
- Voice transcript (if voice mode)
- Your confidence scores

**What is NOT stored:**
- Microphone audio file (deleted after transcription)
- Camera video (unless explicitly saved)
- Keyboard strokes (never recorded)
- Browsing history
- Other apps you use

**Security:**
- All data encrypted in transit
- Password hashed in database
- Interview data associated with user account only
- Can delete interview data if needed (contact admin)

---

## 📞 SUPPORT

### Issue Checklist
Before reporting:
- [ ] Browser is up to date
- [ ] Internet connection is stable
- [ ] MongoDB is running
- [ ] Both backend and frontend running
- [ ] Tried refreshing page
- [ ] Cleared browser cache

### Common Questions

**Q: Can I retake the same interview?**
A: Yes! After completing, you can start a new interview from dashboard.

**Q: What if I disconnect mid-interview?**
A: The interview ends and your answers up to that point are saved.

**Q: Can I change my answer after submitting?**
A: No, once submitted, the evaluation is final for that question.

**Q: Will violations affect my score?**
A: Violations are logged separately. They appear in results but don't directly reduce score.

**Q: Is my voice data saved?**
A: The transcript is saved. Raw audio is not stored.

**Q: Can I see other users' interviews?**
A: No, only your own interviews are visible to you.

**Q: How long are interviews stored?**
A: Until deleted by you. No automatic deletion.

---

## 🎓 INTERVIEW STRATEGIES

### For Technical Questions
1. **Understand first** - Ask clarifying questions if needed
2. **Outline approach** - Mention your solution strategy
3. **Code carefully** - Explain what you're writing
4. **Test mental** - Walk through examples
5. **Discuss complexity** - Mention time/space complexity if applicable

### Voice Mode Strategy
1. **Organize thoughts** - Think before speaking
2. **Speak structured** - Use: "First, second, finally"
3. **Be concise** - Get to the point
4. **Explain code** - If coding, read it aloud
5. **Verify** - Ask if that answers the question

### Time Management
1. **Budget time** - 1-2 min per easy question
2. **Don't rush** - Quality > Speed
3. **Skip hard ones** - Return after easier ones (if possible)
4. **Review final** - Re-read before submitting

---

## 🌟 GOOD LUCK!

You're now ready to ace your interview! Remember:
- ✅ Speak clearly (if voice mode)
- ✅ Stay in one window
- ✅ Be authentic - it's just practice
- ✅ Review feedback to improve

**Now go to http://localhost:3000 and start your first professional mock interview! 🚀**
