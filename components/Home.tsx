'use client';

import { motion } from 'framer-motion';
import NavBar from './NavBar';
import AnimatedBlobs from './AnimatedBlobs';
import { useState } from 'react';
import CommandMenu from './CommandMenu';
import { Toaster } from 'sonner'
import { WhyBase } from './WhyBase';
import Hero from './Hero';

interface HomeProps {
  isInitialEntry: boolean;
}

export default function Home({ isInitialEntry }: HomeProps) {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  
  const initialAnimation = isInitialEntry ? { opacity: 0 } : { opacity: 1 };
  const entryTransition = isInitialEntry ? { duration: 0.5 } : { duration: 0 };
  const navTransition = isInitialEntry ? { duration: 0.5, delay: 0.2 } : { duration: 0 };
  const contentTransition = isInitialEntry ? { duration: 0.5, delay: 0.4 } : { duration: 0 };

  return (
    <div className="w-screen relative">
        <Toaster
        position="bottom-center"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'bg-[#0f0f0f] text-white border border-neutral-800 text-sm py-3',
          },
        }}
      />
      {/* CommandMenu component */}
      <CommandMenu open={isCommandMenuOpen} onOpenChange={setIsCommandMenuOpen} />
      
      {/* Background layers */}
      <motion.div 
        initial={initialAnimation}
        animate={{ opacity: 1 }}
        transition={entryTransition}
        className="fixed inset-0 z-0"
      >
        <AnimatedBlobs />
      </motion.div>
      <div className="fixed inset-0 backdrop-blur-[40px] z-10" />
      
      {/* Main content wrapper */}
      <div className="relative z-20">
        <motion.div 
          initial={initialAnimation}
          animate={{ opacity: 1 }}
          transition={navTransition}
          className="sticky top-0"
        >
          <NavBar />
        </motion.div>
        <Hero 
          isCommandMenuOpen={isCommandMenuOpen}
          setIsCommandMenuOpen={setIsCommandMenuOpen}
          contentTransition={contentTransition}
          initialAnimation={initialAnimation}
        />
        <WhyBase />
      </div>
    </div>
  );
} 