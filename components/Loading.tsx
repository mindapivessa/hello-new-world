import React, { useEffect, useState } from 'react';
import styles from './Loading.module.css';
import BaseLogo from './BaseLogo';

interface LoadingProps {
  onLoadingComplete: () => void;
}

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for loading bar animation (2s) then set loaded state
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    // Wait additional 1.5s (reduced from 3s) after loading for fade out
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3500); // Reduced from 5000 to 3500

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`${styles.loadingContainer} ${isLoaded ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <BaseLogo />
        </div>
        <div className={styles.loadingBarContainer}>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading; 