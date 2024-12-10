'use client';

import { useState, useEffect } from 'react';

interface TerminalProps {
  onMessagesComplete?: () => void;
}

const Terminal = ({ onMessagesComplete }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'updating the system...',
    'preparing the developer environment to make the internet faster, cheaper, and more sovereign',
    'compiling the tools'
  ];

  useEffect(() => {
    if (showMessages && messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showMessages && messageIndex === messages.length) {
      // All messages have been displayed
      onMessagesComplete?.();
    }
  }, [showMessages, messageIndex, messages.length, onMessagesComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === 'update the system') {
      setShowMessages(true);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn terminal-btn-close"></span>
          <span className="terminal-btn terminal-btn-minimize"></span>
          <span className="terminal-btn terminal-btn-maximize"></span>
        </div>
        <div className="terminal-title">Base.dev</div>
      </div>
      <div className="terminal-body">
        {!showMessages && (
          <form onSubmit={handleSubmit}>
            <div className="terminal-input-line">
              <span className="terminal-prefix">$ </span>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="terminal-input"
                placeholder="type 'update the system' to continue"
                autoFocus
              />
            </div>
          </form>
        )}
        <div className="terminal-output">
          {showMessages && (
            <>
              <div className="terminal-input-line">
                <span className="terminal-prefix">$ </span>
                <span className="terminal-input">update the system</span>
              </div>
              {messages.slice(0, messageIndex).map((message, index) => (
                <div key={index} className="terminal-line">
                  {message}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal; 