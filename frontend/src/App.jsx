import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import PracticePage from './pages/PracticePage'
import MockInterviewPage from './pages/MockInterviewPage'
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage'
import InterviewSetupPage from './pages/InterviewSetupPage'
import InterviewScreenPagePro from './pages/InterviewScreenPagePro'
import InterviewResultPage from './pages/InterviewResultPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import QuestionLibraryPage from './pages/QuestionLibraryPage'
import TopicsPage from './pages/TopicsPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import NotesResourcesPage from './pages/NotesResourcesPage'
import NotesDetailPage from './pages/NotesDetailPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/mock-interview" element={<MockInterviewPage />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
            <Route path="/notes-resources" element={<NotesResourcesPage />} />
            <Route path="/notes-resources/:category" element={<NotesDetailPage />} />
            <Route path="/interview-setup" element={<InterviewSetupPage />} />
            <Route path="/interview" element={<InterviewScreenPagePro />} />
            <Route path="/interview-result/:resultId" element={<InterviewResultPage />} />
            <Route path="/question-library" element={<QuestionLibraryPage />} />
            <Route path="/question-library/:course" element={<TopicsPage />} />
            <Route path="/question-library/:course/:topic" element={<QuestionsPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
