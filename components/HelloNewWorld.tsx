'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: "Hello, (new) world!", lang: "English" },
  { text: "你好，(新)世界！", lang: "Chinese" },
  { text: "こんにちは、(新しい)世界！", lang: "Japanese" },
  { text: "สวัสดี, โลก (ใหม่)!", lang: "Thai" },
  { text: "Hallo, (neue) welt!", lang: "German" },
  { text: "Bonjour, (nouveau) monde!", lang: "French" },
  { text: "¡Hola, (nuevo) mundo!", lang: "Spanish" },
  { text: "Halo, dunia (baru)!", lang: "Indonesian" },
  { text: "नमस्ते, (नई) दुनिया!", lang: "Hindi" },
  { text: "مرحباً، عالم (جديد)!", lang: "Arabic" }
];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M24.5372 14.6602L15.2039 5.3269H18.9751L29.6418 15.9936L18.9751 26.6602L15.2039 26.6602L24.5372 17.3269L2.32825 17.3269V14.6602L24.5372 14.6602Z" fill="currentColor"/>
  </svg>
);

const HelloNewWorld = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 animate-gradient bg-gradient-size"
    >
      <div className="absolute inset-0 backdrop-blur-[100px]" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-8"
      >
        <div className="h-20 perspective-[1000px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              className="text-4xl font-bold text-white text-center m-0 w-full drop-shadow-lg"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {greetings[currentIndex].text}
            </motion.h1>
          </AnimatePresence>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          <button className="w-10 h-10 rounded-full bg-white/10 border-none cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-white/20 hover:scale-105 backdrop-blur-sm">
            <ArrowIcon />
          </button>
          <span className="text-white text-base drop-shadow-lg">Start building</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HelloNewWorld; 