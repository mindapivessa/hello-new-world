'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CommandMenu from './CommandMenu';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'solutions', label: 'Solution' },
  { id: 'resources', label: 'Resources' },
  { id: 'stories', label: 'Stories' },
];

export default function NavBar() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const handleCommandClick = () => {
    setIsCommandMenuOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsCommandMenuOpen(open);
  };

  // Dispatch custom event when tab changes
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.dispatchEvent(new CustomEvent('viewChange', { detail: tabId }));
  };

  return (
    <>
      <div className="w-full h-10 flex justify-between px-4 border-b border-white/10">
        {/* Logo and Tabs Section */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 pr-8">
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image 
                src="/base.svg" 
                alt="Base Logo" 
                width={24} 
                height={24}
              />
            </motion.div>
            <span className="text-white text-sm font-medium">Base.dev</span>
          </div>

          {/* Tabs */}
          <div className="flex h-full items-end">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  px-4 h-full w-36 text-sm font-medium
                  transition-all duration-200
                  relative flex items-center justify-center
                  text-white
                  hover:bg-white/10
                  ${activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
                  after:absolute after:bottom-0 after:left-0 after:right-0 
                  after:h-[2px] after:transition-all after:duration-200
                  ${activeTab === tab.id 
                    ? 'after:bg-[#0052FF] after:opacity-100' 
                    : 'after:bg-transparent after:opacity-0'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Links and Command Section */}
        <div className="flex items-center gap-2">
          {/* External Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://blog.base.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-sm text-white/50 hover:text-white transition-colors duration-200 rounded-full border border-white/20 hover:border-white/30"
            >
              Docs
            </a>
            <a
              href="https://blog.base.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-sm text-white/50 hover:text-white transition-colors duration-200 rounded-full border border-white/20 hover:border-white/30"
            >
              Blog
            </a>
            <a
              href="https://blog.base.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-sm text-white/50 hover:text-white transition-colors duration-200 rounded-full border border-white/20 hover:border-white/30"
            >
              Get help
            </a>
          </div>

          {/* Command + K Button */}
          <button 
            onClick={handleCommandClick}
            className="px-3 py-1 text-sm text-[#0052FF] hover:text-[#0052FF] transition-colors duration-200 rounded-full border border-[#0052FF] hover:text-blue-500"
          >
            <span className="font-medium pr-2">Start here</span>
            <span className="font-mono pr-1">⌘</span>
            <span className="font-mono">B</span>
          </button>

          {/* Avatar */}
          <div 
            className="w-6 h-6 rounded-full bg-[#0052FF] flex items-center justify-center"
            role="button"
            aria-label="Account"
          />
        </div>
      </div>
      
      <CommandMenu 
        open={isCommandMenuOpen} 
        onOpenChange={handleOpenChange}
      />
    </>
  );
} 