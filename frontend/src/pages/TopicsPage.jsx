import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './TopicsPage.css';

const TopicsPage = () => {
  const { course } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const courseColors = {
    'Full Stack': '#3b82f6',
    'Frontend': '#ec4899',
    'Backend': '#8b5cf6',
    'Java': '#d4a574',
    'Python': '#3b82f6',
    'Data Analyst': '#f59e0b',
    'DSA': '#10b981',
    'System Design': '#06b6d4',
  };

  useEffect(() => {
    // Auth check
    if (!user) {
      navigate('/login');
      return;
    }

    fetchTopics();
  }, [course]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const client = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await client.get('/library/topics', {
        params: { course },
      });

      setTopics(response.data.topics || []);
    } catch (err) {
      setError('Failed to load topics. Please try again.');
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/question-library');
  };

  const handleTopicClick = (topic) => {
    navigate(`/question-library/${course}/${topic}`);
  };

  if (loading) {
    return (
      <div className="topics-page">
        <div className="topics-loading">
          <div className="spinner"></div>
          <p>Loading topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="topics-page">
      <div className="topics-header-section">
        <button className="back-btn" onClick={handleBackClick}>
          <ArrowLeft size={20} />
          Back to Courses
        </button>
        <div className="topics-header">
          <BookOpen size={40} className="header-icon" />
          <h1>{course} Topics</h1>
          <p>Select a topic to explore questions and master the concepts</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="topics-container">
        <div className="topics-grid">
          {topics && topics.length > 0 ? (
            topics.map((topic, index) => (
              <div
                key={index}
                className="topic-card"
                onClick={() => handleTopicClick(topic)}
                style={{ borderLeftColor: courseColors[course] }}
              >
                <div className="topic-icon" style={{ backgroundColor: courseColors[course] + '20', color: courseColors[course] }}>
                  <BookOpen size={24} />
                </div>
                <h3>{topic}</h3>
                <p>View all questions related to {topic}</p>
                <div className="topic-arrow">→</div>
              </div>
            ))
          ) : (
            <div className="no-topics">
              <p>No topics found for this course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
