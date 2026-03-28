import { useRef, useState, useEffect } from 'react';
import { Camera, Mic, MicOff, Video, StopCircle } from 'lucide-react';
import './CameraRecorder.css';

function CameraRecorder({ onRecordingStart, onRecordingStop, isRecording }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [error, setError] = useState('');
  const [recordedBlob, setRecordedBlob] = useState(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Setup MediaRecorder
      const options = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 2500000
      };

      // Fallback if vp9 not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        chunksRef.current = [];
        onRecordingStop?.(blob);
      };

      setCameraActive(true);
      setMicActive(true);
      setError('');
    } catch (err) {
      console.error('Camera initialization error:', err);
      setError(`Camera Error: ${err.message}`);
      setCameraActive(false);
      setMicActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setMicActive(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      initializeCamera();
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicActive(!micActive);
    }
  };
  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      chunksRef.current = [];
      mediaRecorderRef.current.start();
      onRecordingStart?.();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="camera-recorder">
      <div className="camera-title">Live Interview</div>
      <div className="video-container">
        {error ? (
          <div className="error-message">
            <Camera size={48} />
            <p>{error}</p>
            <button onClick={initializeCamera} className="retry-btn">
              Retry Camera Access
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-preview"
            />
            <div className="camera-overlay">
              {isRecording && (
                <div className="recording-indicator">
                  <div className="recording-dot"></div>
                  RECORDING
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="camera-controls">
        <button
          onClick={toggleMic}
          className={`control-btn ${!micActive ? 'disabled' : ''}`}
          title={micActive ? 'Mute' : 'Unmute'}
        >
          {micActive ? <Mic size={20} /> : <MicOff size={20} />}
          <span>{micActive ? 'Mic On' : 'Mic Off'}</span>
        </button>

        <button
          onClick={toggleCamera}
          className={`control-btn ${!cameraActive ? 'inactive-camera' : ''}`}
          title={cameraActive ? 'Turn camera off' : 'Turn camera on'}
        >
          <Camera size={20} />
          <span>{cameraActive ? 'Camera On' : 'Camera Off'}</span>
        </button>

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="control-btn record-btn"
            disabled={!cameraActive || error}
          >
            <Video size={20} />
            <span>Start Recording</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="control-btn stop-btn"
          >
            <StopCircle size={20} />
            <span>Stop Recording</span>
          </button>
        )}
      </div>

      {recordedBlob && (
        <div className="recording-info">
          <p>Video recorded ({(recordedBlob.size / 1024 / 1024).toFixed(2)} MB)</p>
        </div>
      )}
    </div>
  );
}

export default CameraRecorder;
