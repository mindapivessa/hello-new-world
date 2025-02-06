'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = [
  'rgba(0, 0, 255, 1)', 
  'rgba(0, 255, 0, 1)',
  'rgba(255, 0, 255, 1)',
  'rgba(255, 255, 0, 1)',
];

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

const MovingLines = ({ 
  isActive = true, 
  onAnimationStart }: { 
    isActive?: boolean; 
    onAnimationStart?: () => void 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const linesRef = useRef<{
    y: number;
    color: string;
    x: number;
    length: number;
  }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize lines
    if (linesRef.current.length === 0) {
      const lineSpacing = 20;
      const numberOfLines = Math.floor(canvas.height / lineSpacing);

      for (let i = 0; i < numberOfLines; i++) {
        linesRef.current.push({
          y: i * lineSpacing,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          x: -canvas.width, // Start from left edge
          length: 200 + Math.random() * 100 // Varying lengths
        });
      }
    }

    // Call onAnimationStart immediately when component mounts
    requestAnimationFrame(() => {
      onAnimationStart?.();
    });

    const animate = () => {
      if (!isActive) return;
      
      const speed = 50;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach(line => {
        ctx.fillStyle = line.color;
        
        // Update position
        line.x += speed;
        
        // Draw line
        ctx.fillRect(line.x, line.y, line.length, 2);
        
        // Reset position when off screen
        if (line.x > canvas.width) {
          line.x = -line.length;
          line.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, onAnimationStart]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 bg-black -z-10"
    />
  );
};

const HelloNewWorld = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  const handleAnimationStart = () => {
    setTimeout(() => {
      setShowText(true);
    }, 200);
  };

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
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <MovingLines isActive={true} onAnimationStart={handleAnimationStart} />
      <div className="absolute inset-0 backdrop-blur-[40px]" />
      {showText && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
            <button 
              className="w-10 h-10 rounded-full bg-white/10 border-none cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-white/20 hover:scale-105 backdrop-blur-sm"
            >
              <ArrowIcon />
            </button>
            <span className="text-white text-base drop-shadow-lg">Start building</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HelloNewWorld; 