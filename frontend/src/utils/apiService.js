import api from './api';

/**
 * Authentication API calls
 */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

/**
 * Questions API calls
 */
export const questionsAPI = {
  getAll: (filters = {}) => api.get('/questions', { params: filters }),
  getById: (id) => api.get(`/questions/${id}`),
  getByDifficulty: (difficulty) => api.get(`/questions/difficulty/${difficulty}`),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`)
};

/**
 * Submissions API calls
 */
export const submissionsAPI = {
  create: (data) => api.post('/submissions', data),
  getUserSubmissions: () => api.get('/submissions/user/submissions'),
  getById: (id) => api.get(`/submissions/${id}`),
  update: (id, data) => api.put(`/submissions/${id}`, data),
  getUserStats: () => api.get('/submissions/user/stats')
};

/**
 * Feedback API calls
 */
export const feedbackAPI = {
  create: (data) => api.post('/feedback', data),
  getBySubmission: (submissionId) => api.get(`/feedback/submission/${submissionId}`),
  getUserFeedback: () => api.get('/feedback/user/feedback'),
  getWeakAreas: () => api.get('/feedback/user/weak-areas')
};

/**
 * Resume API calls
 */
export const resumeAPI = {
  analyze: (formData) => api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserResumes: () => api.get('/resume/user/resumes'),
  getById: (id) => api.get(`/resume/${id}`),
  delete: (id) => api.delete(`/resume/${id}`)
};

/**
 * Interview API calls
 */
export const interviewAPI = {
  startInterview: (data) => api.post('/interview/start', data),
  getNextQuestion: (interviewId) => api.get(`/interview/${interviewId}/next-question`),
  submitAnswer: (data) => api.post('/interview/submit-answer', data),
  endInterview: (data) => api.post('/interview/end', data),
  getResult: (resultId) => api.get(`/interview/result/${resultId}`),
  getInterviewHistory: () => api.get('/interview/history/all')
};

/**
 * Violations/Proctoring API calls
 */
export const violationsAPI = {
  logViolation: (data) => api.post('/violations/log', data),
  getInterviewViolations: (interviewId) => api.get(`/violations/interview/${interviewId}`),
  getViolationHistory: () => api.get('/violations/history/all')
};
