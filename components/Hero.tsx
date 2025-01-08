'use client';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface HeroProps {
  isCommandMenuOpen: boolean;
  setIsCommandMenuOpen: (open: boolean) => void;
  contentTransition: {
    duration: number;
    delay?: number;
  };
  initialAnimation: {
    opacity: number;
  };
}

export default function Hero({ setIsCommandMenuOpen, contentTransition, initialAnimation }: HeroProps) {
  return (
    <div className="relative z-20">
      <motion.div 
        initial={initialAnimation}
        animate={{ opacity: 1 }}
        transition={contentTransition}
        className="w-full h-[calc(100vh-2.5rem)]"
      >
        <div className="flex-1 flex flex-col justify-between pt-36 pb-12">
          {/* Hero Content */}
          <div className="flex flex-col items-center gap-4 max-w-xl px-4 text-center mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white/90 tracking-tighter"
            >
              Welcome to Base.dev
            </motion.h1>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/30"
            >
              Your developer platform for launching, scaling, and monetizing your app onchain.
            </motion.h3>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-lg mt-8"
            >
              <button
                onClick={() => setIsCommandMenuOpen(true)}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                Search products, templates, and more...
                <div className="ml-auto flex items-center gap-1 text-xs text-white/40">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">B</kbd>
                </div>
              </button>
            </motion.div>

            {/* Quick Access Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-1 mt-2 text-sm"
            >
              <button
                className="flex items-center space-x-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText('npm create onchain')
                  toast('Copied to clipboard')
                }}
              >
                <span className="text-white/50 hover:text-white">npm create onchain</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                </svg>
              </button>
              <button 
                className="flex items-center space-x-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm transition-colors"
                onClick={() => window.open('https://github.com/coinbase/onchain-agent-demo', '_blank')}
              >
                <span className="text-white/50 hover:text-white">Launch your agent</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>

               {/* L3 */}
               {/* TODO: Replace this with CDP L3 link */}
               <button 
                className="flex items-center space-x-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm transition-colors"
                onClick={() => window.open('https://github.com/coinbase/onchain-agent-demo', '_blank')}
              >
                <span className="text-white/50 hover:text-white">Launch your L3</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}