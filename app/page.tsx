'use client';

import { useState, useCallback } from 'react';
import Terminal from '../components/Terminal';
import HelloNewWorld from '../components/HelloNewWorld';
import PixelatedBg from '../components/PixelatedBg';
import Loading from '../components/Loading';

export default function Home() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [startBgTransition, setStartBgTransition] = useState(false);

  const handleMessagesComplete = useCallback(() => {
    setStartBgTransition(true);
  }, []);

  const handleBgTransitionComplete = useCallback(() => {
    setShowLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    setShowHelloWorld(true);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {!showLoading && !showHelloWorld && (
        <>
          <PixelatedBg 
            startTransition={startBgTransition}
            onTransitionComplete={handleBgTransitionComplete}
          />
          <Terminal onMessagesComplete={handleMessagesComplete} />
        </>
      )}
      {showLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      {showHelloWorld && <HelloNewWorld />}
    </main>
  );
}
