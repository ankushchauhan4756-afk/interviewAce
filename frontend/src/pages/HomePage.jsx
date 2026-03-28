import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Code, MessageSquare, FileText, BarChart3, CheckCircle, Zap, Book } from 'lucide-react';
import './HomePage.css';

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Ace Your Interviews with AI-Powered Practice</h1>
          <p>Master coding problems, practice mock interviews, and analyze your resume with intelligent AI feedback</p>
          
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
                <Link to="/practice" className="btn btn-secondary">
                  Start Practicing
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="logo-hero">
            <img src="/logo.svg" alt="InterviewAce Logo" width="100" height="100" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose InterviewAce?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Code size={32} className="feature-icon" />
            <h3>Coding Practice</h3>
            <p>Master hundreds of coding questions with difficulty levels from Easy to Hard</p>
          </div>

          <div className="feature-card">
            <MessageSquare size={32} className="feature-icon" />
            <h3>Mock Interviews</h3>
            <p>Practice with AI-powered interviewers that give real-time feedback and tips</p>
          </div>

          <div className="feature-card">
            <FileText size={32} className="feature-icon" />
            <h3>Resume Analyzer</h3>
            <p>Get ATS-optimized resume feedback and suggestions to land more interviews</p>
          </div>

          <div className="feature-card">
            <Zap size={32} className="feature-icon" />
            <h3>AI Feedback</h3>
            <p>Receive instant, detailed feedback on your code quality, efficiency, and logic</p>
          </div>

          <div className="feature-card">
            <BarChart3 size={32} className="feature-icon" />
            <h3>Performance Tracking</h3>
            <p>Track your progress with comprehensive analytics and identify weak areas</p>
          </div>

          <div className="feature-card">
            <CheckCircle size={32} className="feature-icon" />
            <h3>Personalized Recommendations</h3>
            <p>Get custom question recommendations based on your skill level and goals</p>
          </div>

          <div className="feature-card">
            <Book size={32} className="feature-icon" />
            <h3>Notes & Resources</h3>
            <p>Access comprehensive study materials, important topics, and external resources for all categories</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h4>500+</h4>
          <p>Questions</p>
        </div>
        <div className="stat-item">
          <h4>10K+</h4>
          <p>Students</p>
        </div>
        <div className="stat-item">
          <h4>95%</h4>
          <p>Success Rate</p>
        </div>
        <div className="stat-item">
          <h4>24/7</h4>
          <p>AI Support</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to ace your next interview?</h2>
        <p>Join thousands of students who have successfully landed their dream jobs</p>
        {!isAuthenticated && (
          <Link to="/register" className="btn btn-primary btn-lg">
            Start Free Today
          </Link>
        )}
      </section>
    </div>
  );
}

export default HomePage;
