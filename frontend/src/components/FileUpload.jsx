import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import './FileUpload.css';

function FileUpload({ onFileSelect, accept = '.pdf,.doc,.docx', label = 'Upload File' }) {
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsLoading(true);
      
      // Simulate file processing
      setTimeout(() => {
        onFileSelect?.(file);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setFileName(null);
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="upload-label">
        <div className="upload-box">
          {fileName ? (
            <>
              <Upload size={32} className={isLoading ? 'loading' : ''} />
              <p className="file-name">{fileName}</p>
              {!isLoading && (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="clear-btn"
                  title="Clear file"
                >
                  <X size={18} />
                </button>
              )}
              {isLoading && <p className="loading-text">Processing...</p>}
            </>
          ) : (
            <>
              <Upload size={32} />
              <p className="upload-text">{label}</p>
              <p className="upload-hint">Drag and drop or click to browse</p>
            </>
          )}
        </div>
      </label>

      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="file-input"
        disabled={isLoading}
      />
    </div>
  );
}

export default FileUpload;
