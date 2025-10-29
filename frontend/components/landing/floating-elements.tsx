"use client";

import { motion } from "framer-motion";
import { Film, Star, Sparkles, Award, Heart, Popcorn } from "lucide-react";

const floatingIcons = [
  { Icon: Film, delay: 0, duration: 20, x: "10%", y: "20%" },
  { Icon: Star, delay: 2, duration: 18, x: "80%", y: "15%" },
  { Icon: Sparkles, delay: 4, duration: 22, x: "15%", y: "70%" },
  { Icon: Award, delay: 1, duration: 19, x: "85%", y: "75%" },
  { Icon: Heart, delay: 3, duration: 21, x: "50%", y: "10%" },
  { Icon: Popcorn, delay: 5, duration: 17, x: "90%", y: "45%" },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {floatingIcons.map(({ Icon, delay, duration, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.1, 0],
            scale: [0, 1, 0],
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-12 w-12 text-primary/20" />
        </motion.div>
      ))}

      {/* Ambient particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
