/**
 * Anti-Cheating/Proctoring Utilities
 * Handles detection and reporting of suspicious activities
 */

import { violationsAPI } from './apiService.js';

export class ProctorMonitor {
  constructor(interviewId, onViolation) {
    this.interviewId = interviewId;
    this.onViolation = onViolation;
    this.isMonitoring = false;
    this.violations = {
      tab_switch: 0,
      window_blur: 0,
      camera_off: 0,
      fullscreen_exit: 0,
      copy_paste_attempt: 0,
      right_click: 0,
      dev_tools_open: 0
    };
    this.tabSwitchThreshold = 3;
    this.blurThreshold = 5;
    this.devToolsCheckInterval = null;
  }

  /**
   * Start monitoring for violations
   */
  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    // Tab/window visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

    // Window focus/blur
    window.addEventListener('blur', this.handleWindowBlur.bind(this));
    window.addEventListener('focus', this.handleWindowFocus.bind(this));

    // Full screen exit detection
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));

    // Copy/paste blocking
    document.addEventListener('copy', this.handleCopyAttempt.bind(this));
    document.addEventListener('cut', this.handleCopyAttempt.bind(this));
    document.addEventListener('paste', this.handlePasteAttempt.bind(this));

    // Right click blocking
    document.addEventListener('contextmenu', this.handleRightClick.bind(this));

    // Dev tools detection (run periodically)
    this.detectDevTools();

    // Camera monitoring (checking if MediaStream is active)
    this.monitorCamera();

    console.log('🚨 Proctoring monitor started');
  }

  /**
   * Stop monitoring
   */
  stop() {
    this.isMonitoring = false;
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('copy', this.handleCopyAttempt);
    document.removeEventListener('cut', this.handleCopyAttempt);
    document.removeEventListener('paste', this.handlePasteAttempt);
    document.removeEventListener('contextmenu', this.handleRightClick);

    if (this.devToolsCheckInterval) {
      clearInterval(this.devToolsCheckInterval);
    }

    console.log('🛑 Proctoring monitor stopped');
  }

  /**
   * Handle tab/window visibility changes
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.violations.tab_switch++;
      this.reportViolation('tab_switch', 'Tab switched or window minimized', 'high');

      if (this.violations.tab_switch >= this.tabSwitchThreshold) {
        this.reportViolation('multiple_violations', `Too many tab switches (${this.violations.tab_switch})`, 'critical');
      }
    }
  }

  /**
   * Handle window blur
   */
  handleWindowBlur() {
    this.violations.window_blur++;
    this.reportViolation('window_blur', 'Window lost focus', 'medium');

    if (this.violations.window_blur >= this.blurThreshold) {
      this.reportViolation('multiple_violations', `Too many focus losses (${this.violations.window_blur})`, 'critical');
    }
  }

  /**
   * Handle window focus
   */
  handleWindowFocus() {
    // Optionally reset blur count or continue tracking
    console.log('Window in focus again');
  }

  /**
   * Handle fullscreen exit
   */
  handleFullscreenChange() {
    if (!document.fullscreenElement) {
      this.violations.fullscreen_exit++;
      this.reportViolation('fullscreen_exit', 'Exited fullscreen mode', 'high');
    }
  }

  /**
   * Handle copy attempt
   */
  handleCopyAttempt(e) {
    e.preventDefault();
    this.violations.copy_paste_attempt++;
    this.reportViolation('copy_paste_attempt', 'Copy attempt detected', 'medium');
    return false;
  }

  /**
   * Handle paste attempt
   */
  handlePasteAttempt(e) {
    // Allow paste in text inputs only
    const target = e.target;
    if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
      this.violations.copy_paste_attempt++;
      this.reportViolation('copy_paste_attempt', 'Paste attempt detected', 'medium');
      return false;
    }
  }

  /**
   * Handle right click
   */
  handleRightClick(e) {
    e.preventDefault();
    this.violations.right_click++;
    this.reportViolation('right_click', 'Right click attempted', 'low');
    return false;
  }

  /**
   * Detect if dev tools are open
   */
  detectDevTools() {
    const threshold = 160; // approx devtools height

    this.devToolsCheckInterval = setInterval(() => {
      if (!this.isMonitoring) return;

      // Check if dev tools might be open
      const devToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (devToolsOpen) {
        this.violations.dev_tools_open++;
        this.reportViolation('dev_tools_open', 'Developer tools detected', 'high');
        clearInterval(this.devToolsCheckInterval);
      }
    }, 2000);
  }

  /**
   * Monitor camera status
   */
  monitorCamera() {
    // This would track the MediaStream from camera component
    // The camera component should report its status
  }

  /**
   * Report camera off
   */
  reportCameraOff() {
    this.violations.camera_off++;
    this.reportViolation('camera_off', 'Camera turned off during interview', 'high');
  }

  /**
   * Main violation reporting function
   */
  async reportViolation(type, description, severity = 'low') {
    try {
      const response = await violationsAPI.logViolation({
        interviewId: this.interviewId,
        violationType: type,
        description,
        severity
      });

      // Callback to component
      if (this.onViolation) {
        this.onViolation({
          type,
          description,
          severity,
          autoEnded: response.data.autoEnded,
          count: this.violations[type]
        });
      }

      return response.data;
    } catch (error) {
      console.error('Error reporting violation:', error);
    }
  }

  /**
   * Enforce fullscreen
   */
  async enforceFullscreen(element = document.documentElement) {
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
    } catch (error) {
      console.error('Could not enforce fullscreen:', error);
    }
  }

  /**
   * Get violation summary
   */
  getSummary() {
    return {
      totalViolations: Object.values(this.violations).reduce((a, b) => a + b, 0),
      violations: this.violations
    };
  }
}

