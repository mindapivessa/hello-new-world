'use client';

import { useEffect, useRef, useState } from 'react';

interface PixelatedBgProps {
  onTransitionComplete?: () => void;
  startTransition?: boolean;
}

const PixelatedBg = ({ onTransitionComplete, startTransition = false }: PixelatedBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelSize = 4;
    let isTransitioning = false;
    let pixels: { x: number; y: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawInitialPattern();
    };

    const drawInitialPattern = () => {
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);
      
      // Fill with black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset pixels array
      pixels = [];

      // Draw static pixelated pattern and collect coordinates
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * pixelSize;
          const y = j * pixelSize;

          const shouldAddNoise = ((i * 37 + j * 17) % 1000) === 0;
          const color = shouldAddNoise ? 
            'rgba(255, 255, 255, 0.15)' : 
            'rgba(242, 242, 242, 0.4)';

          ctx.fillStyle = color;
          ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
          
          // Store coordinates for transition
          pixels.push({ x, y });
        }
      }
      
      // Shuffle pixels array for random fill effect
      pixels = pixels.sort(() => Math.random() - 0.5);
    };

    const animateTransition = () => {
      if (!isTransitioning || !ctx || !canvas) return;

      const pixelsPerFrame = 500; // Increased for faster transition

      const currentPixels = pixels.slice(0, pixelsPerFrame);
      pixels = pixels.slice(pixelsPerFrame);

      // Fill pixels black
      ctx.fillStyle = '#000000';
      currentPixels.forEach(({ x, y }) => {
        ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
      });

      if (pixels.length > 0) {
        animationRef.current = requestAnimationFrame(animateTransition);
      } else {
        isTransitioning = false;
        onTransitionComplete?.();
      }
    };

    // Initial render
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Start transition if prop is true
    if (startTransition && !isTransitioning) {
      isTransitioning = true;
      animateTransition();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startTransition, onTransitionComplete, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#000000' }}
    />
  );
};

export default PixelatedBg; 