import Interview from '../models/Interview.js';
import Result from '../models/Result.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

/**
 * Start an interview session
 */
export const startInterview = async (req, res) => {
  try {
    const { domain, difficulty, totalQuestions = 5 } = req.body;

    // Validate input
    if (!domain || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Domain and difficulty are required'
      });
    }

    // Create interview record
    const interview = new Interview({
      userId: req.user.userId,
      domain,
      difficulty,
      totalQuestions,
      status: 'in-progress',
      startedAt: new Date()
    });

    await interview.save();

    res.status(201).json({
      success: true,
      message: 'Interview started',
      interview: {
        _id: interview._id,
        domain: interview.domain,
        difficulty: interview.difficulty,
        totalQuestions: interview.totalQuestions
      }
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get next question for interview
 */
export const getNextQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Get list of question IDs already asked
    const askedQuestionIds = interview.questionsAsked.map(q => q.questionId);

    // Get random question matching criteria that hasn't been asked yet
    let question = await Question.findOne({
      category: interview.domain,
      difficulty: interview.difficulty,
      _id: { $nin: askedQuestionIds }
    }).select('-solution -solutionCode').lean();

    if (!question) {
      const fallback = await Question.findOne({
        difficulty: interview.difficulty,
        _id: { $nin: askedQuestionIds }
      }).select('-solution -solutionCode').lean();

      if (fallback) {
        question = fallback;
      } else {
        const random = await Question.findOne({
          _id: { $nin: askedQuestionIds }
        }).select('-solution -solutionCode').lean();

        if (random) {
          question = random;
        } else {
          return res.status(404).json({
            success: false,
            message: 'No more questions available'
          });
        }
      }
    }

    res.json({
      success: true,
      question: {
        _id: question._id,
        title: question.title,
        description: question.description,
        examples: question.examples || [],
        constraints: question.constraints || ''
      },
      questionNumber: interview.questionsAsked.length + 1,
      totalQuestions: interview.totalQuestions
    });
  } catch (error) {
    console.error('Error fetching next question:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Submit answer and get evaluation
 */
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionId, answer, timeSpent, answerMode = 'text', confidence = 0 } = req.body;

    if (!interviewId || !questionId || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Interview ID, Question ID, and answer are required'
      });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Evaluate answer
    const evaluation = evaluateAnswer(answer, question);

    // Boost score if voice mode with high confidence
    let finalScore = evaluation.score;
    if (answerMode === 'voice' && confidence > 0.8) {
      finalScore = Math.min(100, finalScore + 5);
    }

    // Add to interview
    interview.questionsAsked.push({
      questionId,
      question: question.title,
      userAnswer: answer,
      score: finalScore,
      feedback: evaluation.feedback,
      timeSpent: timeSpent || 0,
      answerMode,
      confidence: Math.round(confidence * 100)
    });

    await interview.save();

    res.json({
      success: true,
      evaluation: {
        score: finalScore,
        feedback: evaluation.feedback,
        mistakes: evaluation.mistakes,
        suggestions: evaluation.suggestions,
        isCorrect: finalScore >= 70,
        confidence: Math.round(confidence * 100),
        answerMode
      }
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * End interview and generate results
 */
export const endInterview = async (req, res) => {
  try {
    const { interviewId, recordingDuration } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Calculate overall score
    let totalScore = 0;
    let allMistakes = [];
    let allSuggestions = [];
    let allStrengths = [];
    let allWeaknesses = [];

    interview.questionsAsked.forEach(q => {
      totalScore += q.score || 0;
      if (q.mistakes) allMistakes.push(...q.mistakes);
      if (q.improvements) allSuggestions.push(...q.improvements);
    });

    const overallScore = Math.round(
      totalScore / (interview.questionsAsked.length || 1)
    );

    // Update interview
    interview.status = 'completed';
    interview.completedAt = new Date();
    interview.overallScore = overallScore;
    interview.totalDuration = recordingDuration || 0;
    interview.strengths = [...new Set(allStrengths)];
    interview.weaknesses = [...new Set(allWeaknesses)];
    interview.mistakes = [...new Set(allMistakes)];
    interview.suggestions = [...new Set(allSuggestions)];

    await interview.save();

    // Create result record
    const result = new Result({
      interviewId: interview._id,
      userId: interview.userId,
      domain: interview.domain,
      difficulty: interview.difficulty,
      overallScore,
      questionScores: interview.questionsAsked.map(q => ({
        questionId: q.questionId,
        question: q.question,
        score: q.score,
        feedback: q.feedback,
        mistakes: q.mistakes || [],
        improvements: q.improvements || []
      })),
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      mistakesSummary: interview.mistakes,
      suggestionsSummary: interview.suggestions,
      totalDuration: interview.totalDuration,
      completionPercentage: Math.round(
        (interview.questionsAsked.length / interview.totalQuestions) * 100
      )
    });

    await result.save();

    // Update user stats
    const user = await User.findById(interview.userId);
    if (user) {
      user.stats = user.stats || {};
      user.stats.totalInterviewsAttempted = (user.stats.totalInterviewsAttempted || 0) + 1;
      if (overallScore >= 70) {
        user.stats.completedInterviews = (user.stats.completedInterviews || 0) + 1;
      }
      user.stats.averageInterviewScore = 
        ((user.stats.averageInterviewScore || 0) * (user.stats.totalInterviewsAttempted - 1) + overallScore) / 
        user.stats.totalInterviewsAttempted;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Interview completed',
      result: {
        resultId: result._id,
        overallScore: result.overallScore,
        completionPercentage: result.completionPercentage,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        suggestions: result.suggestionsSummary
      }
    });
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get interview result
 */
export const getResult = async (req, res) => {
  try {
    const { resultId } = req.params;

    const result = await Result.findById(resultId)
      .populate('interviewId')
      .populate('userId', 'name email');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get interview history
 */
export const getInterviewHistory = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Error fetching interview history:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Basic answer evaluation (can be replaced with AI)
 */
function evaluateAnswer(userAnswer, question) {
  try {
    // Extract keywords from solution
    const solutionText = question.solutionCode || question.solution || '';
    const keywords = extractKeywords(solutionText);

    // Check how many keywords are in user's answer
    const userAnswerLower = userAnswer.toLowerCase();
    const matchedKeywords = keywords.filter(keyword =>
      userAnswerLower.includes(keyword.toLowerCase())
    );

    // Calculate score based on keyword matching
    const keywordMatchPercentage = keywords.length > 0
      ? (matchedKeywords.length / keywords.length) * 100
      : 0;

    // Additional factors
    const answerLength = userAnswer.trim().length;
    const hasExplanation = answerLength > 50;
    const hasStructure = /\n/g.test(userAnswer); // Multiple lines

    let score = Math.round(keywordMatchPercentage);
    if (hasExplanation) score = Math.min(100, score + 10);
    if (hasStructure) score = Math.min(100, score + 5);

    // Generate feedback
    const feedback = generateFeedback(score, matchedKeywords.length, keywords.length);
    const mistakes = identifyMistakes(userAnswer, question);
    const improvements = suggestImprovements(score, question);

    return {
      score: Math.max(0, Math.min(100, score)),
      feedback,
      mistakes,
      improvements
    };
  } catch (error) {
    console.error('Evaluation error:', error);
    return {
      score: 0,
      feedback: 'Unable to evaluate answer',
      mistakes: ['Evaluation error occurred'],
      improvements: []
    };
  }
}

/**
 * Extract keywords from solution
 */
function extractKeywords(text) {
  if (!text) return [];

  const keywords = [];
  const patterns = [
    /const\s+\w+/g,
    /let\s+\w+/g,
    /function\s+\w+/g,
    /class\s+\w+/g,
    /return\s+/g,
    /if\s*\(/g,
    /for\s*\(/g,
    /while\s*\(/g,
    /\.map/g,
    /\.filter/g,
    /\.reduce/g,
    /async/g,
    /await/g
  ];

  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) keywords.push(...matches);
  });

  return [...new Set(keywords)];
}

/**
 * Generate feedback
 */
function generateFeedback(score, matched, total) {
  if (score >= 90) {
    return '🎉 Excellent! Your answer covers all key points. Very well explained!';
  } else if (score >= 75) {
    return '✅ Good! You covered most important points. Some details could be added.';
  } else if (score >= 60) {
    return '⚠️ Fair attempt. You have the basic understanding but missed some key concepts.';
  } else if (score >= 40) {
    return '📚 Keep learning! Your answer needs more detail and accuracy.';
  } else {
    return '💪 Try again! Review the concept and practice more.';
  }
}

/**
 * Identify mistakes in answer
 */
function identifyMistakes(answer, question) {
  const mistakes = [];

  if (answer.length < 50) {
    mistakes.push('Answer is too brief - provide more detail');
  }

  if (!answer.includes('example') && !answer.includes('Example')) {
    mistakes.push('No examples provided');
  }

  return mistakes;
}

/**
 * Suggest improvements
 */
function suggestImprovements(score, question) {
  const suggestions = [];

  if (score < 70) {
    suggestions.push('Review the concept again');
  }

  if (question.timeComplexity) {
    suggestions.push('Explain time and space complexity');
  }

  suggestions.push('Practice similar problems');
  suggestions.push('Break down the problem into smaller parts');

  return suggestions;
}
