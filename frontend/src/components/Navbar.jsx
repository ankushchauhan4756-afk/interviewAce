import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.nav-menu') && !event.target.closest('.menu-icon')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <img src="/logo.svg" alt="InterviewAce" width="40" height="40" />
          <span>InterviewAce</span>
        </Link>

        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/practice" className="nav-link" onClick={() => setIsOpen(false)}>
                  Practice
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mock-interview" className="nav-link" onClick={() => setIsOpen(false)}>
                  Interview
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/resume-analyzer" className="nav-link" onClick={() => setIsOpen(false)}>
                  Resume
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/question-library" className="nav-link" onClick={() => setIsOpen(false)}>
                  Question Library
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/notes-resources" className="nav-link" onClick={() => setIsOpen(false)}>
                  Notes & Resources
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link cta-btn" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
