/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time in seconds to MM:SS
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get difficulty badge color
 */
export const getDifficultyColor = (difficulty) => {
  const colors = {
    'Easy': '#16a34a',
    'Medium': '#ea580c',
    'Hard': '#dc2626'
  };
  return colors[difficulty] || '#666';
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correct, total) => {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Get skill level from percentage
 */
export const getSkillLevel = (percentage) => {
  if (percentage >= 90) return 'Expert';
  if (percentage >= 75) return 'Advanced';
  if (percentage >= 50) return 'Intermediate';
  return 'Beginner';
};
