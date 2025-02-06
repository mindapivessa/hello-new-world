'use client';

import { useState, useEffect } from 'react';

interface TerminalProps {
  onMessagesComplete?: () => void;
}

const Terminal = ({ onMessagesComplete }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [messageIndex, setMessageIndex] = useState(1);
  const [isLastMessageComplete, setIsLastMessageComplete] = useState(false);

  const messages = [
    'Preparing for the new era...',
    'Updating the system...',
    'Loading...'
  ];

  useEffect(() => {
    if (showMessages && messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (showMessages && messageIndex === messages.length) {
      const completeTimer = setTimeout(() => {
        setIsLastMessageComplete(true);
      }, 1000);
      
      return () => clearTimeout(completeTimer);
    }
  }, [showMessages, messageIndex, messages.length]);

  useEffect(() => {
    if (isLastMessageComplete) {
      const transitionTimer = setTimeout(() => {
        onMessagesComplete?.();
      }, 500);
      
      return () => clearTimeout(transitionTimer);
    }
  }, [isLastMessageComplete, onMessagesComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setInput('update the system');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === 'update the system') {
      setShowMessages(true);
      setMessageIndex(1);
    }
  };

  return (
    <div className="bg-neutral-900 w-[600px] h-[400px] rounded-lg shadow-lg shadow-black/30 mx-auto">
      <div className="h-[30px] bg-neutral-800 rounded-t-lg px-2 flex items-center relative">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        </div>
        
      </div>
      <div className="p-5 text-neutral-100 font-mono text-sm leading-relaxed">
        {!showMessages && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-2.5">
              <span className="text-[#0052FF] mr-2">$ </span>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none text-neutral-100 font-inherit text-inherit flex-grow outline-none placeholder:text-neutral-500/70"
                placeholder="type 'update the system' or press tab to continue"
                autoFocus
              />
            </div>
          </form>
        )}
        <div>
          {showMessages && (
            <>
              <div className="flex items-center mb-2.5">
                <span className="text-[#0052FF] mr-2">$ </span>
                <span>update the system</span>
              </div>
              {messages.slice(0, messageIndex).map((message, index) => (
                <div 
                  key={index} 
                  className="mb-1.5 opacity-0 animate-fadeIn"
                >
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