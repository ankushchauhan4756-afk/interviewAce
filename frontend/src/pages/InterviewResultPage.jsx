import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { interviewAPI } from '../utils/apiService';
import { Download, BarChart3, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import './InterviewResultPage.css';

function InterviewResultPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { resultId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!resultId) {
      navigate('/interview-setup');
      return;
    }

    fetchResult();
  }, [isAuthenticated, navigate, resultId]);

  const fetchResult = async () => {
    try {
      const response = await interviewAPI.getResult(resultId);
      if (response.data.success) {
        setResult(response.data.result);
      }
    } catch (err) {
      console.error('Error fetching result:', err);
      setError(err.response?.data?.message || 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    // This would integrate with a PDF library like jsPDF
    alert('PDF export feature coming soon!');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="result-page">
        <div className="loading-center">
          <div className="spinner-large"></div>
          <p>Loading your interview results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-page">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => navigate('/interview-setup')} className="btn-primary">
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { overallScore, questionScores, strengths, weaknesses, suggestionsSummary, difficulty, domain } = result;

  return (
    <div className="result-page">
      <div className="result-container">
        {/* Header */}
        <div className="result-header">
          <h1>🎉 Interview Complete!</h1>
          <p>Here's your detailed feedback and performance analysis</p>
        </div>

        {/* Overall Score Card */}
        <div className="score-card">
          <div className="score-circle" style={{ borderColor: getScoreColor(overallScore) }}>
            <span className="score-value">{overallScore}</span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-info">
            <h2>{getScoreLevel(overallScore)}</h2>
            <p className="difficulty-info">
              {domain} • {difficulty}
            </p>
            <div className="score-details">
              <div className="detail">
                <span className="label">Questions Attempted:</span>
                <span className="value">{questionScores.length}</span>
              </div>
              <div className="detail">
                <span className="label">Completion:</span>
                <span className="value">{result.completionPercentage}%</span>
              </div>
              <div className="detail">
                <span className="label">Duration:</span>
                <span className="value">
                  {Math.floor(result.totalDuration / 60)}m {result.totalDuration % 60}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Grid */}
        <div className="performance-grid">
          {/* Strengths */}
          <div className="performance-card strengths">
            <h3>
              <TrendingUp size={20} />
              Your Strengths
            </h3>
            {strengths && strengths.length > 0 ? (
              <ul>
                {strengths.map((strength, idx) => (
                  <li key={idx}>✓ {strength}</li>
                ))}
              </ul>
            ) : (
              <p>Continue practicing to identify your strengths</p>
            )}
          </div>

          {/* Areas to Improve */}
          <div className="performance-card weaknesses">
            <h3>
              <BarChart3 size={20} />
              Areas to Improve
            </h3>
            {weaknesses && weaknesses.length > 0 ? (
              <ul>
                {weaknesses.map((weakness, idx) => (
                  <li key={idx}>○ {weakness}</li>
                ))}
              </ul>
            ) : (
              <p>Great job! Keep practicing to maintain your level</p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {suggestionsSummary && suggestionsSummary.length > 0 && (
          <div className="suggestions-card">
            <h3>💡 Suggestions for Improvement</h3>
            <ul>
              {suggestionsSummary.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Question Details */}
        <div className="questions-section">
          <h3>Question Breakdown</h3>
          <div className="questions-list">
            {questionScores.map((qs, idx) => (
              <div key={idx} className="question-item">
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  className="question-header"
                >
                  <div className="question-title">
                    <span className="question-number">Q{idx + 1}</span>
                    <span className="question-text">{qs.question}</span>
                  </div>
                  <div className="question-score">
                    <span
                      className="score-badge"
                      style={{ backgroundColor: getScoreColor(qs.score) }}
                    >
                      {qs.score}
                    </span>
                    {expandedQuestion === idx ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>

                {expandedQuestion === idx && (
                  <div className="question-details">
                    <div className="detail-section">
                      <h4>Feedback</h4>
                      <p>{qs.feedback}</p>
                    </div>

                    {qs.mistakes && qs.mistakes.length > 0 && (
                      <div className="detail-section mistakes">
                        <h4>Mistakes</h4>
                        <ul>
                          {qs.mistakes.map((m, i) => (
                            <li key={i}>✗ {m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {qs.improvements && qs.improvements.length > 0 && (
                      <div className="detail-section improvements">
                        <h4>Areas to Focus</h4>
                        <ul>
                          {qs.improvements.map((imp, i) => (
                            <li key={i}>→ {imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={() => navigate('/interview-setup')} className="btn-secondary">
            Take Another Interview
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
          <button onClick={generatePDF} className="btn-secondary">
            <Download size={18} />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewResultPage;
