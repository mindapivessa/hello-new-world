'use client';

import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import NavBar from './NavBar';
import AnimatedBlobs from './AnimatedBlobs';
import InstantSettlement from './InstantSettlement';
import LowFee from './LowFee';
import Interoperable from './Interoperable';

const ChevronDown = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
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
);

interface HomeProps {
  isInitialEntry: boolean;
}

export default function Home({ isInitialEntry }: HomeProps) {
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [1, 0.5, 0],
    {
      ease: easeInOut
    }
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0, -50],
    {
      ease: easeInOut
    }
  );

  const demoY = useTransform(
    scrollYProgress,
    [0, 0.4],
    ['100vh', '0vh'],
    {
      ease: easeInOut
    }
  );

  const demoOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [0, 1],
    {
      ease: easeInOut
    }
  );

  const initialAnimation = isInitialEntry ? { opacity: 0 } : { opacity: 1 };
  const entryTransition = isInitialEntry ? { duration: 1 } : { duration: 0 };
  const navTransition = isInitialEntry ? { duration: 0.5, delay: 0.5 } : { duration: 0 };
  const contentTransition = isInitialEntry ? { duration: 0.5, delay: 1 } : { duration: 0 };

  return (
    <div className="w-screen h-[200vh] relative">
      {/* Background layers */}
      <motion.div 
        initial={initialAnimation}
        animate={{ opacity: 1 }}
        transition={entryTransition}
        className="fixed inset-0 z-0"
      >
        <AnimatedBlobs />
      </motion.div>
      <div className="fixed inset-0 backdrop-blur-[40px] z-10 h-[200vh]" />
      
      {/* Sticky Nav */}
      <motion.div 
        initial={initialAnimation}
        animate={{ opacity: 1 }}
        transition={navTransition}
        className="sticky top-0 z-30"
      >
        <NavBar />
      </motion.div>
      
      {/* Content layers */}
      <div className="relative z-20">
        {/* Hero Section - Fixed */}
        <motion.div 
          style={{
            opacity: heroOpacity,
            y: heroY
          }}
          initial={initialAnimation}
          animate={{ opacity: 1 }}
          transition={contentTransition}
          className="fixed top-10 left-0 w-full h-[calc(100vh-2.5rem)]"
        >
          <div className="flex-1 flex flex-col justify-between pt-36 pb-12 h-full">
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
            </div>

            {/* Why build onchain + Scroll Indicator */}
            <div className="flex flex-col items-center gap-4 max-w-xl px-4 text-center mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base text-white/90"
              >
                Why build an app onchain, you may wonder?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center gap-0.5"
              >
                <ChevronDown />
                <span className="text-xs text-white/30">Continue scrolling</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Why build onchain*/}
        <motion.div 
          style={{ 
            y: demoY,
            opacity: demoOpacity
          }}
          className="fixed top-10 left-0 w-full"
        >
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl p-8 font-bold text-white/90 tracking-tighter text-center"
            >
            Why build onchain?
        </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10">
            <InstantSettlement />
            <LowFee />
            <Interoperable />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl p-8 font-bold text-white/90 tracking-tighter text-center"
            >
            Launch, scale, and monetize
        </motion.h2>
        </motion.div>
      </div>
    </div>
  );
} 