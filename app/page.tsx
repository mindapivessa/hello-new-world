'use client';

import { useState, useCallback, useEffect } from 'react';
import Terminal from '../components/Terminal';
import HelloNewWorld from '../components/HelloNewWorld';
import Home from '../components/Home';
import Tools from '../components/Tools';
import PixelatedBg from '../components/PixelatedBg';

export default function Page() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [startBgTransition, setStartBgTransition] = useState(false);
  const [activeView, setActiveView] = useState('home');

  const handleMessagesComplete = useCallback(() => {
    setShowHelloWorld(true);
    setStartBgTransition(true);
  }, []);

  useEffect(() => {
    const handleViewChange = (event: CustomEvent) => {
      setActiveView(event.detail);
    };

    window.addEventListener('viewChange', handleViewChange as EventListener);
    
    return () => {
      window.removeEventListener('viewChange', handleViewChange as EventListener);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <>
        <PixelatedBg 
          startTransition={startBgTransition}
        />
        {showHelloWorld && !showHome && <HelloNewWorld onStartBuilding={() => setShowHome(true)} />}
        {showHome && activeView === 'home' && <Home />}
        {showHome && activeView === 'tools' && <Tools />}
        {!startBgTransition && <Terminal onMessagesComplete={handleMessagesComplete} />}
      </>
    </main>
  );
}
