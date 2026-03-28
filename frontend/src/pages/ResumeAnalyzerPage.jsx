import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { resumeAPI } from '../utils/apiService';
import { FileText, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import './ResumeAnalyzerPage.css';

function ResumeAnalyzerPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchResumes();
  }, [isAuthenticated, navigate]);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getUserResumes();
      setResumes(response.data.resumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file) => {
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('extractedText', `Resume: ${file.name}`);

      const response = await resumeAPI.analyze(formData);
      setSelectedResume(response.data.resume);
      setResumes([response.data.resume, ...resumes]);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="resume-analyzer-page">
      {selectedResume ? (
        // Resume Analysis Result
        <div className="analysis-result">
          <button 
            onClick={() => setSelectedResume(null)}
            className="back-link"
          >
            ← Back to Resumes
          </button>

          <div className="analysis-container">
            <div className="ats-score">
              <div className="score-circle">
                <span className="score-value">{selectedResume.atsScore}</span>
                <span className="score-label">ATS Score</span>
              </div>
              <p className="score-description">
                Your resume has a good ATS score. Consider the suggestions below to improve it further.
              </p>
            </div>

            <div className="analysis-grid">
              <div className="analysis-card strengths">
                <div className="card-header">
                  <CheckCircle size={24} className="card-icon" />
                  <h3>Strengths</h3>
                </div>
                <ul>
                  {selectedResume.strengths?.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-card improvements">
                <div className="card-header">
                  <AlertCircle size={24} className="card-icon" />
                  <h3>Areas for Improvement</h3>
                </div>
                <ul>
                  {selectedResume.improvements?.map((improvement, idx) => (
                    <li key={idx}>{improvement}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-card suggestions">
                <div className="card-header">
                  <TrendingUp size={24} className="card-icon" />
                  <h3>Suggestions</h3>
                </div>
                <ul>
                  {selectedResume.suggestions?.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overall-feedback">
              <h3>Overall Feedback</h3>
              <p>{selectedResume.overallFeedback}</p>
            </div>

            <div className="action-buttons">
              <button className="download-btn">📥 Download Report</button>
              <button className="revise-btn">✏️ Revise & Reanalyze</button>
            </div>
          </div>
        </div>
      ) : (
        // Upload Screen
        <div className="analyzer-container">
          <div className="analyzer-header">
            <h1>Resume Analyzer</h1>
            <p>Upload your resume and get AI-powered analysis to optimize your ATS score</p>
          </div>

          <div className="upload-section">
            <FileUpload
              onFileSelect={handleFileSelect}
              accept=".pdf,.doc,.docx"
              label="Upload Your Resume"
            />
            {analyzing && <p className="analyzing-text">Analyzing your resume...</p>}
          </div>

          {resumes.length > 0 && (
            <div className="recent-analyses">
              <h2>Your Analyses</h2>
              <div className="analyses-grid">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="resume-card"
                    onClick={() => setSelectedResume(resume)}
                  >
                    <FileText size={32} className="resume-icon" />
                    <h4>{resume.fileName}</h4>
                    <div className="resume-score">
                      <span className="score">{resume.atsScore}/100</span>
                      <span className="label">ATS Score</span>
                    </div>
                    <p className="date">
                      {new Date(resume.analyzedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="tips-section">
            <h2>Resume Optimization Tips</h2>
            <div className="tips-grid">
              <div className="tip">
                <span className="tip-number">1</span>
                <h4>Use Keywords</h4>
                <p>Include relevant industry keywords from the job description</p>
              </div>

              <div className="tip">
                <span className="tip-number">2</span>
                <h4>Clear Structure</h4>
                <p>Organize into clear sections: Summary, Experience, Skills, Education</p>
              </div>

              <div className="tip">
                <span className="tip-number">3</span>
                <h4>Quantify Results</h4>
                <p>Use numbers and metrics to highlight your achievements</p>
              </div>

              <div className="tip">
                <span className="tip-number">4</span>
                <h4>Action Verbs</h4>
                <p>Start bullet points with strong action verbs like Led, Developed, Achieved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzerPage;
