/**
 * Voice Utilities
 * Handles Text-to-Speech and Speech-to-Text
 */

/**
 * Text-to-Speech utility
 * Uses Web Speech API (SpeechSynthesis)
 */
export class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  /**
   * Speak text
   */
  speak(text, options = {}) {
    if (!this.synth) {
      console.error('Speech Synthesis not supported');
      return;
    }

    // Cancel previous speech if still speaking
    if (this.isSpeaking) {
      this.stop();
    }

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.rate = options.rate || 1;
    this.currentUtterance.pitch = options.pitch || 1;
    this.currentUtterance.volume = options.volume || 1;
    this.currentUtterance.lang = options.lang || 'en-US';

    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      if (options.onStart) options.onStart();
    };

    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    this.currentUtterance.onerror = (error) => {
      this.isSpeaking = false;
      console.error('Speech synthesis error:', error);
      if (options.onError) options.onError(error);
    };

    this.synth.speak(this.currentUtterance);
  }

  /**
   * Stop speaking
   */
  stop() {
    if (this.synth && this.isSpeaking) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  /**
   * Check if speaking
   */
  getSpeaking() {
    return this.isSpeaking;
  }

  /**
   * Get available voices
   */
  getVoices() {
    return this.synth?.getVoices() || [];
  }

  /**
   * Set specific voice
   */
  setVoice(voiceIndex) {
    const voices = this.getVoices();
    if (voices[voiceIndex]) {
      this.voiceIndex = voiceIndex;
    }
  }
}

/**
 * Speech-to-Text utility
 * Uses Web Speech API (SpeechRecognition)
 */
export class SpeechToText {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isListening = false;
    this.transcript = '';
    this.confidence = 0;

    if (this.recognition) {
      this.setupRecognition();
    }
  }

  /**
   * Setup recognition event listeners
   */
  setupRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      console.log('🎤 Listening started...');
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        this.confidence = event.results[i][0].confidence;

        if (event.results[i].isFinal) {
          this.transcript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Callback for real-time updates
      if (this.onResult) {
        this.onResult({
          transcript: this.transcript + interimTranscript,
          isFinal: this.transcript.length > 0,
          confidence: this.confidence,
          interim: interimTranscript
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (this.onError) {
        this.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('🎤 Listening ended');
      if (this.onEnd) {
        this.onEnd(this.transcript);
      }
    };
  }

  /**
   * Start listening
   */
  start(options = {}) {
    if (!this.recognition) {
      console.error('Speech Recognition not supported');
      return;
    }

    this.transcript = '';
    this.confidence = 0;
    this.onResult = options.onResult;
    this.onError = options.onError;
    this.onEnd = options.onEnd;

    this.recognition.start();
  }

  /**
   * Stop listening
   */
  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  /**
   * Abort listening
   */
  abort() {
    if (this.recognition) {
      this.recognition.abort();
      this.isListening = false;
    }
  }

  /**
   * Get current transcript
   */
  getTranscript() {
    return this.transcript;
  }

  /**
   * Reset transcript
   */
  reset() {
    this.transcript = '';
    this.confidence = 0;
  }

  /**
   * Check if listening
   */
  getListening() {
    return this.isListening;
  }

  /**
   * Set language
   */
  setLanguage(lang) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  /**
   * Check if supported
   */
  isSupported() {
    return !!this.recognition;
  }
}

/**
 * Voice utilities helper
 */
export const VoiceUtils = {
  tts: new TextToSpeech(),
  stt: new SpeechToText(),

  isSupported() {
    return this.tts && this.stt.isSupported();
  },

  getSupportStatus() {
    return {
      ttsSupported: !!this.tts.synth,
      sttSupported: this.stt.isSupported(),
      browser: this.getBrowserInfo()
    };
  },

  getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
};
