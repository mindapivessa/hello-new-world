'use client'

import { motion } from 'framer-motion'

export function AnimatedLayers() {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      {/* Bottom layer */}
      <motion.path
        d="M2 17L12 22L22 17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ y: 0 }}
        whileHover={{ y: 4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Middle layer */}
      <motion.path
        d="M2 12L12 17L22 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ y: 0 }}
        whileHover={{ y: 2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      
      {/* Top layer */}
      <motion.path
        d="M2 7L12 12L22 7L12 2L2 7Z"
        stroke="white"
        fill="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ y: 0 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  )
} 