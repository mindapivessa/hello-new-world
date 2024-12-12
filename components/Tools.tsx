'use client';

import { motion } from 'framer-motion';
import NavBar from './NavBar';
import AnimatedBlobs from './AnimatedBlobs';

export default function Tools() {
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
        <div className="pt-36 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white/90 tracking-tighter text-center mb-8"
            >
              Developer Tools
            </motion.h1>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Tool Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white/90 mb-2">
                  Smart Contract SDK
                </h3>
                <p className="text-white/60 text-sm">
                  Build and deploy smart contracts with our easy-to-use SDK.
                </p>
              </motion.div>

              {/* Add more tool cards as needed */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}