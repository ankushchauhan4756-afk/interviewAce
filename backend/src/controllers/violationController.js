import Violation from '../models/Violation.js';
import Interview from '../models/Interview.js';

/**
 * Log a violation
 */
export const logViolation = async (req, res) => {
  try {
    const { interviewId, violationType, description, severity = 'low' } = req.body;
    const userId = req.user.userId;

    // Validate violation type
    const validTypes = [
      'tab_switch',
      'window_blur',
      'camera_off',
      'fullscreen_exit',
      'copy_paste_attempt',
      'right_click',
      'dev_tools_open',
      'multiple_violations'
    ];

    if (!validTypes.includes(violationType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid violation type'
      });
    }

    // Check if same violation exists in last 30 seconds
    const existingViolation = await Violation.findOne({
      interviewId,
      userId,
      violationType,
      timestamp: { $gt: new Date(Date.now() - 30000) }
    });

    let violation;
    if (existingViolation) {
      // Increment count
      existingViolation.count += 1;
      
      // If critical or too many violations, auto-end interview
      if (existingViolation.count >= 3 || severity === 'critical') {
        existingViolation.actionTaken = 'interview_ended';
        existingViolation.autoEnded = true;
        
        // End the interview
        await Interview.findByIdAndUpdate(interviewId, {
          status: 'ended',
          endedAt: new Date(),
          cheatingDetected: true
        });
      } else {
        existingViolation.actionTaken = 'warning';
      }
      
      await existingViolation.save();
      violation = existingViolation;
    } else {
      // Create new violation
      violation = new Violation({
        interviewId,
        userId,
        violationType,
        description,
        severity,
        actionTaken: severity === 'critical' ? 'interview_ended' : 'recorded'
      });

      // If critical, end interview immediately
      if (severity === 'critical') {
        await Interview.findByIdAndUpdate(interviewId, {
          status: 'ended',
          endedAt: new Date(),
          cheatingDetected: true
        });
        violation.autoEnded = true;
      }

      await violation.save();
    }

    res.status(201).json({
      success: true,
      message: 'Violation recorded',
      violation,
      autoEnded: violation.autoEnded
    });
  } catch (error) {
    console.error('Error logging violation:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get violations for an interview
 */
export const getInterviewViolations = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const violations = await Violation.find({ interviewId })
      .sort({ timestamp: -1 });

    const summary = {
      totalViolations: violations.length,
      byType: {},
      bySeverity: {}
    };

    violations.forEach(v => {
      summary.byType[v.violationType] = (summary.byType[v.violationType] || 0) + v.count;
      summary.bySeverity[v.severity] = (summary.bySeverity[v.severity] || 0) + 1;
    });

    res.json({
      success: true,
      violations,
      summary
    });
  } catch (error) {
    console.error('Error fetching violations:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get user's violation history
 */
export const getUserViolationHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const violations = await Violation.find({ userId })
      .populate('interviewId', 'domain difficulty')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      violations
    });
  } catch (error) {
    console.error('Error fetching violation history:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
