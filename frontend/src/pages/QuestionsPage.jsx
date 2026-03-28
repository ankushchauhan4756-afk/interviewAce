import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const { course, topic } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [search, setSearch] = useState('');

  const LIMIT = 30;
  const totalPages = Math.ceil(totalQuestions / LIMIT);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchQuestions();
  }, [course, topic, page, difficulty, search]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const client = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await client.get('/library/questions', {
        params: {
          course,
          topic,
          page,
          limit: LIMIT,
          ...(difficulty && { difficulty }),
          ...(search && { search }),
        },
      });

      setQuestions(response.data.questions || []);
      setTotalQuestions(response.data.pagination?.total || 0);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(`/question-library/${course}`);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleAnswer = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
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
      <div className="questions-page">
        <div className="questions-loading">
          <div className="spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-page">
      <div className="questions-header">
        <button className="back-btn" onClick={handleBackClick}>
          <ArrowLeft size={20} />
          Back to Topics
        </button>
        <div className="header-info">
          <h1>{topic}</h1>
          <p className="breadcrumb">{course} → {topic}</p>
          <p className="total-questions">Showing {((page - 1) * LIMIT) + 1} - {Math.min(page * LIMIT, totalQuestions)} of {totalQuestions} questions</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="difficulty-filter">
          <Filter size={18} />
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="questions-container">
        {questions && questions.length > 0 ? (
          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={question._id} className="question-item">
                <div className="question-header">
                  <div className="question-number-title">
                    <span className="question-number">{((page - 1) * LIMIT) + index + 1}</span>
                    <h3>{question.question}</h3>
                  </div>
                  <div className="question-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ borderColor: getDifficultyColor(question.difficulty), color: getDifficultyColor(question.difficulty) }}
                    >
                      {question.difficulty}
                    </span>
                    {question.isImportant && (
                      <span className="important-badge">⭐ Important</span>
                    )}
                  </div>
                </div>

                <div className="question-controls">
                  <button
                    className="toggle-answer-btn"
                    onClick={() => toggleAnswer(question._id)}
                  >
                    {expandedId === question._id ? (
                      <>
                        <ChevronUp size={16} />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Show Answer
                      </>
                    )}
                  </button>
                  <button
                    className="full-view-btn"
                    onClick={() => handleQuestionClick(question._id)}
                  >
                    Full View
                  </button>
                </div>

                {expandedId === question._id && (
                  <div className="answer-section">
                    <div className="answer-content">
                      <h4>Answer:</h4>
                      <p>{question.answer}</p>
                      {question.codeExample && (
                        <div className="code-example">
                          <h5>Code Example:</h5>
                          <pre>
                            <code>{question.codeExample}</code>
                          </pre>
                        </div>
                      )}
                      {question.keyPoints && question.keyPoints.length > 0 && (
                        <div className="key-points">
                          <h5>Key Points:</h5>
                          <ul>
                            {question.keyPoints.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-questions">
            <p>No questions found matching your filters.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <div className="page-info">
            Page <span>{page}</span> of <span>{totalPages}</span>
          </div>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
