import { SendHorizontal, Bot } from 'lucide-react';
import { useState } from 'react';
import './ChatBox.css';

function ChatBox({ isOpen = true }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI interviewer. Let\'s start with this question: How would you explain the concept of recursion?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'That\'s a great explanation! You demonstrated good understanding of the core concept. Let me ask a follow-up: Can you think of a practical use case for recursion?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-title">
          <Bot size={20} />
          <span>AI Interviewer</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.sender === 'bot' && <Bot size={16} className="avatar" />}
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">
            <Bot size={16} className="avatar" />
            <div className="message-content">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your answer..."
          className="chat-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="send-btn"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
