'use client'

import { motion } from 'framer-motion'

export function AnimatedShield() {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ rotateY: 360 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.path
        d="M2 4L2.02857 12C2.91429 20.0571 12 23 12 23C12 23 21.1143 20.2857 22 12.1905V4L12 1L2 4ZM11 20.3905C10.2857 20.0381 9.42857 19.5524 8.57143 18.9143C6.51429 17.3714 4.51429 15.0952 4.11429 11.8809L4.09143 5.48095L11 3.39048V20.3905Z"
        fill="white"
      />
    </motion.svg>
  )
}