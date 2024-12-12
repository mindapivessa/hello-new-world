'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function LowFee() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTrade = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col max-w-xl p-6 border-r border-white/10">
      {/* Interactive Trade Demo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-8 pb-12 rounded-lg flex flex-col items-center justify-center"
      >
        {/* Trade Card */}
        <div className="bg-white/5 rounded-xl overflow-hidden w-72">
          {/* EURC Amount */}
          <div className="p-4 flex items-center justify-between">
            <div className="w-10 h-10 bg-white/10 rounded-full" />
            <div className="flex flex-col items-end">
              <span className="text-xl text-white/90">100.00 EURC</span>
              <span className="text-white/60">€100.00</span>
            </div>
          </div>
          
          {/* Divider with Arrow */}
          <div className="flex justify-center py-2 border-t border-b border-white/10">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white/30"
            >
              <path 
                d="M6 9L12 15L18 9" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* USDC Amount */}
          <div className="p-4 flex items-center justify-between">
            <div className="w-10 h-10 bg-white/10 rounded-full" />
            <div className="flex flex-col items-end">
              <span className="text-xl text-white/90">104.85 USDC</span>
              <span className="text-white/60">$104.85</span>
            </div>
          </div>

          {/* Trade Button */}
          <motion.button
            onClick={handleTrade}
            disabled={isLoading || isSuccess}
            className="w-full p-4 bg-[#0A0A0A] text-white/90 flex justify-center items-center"
            whileHover={{ backgroundColor: '#151515' }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? <LoadingSpinner /> : 
             isSuccess ? (
               <motion.span
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.3 }}
               >
                 Success!
               </motion.span>
             ) : 'Trade'}
          </motion.button>
        </div>
      </motion.div>
    
      {/* Title */}
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg font-semibold text-white/90 tracking-tight"
      >
        Low fees
      </motion.h3>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base text-white/60"
      >
        Experience lightning-fast transactions with immediate finality on Base.
      </motion.p>
    </div>
  );
} 