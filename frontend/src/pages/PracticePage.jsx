import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { questionsAPI, submissionsAPI } from '../utils/apiService';
import QuestionCard from '../components/QuestionCard';
import ResultCard from '../components/ResultCard';
import CodeEditor from '../components/CodeEditor';
import Timer from '../components/Timer';
import { ChevronLeft, Send, Search } from 'lucide-react';
import './PracticePage.css';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full Stack', 'Data Analyst', 'DSA', 'System Design'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

function PracticePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchQuestions();
  }, [isAuthenticated, navigate, category, difficulty, searchTerm, page]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (category !== 'All') filters.category = category;
      if (difficulty !== 'All') filters.difficulty = difficulty;
      if (searchTerm.trim()) filters.search = searchTerm;
      filters.page = page;
      filters.limit = 6;
      
      const response = await questionsAPI.getAll(filters);
      setQuestions(response.data.questions);
      setTotalPages(response.data.pages || 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    setCode('');
    setResult(null);
  };

  const handleSubmitCode = async () => {
    if (!selectedQuestion || !code.trim()) {
      alert('Please enter your code before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const response = await submissionsAPI.create({
        questionId: selectedQuestion._id,
        code,
        language,
        timeTaken: 0
      });

      // Use the actual evaluation result from backend
      if (response.data && response.data.submission) {
        setResult({
          status: response.data.submission.status,
          isCorrect: response.data.submission.isCorrect,
          score: response.data.submission.score,
          feedback: response.data.submission.feedback,
          testsPassed: response.data.submission.testsPassed,
          totalTests: response.data.submission.totalTests,
          executionTime: response.data.submission.executionTime,
          solution: response.data.submission.solution,
          solutionExplanation: response.data.submission.solutionExplanation
        });
      } else {
        setResult({
          status: 'error',
          isCorrect: false,
          score: 0,
          feedback: 'Error evaluating your submission',
          testsPassed: 0,
          totalTests: 0
        });
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      setResult({
        status: 'error',
        isCorrect: false,
        score: 0,
        feedback: `Error: ${error.response?.data?.message || error.message}`,
        testsPassed: 0,
        totalTests: 0
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTryAgain = () => {
    setCode('');
    setResult(null);
  };

  const handleViewSolution = () => {
    if (result?.solution) {
      setCode(result.solution);
      alert('Solution loaded! Review and try to understand the approach.');
    } else if (selectedQuestion?.solutionCode) {
      setCode(selectedQuestion.solutionCode);
      alert('Solution loaded! Review and try to understand the approach.');
    } else if (selectedQuestion?.solution) {
      setCode(selectedQuestion.solution);
      alert('Solution loaded! Review and try to understand the approach.');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="practice-page">
      {selectedQuestion ? (
        // Practice View
        <div className="practice-container">
          <div className="practice-header">
            <button 
              onClick={() => setSelectedQuestion(null)}
              className="back-button"
            >
              <ChevronLeft size={20} />
              Back to Questions
            </button>
            <Timer initialTime={1800} onTimeUp={() => {}} />
          </div>

          <div className="practice-content">
            <div className="question-section">
              <h2>{selectedQuestion.title}</h2>
              <div className="question-meta">
                <span className={`difficulty ${selectedQuestion.difficulty.toLowerCase()}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="category">{selectedQuestion.category}</span>
              </div>

              <div className="question-description">
                <h3>Description</h3>
                <p>{selectedQuestion.description}</p>
              </div>

              {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
                <div className="examples">
                  <h3>Examples</h3>
                  {selectedQuestion.examples.map((ex, idx) => (
                    <div key={idx} className="example">
                      <p><strong>Input:</strong> {ex.input}</p>
                      <p><strong>Output:</strong> {ex.output}</p>
                      {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                    </div>
                  ))}
                </div>
              )}

              {selectedQuestion.constraints && (
                <div className="constraints">
                  <h3>Constraints</h3>
                  <p>{selectedQuestion.constraints}</p>
                </div>
              )}
            </div>

            <div className="editor-section">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                onLanguageChange={setLanguage}
              />

              {result ? (
                <ResultCard
                  result={result}
                  onTryAgain={handleTryAgain}
                  onViewSolution={handleViewSolution}
                />
              ) : (
                <button
                  onClick={handleSubmitCode}
                  disabled={submitting || !code.trim()}
                  className="submit-code-btn"
                >
                  <Send size={18} />
                  {submitting ? 'Evaluating...' : 'Submit Solution'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Questions List View
        <div className="questions-container">
          <div className="questions-header">
            <h1>Practice Coding Questions</h1>
            
            {/* Search Bar */}
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search questions by title, description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-buttons">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${category === cat ? 'active' : ''}`}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="filter-section">
              <h3>Difficulty</h3>
              <div className="filter-buttons">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    className={`filter-btn ${difficulty === diff ? 'active' : ''}`}
                    onClick={() => {
                      setDifficulty(diff);
                      setPage(1);
                    }}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Loading questions...
            </div>
          ) : questions.length > 0 ? (
            <>
              <div className="questions-grid">
                {questions.map((question) => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    onSelect={handleSelectQuestion}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-questions">
              <p>No questions found matching your filters.</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setCategory('All');
                  setDifficulty('All');
                  setSearchTerm('');
                  setPage(1);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PracticePage;
