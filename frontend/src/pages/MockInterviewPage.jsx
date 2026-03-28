import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MockInterviewPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Redirect to the new AI interview setup
    navigate('/interview-setup');
  }, [isAuthenticated, navigate]);

  return null;
}

export default MockInterviewPage;
