'use client';

import { useState, useCallback } from 'react';
import Terminal from '../components/Terminal';
import HelloNewWorld from '../components/HelloNewWorld';
import Home from '../components/Home';
import PixelatedBg from '../components/PixelatedBg';

export default function Page() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [startBgTransition, setStartBgTransition] = useState(false);

  const handleMessagesComplete = useCallback(() => {
    setShowHelloWorld(true);
    setStartBgTransition(true);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <>
        <PixelatedBg 
          startTransition={startBgTransition}
        />
        {showHelloWorld && !showHome && <HelloNewWorld onStartBuilding={() => setShowHome(true)} />}
        {showHome && <Home />}
        {!startBgTransition && <Terminal onMessagesComplete={handleMessagesComplete} />}
      </>
    </main>
  );
}
