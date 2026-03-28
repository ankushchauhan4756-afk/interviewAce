import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { interviewAPI } from '../utils/apiService';
import CameraRecorder from '../components/CameraRecorder';
import Timer from '../components/Timer';
import { ChevronRight, Send, AlertCircle, Volume2, Volume } from 'lucide-react';
import './InterviewScreenPage.css';

function InterviewScreenPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [interviewId] = useState(sessionStorage.getItem('interviewId'));
  const [domain] = useState(sessionStorage.getItem('domain'));
  const [difficulty] = useState(sessionStorage.getItem('difficulty'));
  const [totalQuestions] = useState(parseInt(sessionStorage.getItem('totalQuestions')));

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const synthRef = useRef(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!interviewId) {
      navigate('/interview-setup');
      return;
    }

    fetchNextQuestion();
  }, [isAuthenticated, navigate, interviewId]);

  // Speak question when voice mode is on
  useEffect(() => {
    if (isVoiceMode && currentQuestion && synthRef.current) {
      speakQuestion();
    }
  }, [isVoiceMode, currentQuestion]);

  const speakQuestion = () => {
    if (!synthRef.current || !currentQuestion) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const textToSpeak = `${currentQuestion.title}. ${currentQuestion.description}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    synthRef.current.speak(utterance);
  };

  const fetchNextQuestion = async () => {
    setLoading(true);
    setError('');
    setAnswer('');
    setEvaluation(null);
    setAnswerSubmitted(false);
    setTimeSpent(0);

    try {
      const response = await interviewAPI.getNextQuestion(interviewId);

      if (response.data.success) {
        setCurrentQuestion(response.data.question);
        setQuestionNumber(response.data.questionNumber);
        setRecordingStartTime(Date.now());
      } else {
        if (response.data.message.includes('more questions')) {
          // All questions answered - end interview
          endInterview();
        }
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err.response?.data?.message || 'Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError('Please provide an answer before submitting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const timeSpent = recordingStartTime ? Math.floor((Date.now() - recordingStartTime) / 1000) : 0;

      const response = await interviewAPI.submitAnswer({
        interviewId,
        questionId: currentQuestion._id,
        answer,
        timeSpent
      });

      if (response.data.success) {
        setEvaluation(response.data.evaluation);
        setAnswerSubmitted(true);
        setTimeSpent(timeSpent);
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber >= totalQuestions) {
      endInterview();
    } else {
      fetchNextQuestion();
    }
  };

  const endInterview = async () => {
    try {
      const response = await interviewAPI.endInterview({
        interviewId,
        recordingDuration: timeSpent
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
      setError('Failed to end interview. Please try again.');
    }
  };

  const handleRecordingStart = () => {
    setIsRecording(true);
  };

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  const toggleVoiceMode = () => {
    if (isVoiceMode) {
      synthRef.current?.cancel();
    }
    setIsVoiceMode(!isVoiceMode);
  };

  if (!isAuthenticated || !interviewId) return null;

  return (
    <div className="interview-screen">
      <div className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <div className="header-info">
            <h1>{domain} Interview</h1>
            <span className="difficulty-badge">{difficulty}</span>
            <span className="question-counter">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div className="header-controls">
            <div className="mode-buttons">
              <button
                onClick={() => setIsVoiceMode(false)}
                className={`mode-btn ${!isVoiceMode ? 'active' : ''}`}
                title="Text Mode"
              >
                <span>T</span> Text Mode
              </button>
              <button
                onClick={toggleVoiceMode}
                className={`mode-btn ${isVoiceMode ? 'active' : ''}`}
                title="Voice Mode"
              >
                <Volume2 size={18} /> Voice Mode
              </button>
            </div>
            <Timer initialTime={5 * 60} onTimeUp={endInterview} />
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="interview-content">
          {/* Left: Camera */}
          <div className="camera-section">
            <CameraRecorder
              onRecordingStart={handleRecordingStart}
              onRecordingStop={handleRecordingStop}
              isRecording={isRecording}
            />
          </div>

          {/* Right: Question & Answer */}
          <div className="question-section">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading question...</p>
              </div>
            ) : currentQuestion ? (
              <>
                {/* Question Panel */}
                <div className="question-panel">
                  <div className="question-header">
                    <span className="question-counter-top">
                      Question {questionNumber}/{totalQuestions}
                    </span>
                    {isVoiceMode && (
                      <button
                        onClick={speakQuestion}
                        className="repeat-question-btn"
                        title="Repeat Question"
                      >
                        <Volume size={16} /> Repeat Question
                      </button>
                    )}
                  </div>
                  <h2>
                    {currentQuestion.title || currentQuestion.question || 'Question text unavailable'}
                  </h2>
                  <div className="question-description">
                    {currentQuestion.description || currentQuestion.details || 'Please wait, question is loading...'}
                  </div>

                  {currentQuestion.examples && currentQuestion.examples.length > 0 && (
                    <div className="examples">
                      <h3>Examples:</h3>
                      {currentQuestion.examples.map((ex, idx) => (
                        <div key={idx} className="example">
                          <p>
                            <strong>Input:</strong> {ex.input}
                          </p>
                          <p>
                            <strong>Output:</strong> {ex.output}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentQuestion.constraints && (
                    <div className="constraints">
                      <h3>Constraints:</h3>
                      <p>{currentQuestion.constraints}</p>
                    </div>
                  )}
                </div>

                {/* Evaluation */}
                {evaluation && (
                  <div className={`evaluation ${evaluation.isCorrect ? 'correct' : 'incorrect'}`}>
                    <h3>
                      {evaluation.isCorrect ? '✅ Great!' : '⚠️ Feedback'}
                    </h3>
                    <p className="score">Score: {evaluation.score}/100</p>
                    <p className="feedback">{evaluation.feedback}</p>

                    {evaluation.mistakes?.length > 0 && (
                      <div className="mistakes">
                        <strong>Mistakes:</strong>
                        <ul>
                          {evaluation.mistakes.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.improvements?.length > 0 && (
                      <div className="improvements">
                        <strong>To Improve:</strong>
                        <ul>
                          {evaluation.improvements.map((imp, i) => (
                            <li key={i}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Answer Input */}
                {!answerSubmitted ? (
                  <div className="answer-section">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here... Think aloud as if in a real interview!"
                      className="answer-input"
                      disabled={loading}
                    />
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={loading || !answer.trim()}
                      className="submit-btn"
                    >
                      <Send size={18} />
                      Submit Answer
                    </button>
                  </div>
                ) : (
                  <div className="action-footer">
                    {questionNumber < totalQuestions ? (
                      <button
                        onClick={handleNextQuestion}
                        className="next-btn"
                      >
                        Next Question
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={endInterview}
                        className="end-btn"
                      >
                        End Interview
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="no-questions">
                <p>No more questions. Good job!</p>
                <button onClick={endInterview} className="next-btn">
                  View Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewScreenPage;
