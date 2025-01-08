'use client'

import { motion } from 'framer-motion'

export function AnimatedCBLogo() {
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
        d="M12.0076 17.4951C9.23985 17.4951 7.00066 15.2576 7.00066 12.4951C7.00066 9.73276 9.23985 7.49512 12.0076 7.49512C14.4872 7.49512 16.5452 9.2993 16.9418 11.1618H21.9888C21.563 6.02849 17.2591 2.49512 12.0076 2.49512C6.47635 2.49512 2.48876 6.4743 2.48876 12.4951C2.48876 18.5159 6.47635 22.4951 12.0076 22.4951C17.2591 22.4951 21.563 18.9618 21.9888 13.8285H16.9418C16.5452 15.691 14.4872 17.4951 12.0076 17.4951Z"
        fill="white"
      />
    </motion.svg>
  )
}