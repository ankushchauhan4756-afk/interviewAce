import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { interviewAPI, violationsAPI } from '../utils/apiService';
import { ProctorMonitor } from '../utils/proctorMonitor';
import { TextToSpeech, SpeechToText, VoiceUtils } from '../utils/voiceUtils';
import CameraRecorder from '../components/CameraRecorder';
import Timer from '../components/Timer';
import { ChevronRight, Send, AlertCircle, Mic, Type, Volume2, RefreshCw } from 'lucide-react';
import './InterviewScreenPage.css';

function InterviewScreenPagePro() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Session state
  const [interviewId] = useState(sessionStorage.getItem('interviewId'));
  const [domain] = useState(sessionStorage.getItem('domain'));
  const [difficulty] = useState(sessionStorage.getItem('difficulty'));
  const [totalQuestions] = useState(parseInt(sessionStorage.getItem('totalQuestions')));

  // Interview state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Voice states
  const [voiceMode, setVoiceMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [speakingQuestion, setSpeakingQuestion] = useState(false);

  // Anti-cheat states
  const [violations, setViolations] = useState([]);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);

  // Performance tracking states
  const [totalScore, setTotalScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Refs
  const proctorRef = useRef(null);
  const ttsRef = useRef(new TextToSpeech());
  const sttRef = useRef(new SpeechToText());
  const recordingStartRef = useRef(null);
  const screenRef = useRef(null);

  // Initialize
  useEffect(() => {
    if (!isAuthenticated || !interviewId) {
      navigate('/login');
      return;
    }

    // Initialize proctoring
    initializeProctoring();

    // Start first question
    fetchNextQuestion();

    return () => {
      if (proctorRef.current) {
        proctorRef.current.stop();
      }
      if (sttRef.current) {
        sttRef.current.abort();
      }
      ttsRef.current.stop();
    };
  }, [isAuthenticated, interviewId, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K to toggle shortcuts panel
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      
      // Alt + R to repeat question
      if (e.altKey && e.key === 'r' && !answerSubmitted) {
        e.preventDefault();
        if (currentQuestion) {
          readQuestionAloud(currentQuestion.title || currentQuestion.question);
        }
      }
      
      // Enter to submit (when in text mode)
      if (e.key === 'Enter' && e.ctrlKey && !voiceMode && !answerSubmitted) {
        e.preventDefault();
        if (answer.trim()) handleSubmitAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [answer, voiceMode, answerSubmitted, currentQuestion]);

  /**
   * Initialize proctoring system
   */
  const initializeProctoring = async () => {
    try {
      proctorRef.current = new ProctorMonitor(interviewId, handleViolation);
      proctorRef.current.start();

      // Enforce fullscreen
      await enforceFullscreen();
    } catch (error) {
      console.error('Error initializing proctoring:', error);
    }
  };

  /**
   * Handle violations
   */
  const handleViolation = (violation) => {
    setViolations(prev => [...prev, violation]);

    if (violation.autoEnded) {
      endInterviewDueToViolation(violation);
    } else if (violation.severity === 'high') {
      setError(`⚠️ Suspicious activity detected: ${violation.description}. This will be reported.`);
    }
  };

  /**
   * End interview due to violation
   */
  const endInterviewDueToViolation = async (violation) => {
    setIsInterviewEnded(true);
    setError('❌ Interview ended due to suspicious activity detected.');

    setTimeout(() => {
      endInterview();
    }, 2000);
  };

  /**
   * Enforce fullscreen
   */
  const enforceFullscreen = async () => {
    try {
      const elem = screenRef.current || document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
        setFullscreenActive(true);
      }
    } catch (error) {
      console.warn('Could not enforce fullscreen:', error);
    }
  };

  /**
   * Fetch next question
   */
  const fetchNextQuestion = async () => {
    if (questionNumber > totalQuestions) {
      endInterview();
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');
    setTranscript('');
    setEvaluation(null);
    setAnswerSubmitted(false);

    try {
      const response = await interviewAPI.getNextQuestion(interviewId);

      if (response.data.success) {
        setCurrentQuestion(response.data.question);

        // Use server-side question indexing if available, otherwise increment locally
        const nextIndex = response.data.questionNumber || questionNumber;
        setQuestionNumber(nextIndex);

        recordingStartRef.current = Date.now();

        // Auto-read question if voice mode
        if (voiceMode && ttsRef.current) {
          setTimeout(() => readQuestionAloud(response.data.question.title || response.data.question.question), 500);
        }
      } else {
        endInterview();
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err.response?.data?.message || 'Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Read question aloud
   */
  const readQuestionAloud = (questionText) => {
    setSpeakingQuestion(true);
    ttsRef.current.speak(questionText, {
      rate: 0.9,
      pitch: 1,
      lang: 'en-US',
      onEnd: () => setSpeakingQuestion(false),
      onError: (err) => {
        console.error('TTS error:', err);
        setSpeakingQuestion(false);
      }
    });
  };

  /**
   * Start/stop voice recording
   */
  const toggleVoiceRecording = () => {
    if (isListening) {
      sttRef.current.stop();
      setIsListening(false);
    } else {
      sttRef.current.reset();
      setTranscript('');
      sttRef.current.start({
        onResult: (result) => {
          setTranscript(result.transcript);
          setConfidence(result.confidence);
        },
        onEnd: (finalTranscript) => {
          setIsListening(false);
          setAnswer(finalTranscript);
        }
      });
      setIsListening(true);
    }
  };

  /**
   * Submit answer for evaluation
   */
  const handleSubmitAnswer = async () => {
    const finalAnswer = voiceMode ? transcript : answer;

    if (!finalAnswer.trim()) {
      setError('Please provide an answer before submitting');
      return;
    }

    setLoading(true);
    try {
      const timeSpent = recordingStartRef.current
        ? Math.floor((Date.now() - recordingStartRef.current) / 1000)
        : 0;

      const response = await interviewAPI.submitAnswer({
        interviewId,
        questionId: currentQuestion._id,
        answer: finalAnswer,
        timeSpent,
        answerMode: voiceMode ? 'voice' : 'text',
        confidence
      });

      if (response.data.success) {
        setEvaluation(response.data.evaluation);
        setAnswerSubmitted(true);
        
        // Update performance tracking
        const score = response.data.evaluation.score;
        setTotalScore(prev => prev + score);
        setAnsweredCount(prev => prev + 1);
        
        // Update streak
        if (score >= 70) {
          setStreakCount(prev => prev + 1);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else {
          setStreakCount(0);
        }
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Move to next question
   */
  const handleNextQuestion = () => {
    if (!answerSubmitted) {
      setError('Please submit your answer before moving to the next question.');
      return;
    }

    if (questionNumber >= totalQuestions) {
      endInterview();
      return;
    }

    fetchNextQuestion();
  };

  /**
   * End interview
   */
  const endInterview = async () => {
    try {
      const response = await interviewAPI.endInterview({
        interviewId,
        recordingDuration: 0,
        violations: violations.length
      });

      if (response.data.success) {
        const resultId = response.data.result.resultId;
        sessionStorage.removeItem('interviewId');
        sessionStorage.removeItem('domain');
        sessionStorage.removeItem('difficulty');
        sessionStorage.removeItem('totalQuestions');

        navigate(`/interview-result/${resultId}`);
      }
    } catch (err) {
      console.error('Error ending interview:', err);
      setError('Failed to end interview');
    }
  };

  if (isInterviewEnded || !currentQuestion) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem',
        background: '#0f172a'
      }}>
        <div style={{ color: '#fff', fontSize: '1.5rem' }}>
          ⏳ Processing your interview...
        </div>
        <div style={{ color: '#94a3b8' }}>
          {isInterviewEnded ? 'Finalizing due to violation...' : 'Loading question...'}
        </div>
      </div>
    );
  }

  return (
    <div ref={screenRef} className="interview-screen-pro">
      {/* Confetti Animation */}
      {showConfetti && <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="confetti" style={{
            left: Math.random() * 100 + '%',
            delay: Math.random() * 0.5 + 's',
            duration: (Math.random() * 1 + 2) + 's'
          }} />
        ))}
      </div>}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="shortcuts-panel">
          <div className="shortcuts-content">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <div className="shortcut-item">
              <kbd>Ctrl + K</kbd> <span>Toggle shortcuts</span>
            </div>
            <div className="shortcut-item">
              <kbd>Alt + R</kbd> <span>Repeat question</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl + Enter</kbd> <span>Submit answer (Text mode)</span>
            </div>
          </div>
        </div>
      )}

      {/* Performance Stats Card */}
      <div className="performance-stats">
        <div className="stats-item">
          <span className="stats-label">Average Score</span>
          <span className="stats-value">
            {answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0}%
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">🔥 Streak</span>
          <span className="stats-value">{streakCount}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Answered</span>
          <span className="stats-value">{answeredCount}/{totalQuestions}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Progress</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(answeredCount / totalQuestions) * 100}%`}} />
          </div>
        </div>
      </div>

      {/* Violations Banner */}
      {violations.length > 0 && (
        <div className="violations-banner">
          <AlertCircle size={20} />
          <span>⚠️ {violations.length} suspicious activity/activities detected. Interview will be reviewed.</span>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="interview-container-pro">
        {/* Camera Section */}
        <div className="camera-section">
          <div className="camera-header">
            <h3>Interview Session <span>{fullscreenActive ? '🔒 Fullscreen' : '📱 Normal'}</span></h3>
          </div>
          <CameraRecorder
            onCameraStatusChange={setCameraOn}
            interviewId={interviewId}
          />
          <div className="timer-section">
            <Timer initialTime={300} />
          </div>
        </div>

        {/* Question & Answer Section */}
        <div className="question-answer-section">
          {/* Mode Toggle */}
          <div className="mode-toggle">
            <button
              className={`mode-btn ${voiceMode ? 'active' : ''}`}
              onClick={() => setVoiceMode(true)}
            >
              <Mic size={18} /> Voice Mode
            </button>
            <button
              className={`mode-btn ${!voiceMode ? 'active' : ''}`}
              onClick={() => setVoiceMode(false)}
            >
              <Type size={18} /> Text Mode
            </button>
            <button
              className="mode-btn shortcuts-btn"
              onClick={() => setShowShortcuts(!showShortcuts)}
              title="Keyboard Shortcuts (Ctrl+K)"
            >
              ⌨️ Help
            </button>
          </div>

          {/* Question Display */}
          <div className="question-panel">
            <div className="question-header">
              <h3>Question {questionNumber}/{totalQuestions}</h3>
              {speakingQuestion && <span className="speaking-indicator">🔊 Reading...</span>}
            </div>

            <div className="question-content">
              <p className="question-text">
                {currentQuestion?.title || currentQuestion?.question || 'Question not available'}
              </p>
              <p className="question-desc">
                {currentQuestion?.description || currentQuestion?.details || ' No question description available.'}
              </p>

              {currentQuestion?.examples && (
                <div className="examples">
                  <strong>Example:</strong>
                  <p>{Array.isArray(currentQuestion.examples) ? currentQuestion.examples.map((ex, idx) => (
                    <span key={idx}>{ex.input} → {ex.output}{idx < currentQuestion.examples.length-1 ? ' | ' : ''}</span>
                  )) : currentQuestion.examples}</p>
                </div>
              )}

              <button
                className="repeat-btn"
                onClick={() => readQuestionAloud(currentQuestion.question)}
                disabled={speakingQuestion}
              >
                <Volume2 size={16} /> Repeat Question
              </button>
            </div>

            {/* Answer Input */}
            {!answerSubmitted ? (
              <div className="answer-section">
                {voiceMode ? (
                  <div className="voice-input">
                    <div className="transcription-display">
                      <div className="label">Live Transcription:</div>
                      <div className={`transcript ${isListening ? 'listening' : ''}`}>
                        {transcript || '(Your speech will appear here...)'}
                      </div>
                      {confidence > 0 && (
                        <div className="confidence">
                          Confidence: {(confidence * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>

                    <button
                      className={`voice-record-btn ${isListening ? 'recording' : ''}`}
                      onClick={toggleVoiceRecording}
                    >
                      <Mic size={20} />
                      {isListening ? 'Stop Recording' : 'Start Recording'}
                    </button>
                  </div>
                ) : (
                  <textarea
                    className="answer-textarea"
                    placeholder="Write your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={6}
                  />
                )}

                <button
                  className="submit-answer-btn"
                  onClick={handleSubmitAnswer}
                  disabled={loading || !answer}
                >
                  <Send size={18} />
                  {loading ? 'Evaluating...' : 'Submit Answer'}
                </button>
              </div>
            ) : (
              <div className="evaluation-display">
                <div className="eval-header">
                  <h4>Evaluation</h4>
                  <div className={`score-badge score-${evaluation.score}`}>
                    {evaluation.score}/100
                  </div>
                </div>

                <div className="feedback-text">{evaluation.feedback}</div>

                {evaluation.mistakes && evaluation.mistakes.length > 0 && (
                  <div className="mistakes">
                    <strong>Mistakes:</strong>
                    <ul>
                      {evaluation.mistakes.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                )}

                {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                  <div className="suggestions">
                    <strong>Improvements:</strong>
                    <ul>
                      {evaluation.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}

                <button
                  className="next-question-btn"
                  onClick={handleNextQuestion}
                >
                  <ChevronRight size={18} />
                  {questionNumber >= totalQuestions ? 'End Interview' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewScreenPagePro;
