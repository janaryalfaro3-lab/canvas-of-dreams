import { motion } from 'motion/react';
import React, { useMemo } from 'react';

const DROP_COUNT = 30;

export default function InkRain() {
  const drops = useMemo(() => {
    return Array.from({ length: DROP_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 7,
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.3,
      blur: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: ['0vh', '110vh'],
            opacity: [0, drop.opacity, drop.opacity, 0]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: drop.left,
            width: '2px', // Thin ink trail
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #ea580c, #000)',
            filter: `blur(${drop.blur}px)`,
            scale: drop.scale,
            transformOrigin: 'top',
          }}
        />
      ))}
      
      {/* 3D Depth fog/overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950 pointer-events-none" />
    </div>
  );
}
