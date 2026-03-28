import { Clock } from 'lucide-react';
import { formatTime } from '../utils/helpers';
import { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ initialTime, onTimeUp, isActive = true }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          onTimeUp?.();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const isWarning = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`timer ${isWarning ? 'warning' : ''}`}>
      <Clock size={20} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}

export default Timer;
