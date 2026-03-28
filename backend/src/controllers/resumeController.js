import Resume from '../models/Resume.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Analyze resume (with file upload)
 */
export const analyzeResume = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileName = req.file.originalname;
    const fileURL = `/uploads/resumes/${req.file.filename}`;
    const extractedText = req.body.extractedText || fileName;

    // Calculate ATS score based on keywords
    const commonKeywords = ['experience', 'skills', 'projects', 'education', 'achievements', 'technical', 'certification', 'award'];
    let atsScore = 0;
    
    commonKeywords.forEach(keyword => {
      if (extractedText.toLowerCase().includes(keyword)) {
        atsScore += 15;
      }
    });

    // Cap score at 100
    atsScore = Math.min(Math.max(atsScore, 65), 100); // Min 65, Max 100

    // Extract sections (simulated)
    const sections = {
      summary: extractedText.substring(0, 300) || 'No summary found',
      experience: ['Experience section detected'],
      skills: ['Technical skills should be mentioned'],
      education: ['Educational background'],
      projects: ['Portfolio projects']
    };

    // Generate dynamic feedback based on score
    const strengths = atsScore > 80 ? [
      'Strong keyword usage',
      'Well-structured format',
      'Good technical depth'
    ] : [
      'Professional layout',
      'Clear sections',
      'Contains essential information'
    ];

    const improvements = atsScore > 80 ? [
      'Add more specific metrics',
      'Include emerging technologies'
    ] : [
      'Add more quantifiable achievements',
      'Include relevant certifications',
      'Improve keyword density'
    ];

    const suggestions = [
      'Include metrics and impact numbers (e.g., increased revenue by 30%)',
      'Use industry-specific keywords from job descriptions',
      'Keep to 1-2 pages for better readability',
      'Add links to portfolio or GitHub',
      'Highlight leadership and collaboration skills'
    ];

    const overallFeedback = atsScore > 85 
      ? 'Excellent resume! You have strong structure and keyword optimization. Minor adjustments could push it to 95+.'
      : atsScore > 75
      ? 'Good resume structure. Adding more specific achievements with numbers will significantly improve your ATS score.'
      : 'Your resume has potential. Focus on adding quantifiable results and relevant keywords to improve ATS compatibility.';

    const resume = new Resume({
      userId: req.user.userId,
      fileName,
      fileURL,
      extractedText,
      atsScore,
      sections,
      strengths,
      improvements,
      suggestions,
      overallFeedback
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully',
      resume
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
};

/**
 * Get user resumes
 */
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get resume by ID
 */
export const getById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete resume
 */
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
