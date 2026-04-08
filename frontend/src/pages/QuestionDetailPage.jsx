import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Bookmark, Share2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import './QuestionDetailPage.css';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = React.useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    fetchQuestion();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
    setIsBookmarked(bookmarks.includes(id));
  }, [id, authLoading, user]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/library/question/${id}`);
      setQuestion(response.data.question);
    } catch (err) {
      setError('Failed to load question. Please try again.');
      console.error('Error fetching question:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
    if (isBookmarked) {
      const filtered = bookmarks.filter(bid => bid !== id);
      localStorage.setItem('bookmarkedQuestions', JSON.stringify(filtered));
    } else {
      bookmarks.push(id);
      localStorage.setItem('bookmarkedQuestions', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'Hard':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  if (loading) {
    return (
      <div className="question-detail-page">
        <div className="detail-loading">
          <div className="spinner"></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="question-detail-page">
        <button className="back-btn-detail" onClick={handleBackClick}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="error-message">
          {error || 'Question not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="question-detail-page">
      <button className="back-btn-detail" onClick={handleBackClick}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <div className="header-content">
            <div className="meta-info">
              <span 
                className="difficulty-badge-detail"
                style={{ borderColor: getDifficultyColor(question.difficulty), color: getDifficultyColor(question.difficulty) }}
              >
                {question.difficulty}
              </span>
              {question.isImportant && <span className="important-badge-detail">⭐ Important</span>}
              <span className="views-badge">
                <Eye size={14} />
                {question.views || 0} views
              </span>
            </div>
            <h1>{question.question}</h1>
            {question.tags && question.tags.length > 0 && (
              <div className="tags">
                {question.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="header-actions">
            <button 
              className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={toggleBookmark}
              title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Bookmark size={20} />
            </button>
            <button className="action-btn share-btn" title="Share">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="detail-content">
          <section className="answer-section-detail">
            <h2>Answer</h2>
            <div className="answer-box">
              <p>{question.answer}</p>
            </div>
          </section>

          {question.codeExample && (
            <section className="code-section-detail">
              <h2>Code Example</h2>
              <div className="code-box">
                <pre>
                  <code>{question.codeExample}</code>
                </pre>
                <button 
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(question.codeExample);
                    alert('Code copied to clipboard!');
                  }}
                >
                  Copy Code
                </button>
              </div>
            </section>
          )}

          {question.keyPoints && question.keyPoints.length > 0 && (
            <section className="key-points-section-detail">
              <h2>Key Points</h2>
              <ul className="key-points-list">
                {question.keyPoints.map((point, idx) => (
                  <li key={idx}>
                    <span className="point-marker">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="metadata-section">
            <h3>Question Metadata</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <label>Course:</label>
                <span>{question.course}</span>
              </div>
              <div className="metadata-item">
                <label>Topic:</label>
                <span>{question.topic}</span>
              </div>
              <div className="metadata-item">
                <label>Views:</label>
                <span>{question.views || 0}</span>
              </div>
              <div className="metadata-item">
                <label>Added:</label>
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
