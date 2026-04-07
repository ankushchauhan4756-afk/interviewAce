import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BookOpen, ArrowRight } from 'lucide-react';
import './QuestionLibraryPage.css';

function QuestionLibraryPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({});

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://interviewace-1-5zo7.onrender.com/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchCourses();
    fetchStatistics();
  }, [isAuthenticated, navigate]);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/library/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/library/statistics');
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const courseColors = {
    'Full Stack': '#3b82f6',
    'Frontend': '#ec4899',
    'Backend': '#8b5cf6',
    'Java': '#f59e0b',
    'Python': '#10b981',
    'Data Analyst': '#06b6d4',
    'DSA': '#f97316',
    'System Design': '#6366f1'
  };

  if (loading) {
    return (
      <div className="library-loading">
        <div className="spinner"></div>
        <p>Loading Question Library...</p>
      </div>
    );
  }

  return (
    <div className="question-library-page">
      <div className="library-header">
        <BookOpen size={40} className="header-icon" />
        <h1>Interview Question Library</h1>
        <p>Master interview preparation with our comprehensive question bank</p>
      </div>

      <div className="library-stats">
        <div className="stat-card">
          <span className="stat-label">Total Questions</span>
          <span className="stat-value">
            {Object.values(statistics).reduce((sum, s) => sum + (s.totalQuestions || 0), 0)}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Categories</span>
          <span className="stat-value">{courses.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Topics</span>
          <span className="stat-value">
            {Object.values(statistics).reduce((sum, s) => sum + (s.topics || 0), 0)}
          </span>
        </div>
      </div>

      <div className="courses-container">
        <h2>Select a Category</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course}
              className="course-card"
              style={{ borderLeftColor: courseColors[course] }}
              onClick={() => navigate(`/question-library/${course}`)}
            >
              <div className="course-header" style={{ backgroundColor: courseColors[course] }}>
                <h3>{course}</h3>
              </div>
              <div className="course-info">
                <div className="info-item">
                  <span className="label">Questions:</span>
                  <span className="value">{statistics[course]?.totalQuestions || 0}</span>
                </div>
                <div className="info-item">
                  <span className="label">Topics:</span>
                  <span className="value">{statistics[course]?.topics || 0}</span>
                </div>
              </div>
              <div className="difficulty-breakdown">
                <div className="difficulty-item easy">
                  <span>Easy</span>
                  <span className="count">{statistics[course]?.byDifficulty?.Easy || 0}</span>
                </div>
                <div className="difficulty-item medium">
                  <span>Medium</span>
                  <span className="count">{statistics[course]?.byDifficulty?.Medium || 0}</span>
                </div>
                <div className="difficulty-item hard">
                  <span>Hard</span>
                  <span className="count">{statistics[course]?.byDifficulty?.Hard || 0}</span>
                </div>
              </div>
              <button className="explore-btn">
                Explore <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionLibraryPage;
