import React from 'react';
import styles from './BaseLogo.module.css';

const BaseLogo = () => {
  return (
    <svg 
      width="64" 
      height="64" 
      viewBox="0 0 32 32" 
      className={styles.baseLogo}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M15.9618 29.3269C23.3384 29.3269 29.3184 23.3574 29.3184 15.9936C29.3184 8.62982 23.3384 2.66028 15.9618 2.66028C8.96328 2.66028 3.22193 8.03352 2.65173 14.8728H20.3061V17.1144H2.65173C3.22194 23.9537 8.96328 29.3269 15.9618 29.3269Z"
        className={styles.logoPath}
      />
    </svg>
  );
};

export default BaseLogo; 