import { getDifficultyColor } from '../utils/helpers';
import './QuestionCard.css';

function QuestionCard({ question, onSelect }) {
  return (
    <div className="question-card" onClick={() => onSelect(question)}>
      <div className="card-header">
        <h3>{question.title}</h3>
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
        >
          {question.difficulty}
        </span>
      </div>

      <p className="card-description">
        {question.description.substring(0, 100)}...
      </p>

      <div className="card-meta">
        <span className="category-tag">{question.category}</span>
        <span className="attempts">
          {question.attemptCount} attempt{question.attemptCount !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="card-footer">
        <div className="accuracy">
          Avg: {Math.round(question.avgAccuracy)}%
        </div>
        <button className="solve-btn">
          Solve Now →
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
