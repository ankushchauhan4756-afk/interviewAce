import Resume from '../models/Resume.js';
import fs from 'fs';
import path from 'path';

/**
 * Analyze resume (simulated AI analysis)
 */
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileName = req.file.originalname;
    const fileURL = `/uploads/resumes/${req.file.filename}`;

    // Simulated text extraction and analysis
    const extractedText = req.body.extractedText || '';

    // Calculate ATS score based on keywords
    const commonKeywords = ['experience', 'skills', 'projects', 'education', 'achievements'];
    let atsScore = 0;
    commonKeywords.forEach(keyword => {
      if (extractedText.toLowerCase().includes(keyword)) {
        atsScore += 20;
      }
    });

    // Extract sections (simulated)
    const sections = {
      summary: extractedText.substring(0, 200) || 'No summary found',
      experience: ['Experience section should be listed'],
      skills: ['Technical skills should be mentioned'],
      education: ['Educational background'],
      projects: ['Portfolio projects']
    };

    const resume = new Resume({
      userId: req.user.userId,
      fileName,
      fileURL,
      extractedText,
      atsScore: Math.min(atsScore, 100),
      sections,
      strengths: ['Clear structure', 'Professional format'],
      improvements: ['Add more quantifiable achievements', 'Use action verbs'],
      suggestions: [
        'Include metrics and impact numbers',
        'Use industry-specific keywords',
        'Keep to 1-2 pages'
      ],
      overallFeedback: 'Good resume structure. Consider adding more specific achievements with numbers.'
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
      message: error.message
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
export const getResumeById = async (req, res) => {
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

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Delete file
    if (resume.fileURL) {
      const filePath = path.join(process.cwd(), `public${resume.fileURL}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
