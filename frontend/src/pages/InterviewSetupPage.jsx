import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { interviewAPI } from '../utils/apiService';
import { Play, AlertCircle } from 'lucide-react';
import './InterviewSetupPage.css';

const DOMAINS = ['Frontend', 'Backend', 'Full Stack', 'Java', 'Python', 'Data Analyst', 'DSA'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function InterviewSetupPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [camerAccess, setCameraAccess] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check camera access
    checkCameraAccess();
  }, [isAuthenticated, navigate]);

  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraAccess(true);
    } catch (err) {
      console.error('Camera access denied:', err);
      setCameraAccess(false);
    }
  };

  const handleStartInterview = async () => {
    if (!domain || !difficulty) {
      setError('Please select both domain and difficulty');
      return;
    }

    if (!camerAccess) {
      setError('Camera and microphone access are required to start the interview');
      return;
    }

    setLoading(true);
    try {
      const response = await interviewAPI.startInterview({
        domain,
        difficulty,
        totalQuestions
      });

      if (response.data.success) {
        // Store interview ID and navigate to interview screen
        sessionStorage.setItem('interviewId', response.data.interview._id);
        sessionStorage.setItem('domain', domain);
        sessionStorage.setItem('difficulty', difficulty);
        sessionStorage.setItem('totalQuestions', totalQuestions);
        
        navigate('/interview');
      }
    } catch (err) {
      console.error('Error starting interview:', err);
      setError(err.response?.data?.message || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="interview-setup-page">
      <div className="setup-container">
        <div className="setup-header">
          <h1>🎤 Start Mock Interview</h1>
          <p>Select your preferred domain and difficulty level to begin</p>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {!camerAccess && (
          <div className="warning-banner">
            <AlertCircle size={20} />
            <span>Camera and microphone access required. Please enable permissions in your browser settings.</span>
          </div>
        )}

        <div className="setup-form">
          {/* Domain Selection */}
          <div className="form-group">
            <label className="form-label">Select Domain</label>
            <div className="options-grid">
              {DOMAINS.map(d => (
                <button
                  key={d}
                  className={`option-btn ${domain === d ? 'active' : ''}`}
                  onClick={() => setDomain(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="form-group">
            <label className="form-label">Select Difficulty</label>
            <div className="options-grid">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  className={`option-btn ${difficulty === d ? 'active' : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="form-group">
            <label className="form-label">
              Number of Questions: <strong>{totalQuestions}</strong>
            </label>
            <input
              type="range"
              min="3"
              max="10"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>3 questions (Easy)</span>
              <span>10 questions (Challenge)</span>
            </div>
          </div>

          {/* Interview Info */}
          <div className="interview-info">
            <div className="info-item">
              <span className="label">Estimated Duration:</span>
              <span className="value">{totalQuestions * 3}-{totalQuestions * 5} minutes</span>
            </div>
            <div className="info-item">
              <span className="label">Time per Question:</span>
              <span className="value">3-5 minutes</span>
            </div>
            <div className="info-item">
              <span className="label">Features:</span>
              <span className="value">Video Recording • Auto Evaluation • Instant Feedback</span>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartInterview}
            disabled={!domain || !difficulty || loading || !camerAccess}
            className="start-btn"
          >
            <Play size={20} />
            {loading ? 'Starting Interview...' : 'Start Interview'}
          </button>
        </div>

        {/* Requirements */}
        <div className="requirements">
          <h3>Requirements</h3>
          <ul>
            <li>✓ Stable internet connection</li>
            <li>✓ Webcam and microphone enabled</li>
            <li>✓ Quiet environment preferred</li>
            <li>✓ Browser with camera permissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetupPage;
