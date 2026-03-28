import { CheckCircle, XCircle, RotateCcw, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './ResultCard.css';

function ResultCard({ result, onTryAgain, onViewSolution }) {
  const [showFeedback, setShowFeedback] = useState(true);
  const isCorrect = result?.status === 'correct' || result?.isCorrect;
  const score = result?.score || 0;
  const feedback = result?.feedback || '';
  const testsPassed = result?.testsPassed || 0;
  const totalTests = result?.totalTests || 0;

  return (
    <div className={`result-card ${isCorrect ? 'success' : 'error'}`}>
      {/* Status Header */}
      <div className="result-header">
        <div className="status-icon">
          {isCorrect ? (
            <CheckCircle size={48} className="success-icon" />
          ) : (
            <XCircle size={48} className="error-icon" />
          )}
        </div>
        <div className="status-text">
          <h2>
            {isCorrect ? '✅ Correct Solution!' : '❌ Incorrect Solution'}
          </h2>
          <p className="status-subtitle">
            {isCorrect
              ? 'Great job! Your solution works correctly.'
              : 'Your solution needs improvement. Keep practicing!'}
          </p>
        </div>
      </div>

      {/* Score Section */}
      <div className="score-section">
        <div className="score-box">
          <div className="score-label">Score</div>
          <div className="score-value">
            <span>{score}</span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${score}%` }}>
              {score >= 50 && <span className="score-percent">{score}%</span>}
            </div>
          </div>
        </div>

        {/* Test Cases Section */}
        {totalTests > 0 && (
          <div className="tests-box">
            <div className="tests-label">Test Cases</div>
            <div className="tests-value">
              <span className="tests-passed">{testsPassed}</span>
              <span className="tests-total">/ {totalTests}</span>
            </div>
            <div className="tests-bar-container">
              <div
                className="tests-bar"
                style={{ width: `${(testsPassed / totalTests) * 100}%` }}
              >
                {testsPassed === totalTests && (
                  <span className="all-passed">All Passed! 🎉</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Execution Time */}
        {result?.executionTime !== undefined && (
          <div className="time-box">
            <div className="time-label">Execution Time</div>
            <div className="time-value">{Math.round(result.executionTime)}ms</div>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="feedback-section">
          <button 
            className="feedback-toggle-btn"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <h3>
              {showFeedback ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Feedback
            </h3>
          </button>
          {showFeedback && (
            <div className="feedback-text">{feedback}</div>
          )}
        </div>
      )}

      {/* Details Grid */}
      {(isCorrect || score > 50) && (
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className={`detail-value ${isCorrect ? 'success' : 'partial'}`}>
              {isCorrect ? 'Accepted' : 'Partial'}
            </span>
          </div>
          {totalTests > 0 && (
            <div className="detail-item">
              <span className="detail-label">Test Result</span>
              <span className="detail-value">
                {testsPassed}/{totalTests} Passed
              </span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">Submission Status</span>
            <span className={`detail-value ${isCorrect ? 'success' : 'pending'}`}>
              {isCorrect ? 'Success' : 'Review Needed'}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="result-actions">
        <button className="btn btn-primary" onClick={onTryAgain}>
          <RotateCcw size={18} />
          Try Again
        </button>
        {!isCorrect && (
          <button className="btn btn-secondary" onClick={onViewSolution}>
            <Download size={18} />
            View Solution
          </button>
        )}
      </div>

      {/* Share Stats */}
      {isCorrect && (
        <div className="share-stats">
          <p>🎊 Awesome! Your solution is accepted. Share your progress!</p>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
