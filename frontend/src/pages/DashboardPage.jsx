import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Zap } from 'lucide-react';
import { submissionsAPI } from '../utils/apiService';
import './DashboardPage.css';

function DashboardPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [isAuthenticated, navigate]);

  const fetchStats = async () => {
    try {
      const response = await submissionsAPI.getUserStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dashboard-page">
      <h1>Your Dashboard</h1>

      {loading ? (
        <div className="loading">Loading your stats...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <BarChart3 size={24} />
              </div>
              <div className="stat-content">
                <h3>Questions Attempted</h3>
                <p className="stat-value">{stats?.totalAttempted || 0}</p>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">
                <Zap size={24} />
              </div>
              <div className="stat-content">
                <h3>Correct Solutions</h3>
                <p className="stat-value">{stats?.totalCorrect || 0}</p>
              </div>
            </div>

            <div className="stat-card info">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>Accuracy</h3>
                <p className="stat-value">{stats?.accuracy || 0}%</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Recent Activity</h2>
              <p>No recent submissions yet. <Link to="/practice">Start practicing</Link></p>
            </div>

            <div className="dashboard-card">
              <h2>Topics to Focus</h2>
              <p>Complete some questions to see personalized recommendations.</p>
            </div>

            <div className="dashboard-card">
              <h2>Quick Actions</h2>
              <ul className="action-list">
                <li><Link to="/practice">👨‍💻 Practice Coding</Link></li>
                <li><Link to="/mock-interview">🎤 Mock Interview</Link></li>
                <li><Link to="/resume-analyzer">📄 Analyze Resume</Link></li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
