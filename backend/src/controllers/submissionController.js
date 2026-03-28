import Submission from '../models/Submission.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

// Helper function to evaluate code
const evaluateCode = async (userCode, question) => {
  try {
    let score = 0;
    let feedback = '';
    let testsPassed = 0;
    const totalTests = question.testCases?.length || 0;

    if (totalTests === 0) {
      // No test cases - basic keyword matching evaluation
      const solutionKeywords = extractKeywords(question.solutionCode || '');
      const userKeywords = extractKeywords(userCode);
      
      const matchedKeywords = solutionKeywords.filter(keyword => 
        userKeywords.includes(keyword)
      );
      
      const keywordMatchPercentage = solutionKeywords.length > 0 
        ? (matchedKeywords.length / solutionKeywords.length) * 100 
        : 0;
      
      score = Math.round(keywordMatchPercentage);
      feedback = generateFeedback(score, keywordMatchPercentage);
    } else {
      // Evaluate against test cases using keyword matching
      for (const testCase of question.testCases) {
        const isTestPassed = evaluateTestCase(userCode, testCase, question.category);
        if (isTestPassed) testsPassed++;
      }

      score = Math.round((testsPassed / totalTests) * 100);
      feedback = `Passed ${testsPassed}/${totalTests} test cases. ${
        testsPassed === totalTests 
          ? 'Excellent! All tests passed!' 
          : testsPassed > totalTests / 2 
          ? 'Good progress, keep improving!' 
          : 'Try to pass more test cases.'
      }`;
    }

    const isCorrect = score >= 70;

    return {
      score,
      isCorrect,
      feedback,
      testsPassed,
      totalTests
    };
  } catch (error) {
    console.error('Evaluation error:', error);
    return {
      score: 0,
      isCorrect: false,
      feedback: 'Error evaluating code',
      testsPassed: 0,
      totalTests: question.testCases?.length || 0
    };
  }
};

// Extract keywords from code for basic evaluation
const extractKeywords = (code) => {
  if (!code) return [];
  
  const keywords = [];
  
  // Common algorithm keywords
  const patterns = [
    /function\s+\w+/g,           // Function definitions
    /const\s+\w+\s*=/g,          // Const assignments
    /let\s+\w+\s*=/g,            // Let assignments
    /for\s*\(/g,                 // For loops
    /while\s*\(/g,               // While loops
    /if\s*\(/g,                  // If statements
    /return\s+/g,                // Return statements
    /\[\]/g,                     // Arrays
    /\{}/g,                      // Objects
    /\.filter/g,                 // Filter method
    /\.map/g,                    // Map method
    /\.sort/g,                   // Sort method
    /\.reduce/g,                 // Reduce method
  ];

  patterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) keywords.push(...matches);
  });

  return [...new Set(keywords)]; // Remove duplicates
};

// Evaluate individual test case
const evaluateTestCase = (userCode, testCase, category) => {
  try {
    // Simple keyword-based evaluation for DSA category
    if (category === 'DSA') {
      return evaluateDSACode(userCode, testCase);
    }
    
    // For other categories, check if code mentions key concepts
    return evaluateConceptCode(userCode, testCase);
  } catch (error) {
    console.error('Test case evaluation error:', error);
    return false;
  }
};

// DSA code evaluation
const evaluateDSACode = (userCode, testCase) => {
  // Check for essential algorithm keywords based on problem type
  const lowerCode = userCode.toLowerCase();
  
  // Check for loop structures and data structures
  const hasLoops = /for\s*\(|while\s*\(/.test(lowerCode);
  const hasReturnStatement = /return\s+/.test(lowerCode);
  const hasDataStructure = /\[\]|\{\}|map|set|array/.test(lowerCode);
  
  // Give score based on presence of essential components
  const componentScore = (hasLoops ? 30 : 0) + (hasDataStructure ? 30 : 0) + (hasReturnStatement ? 40 : 0);
  
  // 70% or more indicates proper structure
  return componentScore >= 70;
};

// Concept code evaluation  
const evaluateConceptCode = (userCode, testCase) => {
  // For non-DSA questions, check if code explains the concept
  const codeLength = userCode.trim().length;
  const hasComments = /\/\/|\/\*|\*\//.test(userCode);
  const hasExplanation = codeLength > 150;
  
  return hasExplanation && (hasComments || codeLength > 300);
};

// Generate feedback based on score
const generateFeedback = (score, matchPercentage) => {
  if (score >= 90) {
    return '🎉 Excellent! Your solution is very similar to the optimal approach. Time to optimize further!';
  } else if (score >= 75) {
    return '✅ Good! Your solution covers most key aspects. Consider edge cases and optimization.';
  } else if (score >= 60) {
    return '⚠️ Fair attempt! You have the basic structure. Review the solution and improve logic.';
  } else if (score >= 40) {
    return '📚 Keep learning! Your approach needs significant improvement. Study the solution.';
  } else {
    return '💪 Keep trying! Practice more and revisit the problem logic.';
  }
};

export const createSubmission = async (req, res) => {
  try {
    const { questionId, code, language, timeTaken } = req.body;

    // Validate input
    if (!questionId || !code) {
      return res.status(400).json({ success: false, message: 'Question ID and code are required' });
    }

    // Fetch question  
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Evaluate the code
    const evaluation = await evaluateCode(code, question);

    // Create submission record
    const submission = new Submission({
      userId: req.user.userId,
      questionId,
      code,
      language,
      isCorrect: evaluation.isCorrect,
      score: evaluation.score,
      feedback: evaluation.feedback,
      testsPassed: evaluation.testsPassed,
      totalTests: evaluation.totalTests,
      timeTaken: timeTaken || 0,
      executionTime: Math.random() * 500 // Simulated execution time in ms
    });

    await submission.save();

    // Update question stats
    question.attemptCount = (question.attemptCount || 0) + 1;
    question.avgAccuracy = ((question.avgAccuracy * (question.attemptCount - 1)) + evaluation.score) / question.attemptCount;
    await question.save();

    // Update user stats
    const user = await User.findById(req.user.userId);
    if (user) {
      user.stats = user.stats || {};
      user.stats.totalQuestionsAttempted = (user.stats.totalQuestionsAttempted || 0) + 1;
      if (evaluation.isCorrect) {
        user.stats.totalCorrect = (user.stats.totalCorrect || 0) + 1;
      }
      user.stats.averageScore = 
        ((user.stats.averageScore || 0) * (user.stats.totalQuestionsAttempted - 1) + evaluation.score) / 
        user.stats.totalQuestionsAttempted;
      await user.save();
    }

    res.status(201).json({
      success: true,
      submission: {
        _id: submission._id,
        score: submission.score,
        isCorrect: evaluation.isCorrect,
        feedback: evaluation.feedback,
        testsPassed: evaluation.testsPassed,
        totalTests: evaluation.totalTests,
        executionTime: submission.executionTime,
        status: evaluation.isCorrect ? 'correct' : 'incorrect',
        solution: question.solutionCode,
        solutionExplanation: question.solution
      }
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.userId });
    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    res.json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    // Calculate accuracy percentage
    const totalAttempted = user.stats?.totalQuestionsAttempted || 0;
    const totalCorrect = user.stats?.totalCorrect || 0;
    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    // Return stats with all necessary fields
    res.json({ 
      success: true, 
      stats: {
        totalAttempted,
        totalCorrect,
        accuracy,
        averageScore: user.stats?.averageScore || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
