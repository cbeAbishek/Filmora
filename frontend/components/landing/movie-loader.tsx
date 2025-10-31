"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

interface MovieLoaderProps {
  onLoadComplete: () => void;
}

export function MovieLoader({ onLoadComplete }: MovieLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowContent(false);
            setTimeout(onLoadComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.3) 0%, transparent 50%)`,
              }}
            />
            
            {/* Film strip pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Film reel animation */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-xl"
              />
              
              {/* Film reel */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 ring-4 ring-primary/30 backdrop-blur-sm"
              >
                {/* Inner holes pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-primary/40"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 45}deg) translateY(-40px)`,
                      }}
                    />
                  ))}
                </div>

                {/* Center icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
                >
                  <Film className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              {/* Orbiting play button */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                  className="absolute -right-2 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent shadow-lg"
                >
                  <Play className="h-4 w-4 text-white fill-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Loading text */}
            <div className="space-y-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
              >
                Loading Filmora
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-muted-foreground"
              >
                Preparing your cinematic experience...
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-64 sm:w-80 space-y-2">
              <div className="relative h-2 overflow-hidden rounded-full bg-primary/10 ring-1 ring-primary/20">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent shadow-lg"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Loading assets</span>
                <span className="font-mono font-semibold text-primary">{progress}%</span>
              </div>
            </div>

            {/* Floating film strips */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

export function BackgroundMusic({ autoPlay = false }: BackgroundMusicProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/BG.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = isMuted;
    setAudioElement(audio);

    // Auto-play after a short delay
    const playTimeout = setTimeout(() => {
      audio.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    }, 500);

    return () => {
      clearTimeout(playTimeout);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (!audioElement) return;
    audioElement.muted = isMuted;
  }, [isMuted, audioElement]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg backdrop-blur-sm hover:bg-primary transition-colors ring-2 ring-primary/20"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={isMuted ? "muted" : "unmuted"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
