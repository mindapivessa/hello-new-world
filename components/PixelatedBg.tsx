'use client';

import { useEffect, useRef, useState } from 'react';

interface PixelatedBgProps {
  onTransitionComplete?: () => void;
  startTransition?: boolean;
}

interface Pixel {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  opacity?: number;
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
    let pixels: Pixel[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawInitialPattern();
    };

    const drawInitialPattern = () => {
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pixels = [];

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
          
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const angle = Math.atan2(y - centerY, x - centerX);
          const speed = Math.random() * 2 + 5;
          
          pixels.push({ 
            x, 
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            opacity: 1
          });
        }
      }
      
      pixels = pixels.sort(() => Math.random() - 0.5);
    };

    const animateTransition = () => {
      if (!isTransitioning || !ctx || !canvas) return;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let allPixelsFaded = true;

      pixels = pixels.map(pixel => {
        if (pixel.opacity && pixel.opacity > 0) {
          allPixelsFaded = false;
          
          pixel.x += pixel.vx || 0;
          pixel.y += pixel.vy || 0;
          
          pixel.opacity -= 0.02;

          ctx.fillStyle = `rgba(242, 242, 242, ${pixel.opacity})`;
          ctx.fillRect(pixel.x, pixel.y, pixelSize - 1, pixelSize - 1);
        }
        return pixel;
      });

      if (!allPixelsFaded) {
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