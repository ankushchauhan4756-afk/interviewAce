import Editor from '@monaco-editor/react';
import { Copy, Download } from 'lucide-react';
import { useState } from 'react';
import './CodeEditor.css';

function CodeEditor({ 
  code, 
  onChange, 
  language = 'javascript',
  onLanguageChange,
  readOnly = false 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `solution.${language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="code-editor">
      <div className="editor-toolbar">
        <select 
          value={language} 
          onChange={(e) => onLanguageChange?.(e.target.value)}
          className="language-select"
          disabled={readOnly}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
        </select>

        <div className="toolbar-actions">
          <button 
            onClick={handleCopy}
            className="toolbar-btn"
            title="Copy code"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            onClick={handleDownload}
            className="toolbar-btn"
            title="Download code"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="monaco-editor-wrapper">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={onChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            readOnly: readOnly,
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
