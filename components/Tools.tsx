'use client';

import { motion } from 'framer-motion';
import NavBar from './NavBar';
import AnimatedBlobs from './AnimatedBlobs';
import { useState } from 'react';

type FilterTab = 'All' | 'OnchainKit' | 'Paymaster' | 'Smart Wallet' | 'L3 Launcher' | 'AgentKit' | 'Verifications';

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

  const filters: FilterTab[] = [
    'All',
    'OnchainKit',
    'Paymaster',
    'Smart Wallet',
    'L3 Launcher',
    'AgentKit',
    'Verifications'
  ];

  return (
    <div className="w-screen h-screen relative">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <AnimatedBlobs />
      </div>
      <div className="fixed inset-0 backdrop-blur-[40px] z-10" />
      
      {/* Sticky Nav */}
      <div className="sticky top-0 z-30">
        <NavBar />
      </div>
      
      {/* Content layers */}
      <div className="relative z-20">
        <div className="py-36 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white/90 tracking-tighter text-center mb-8"
            >
              Tools
            </motion.h1>

            {/* Filter Tabs */}
            <div className="mb-24 overflow-x-auto">
              <div className="flex gap-2 justify-center min-w-max px-4">
                {filters.map((filter, index) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${activeFilter === filter 
                        ? 'text-white' 
                        : 'text-white/40 hover:text-white'
                      }
                    `}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Tools Cards */}
            <div className="space-y-8">
              {/* Wallet Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className=""
              >
                <h2 className="text-lg font-semibold text-white/90 mb-2">Wallet</h2>
                <p className="text-white/60 mb-6">
                  Connect to an application with their wallet, view wallet details, onramp, send funds, and swap tokens.
                </p>
                <div className="items-center bg-black/30 border border-white/10 rounded-xl p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                    paprika.base.eth
                  </div>
                </div>
              </motion.div>

              {/* Onramp Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white/90 mb-2">Onramp</h2>
                <p className="text-white/60 mb-6">
                  Buy tokens with ETH, USDC, Apple Pay, Coinbase, or Debit Card.
                </p>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="0" 
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white"
                    />
                  </div>
                  <button className="bg-white text-black font-semibold px-8 py-4 rounded-xl">
                    Buy
                  </button>
                </div>
              </motion.div>

              {/* Intent Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white/90 mb-2">Intent</h2>
                <p className="text-white/60 mb-6">
                  Perform a transaction using natural language and converts to transaction intents.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-white/60">💬</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-white/60">🔗</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-white/60">≡</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}