'use client'

import { useScramble } from 'use-scramble'

export function AnimatedHeroText() {
  const { ref } = useScramble({
    text: "Launch, scale, and monetize your ideas on Base",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
    chance: 0.8,
    overflow: false,
    range: [65, 125],
    ignore: [" ", ","],
  })

  return (
    <span
      ref={ref}
      style={{ 
        display: 'inline-block',
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
        fontWeight: 'bold',
        letterSpacing: '-0.05em',
        height: '2.5rem',
        minHeight: '2.5rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    />
  )
} 