"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Volume2, VolumeX, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface MovieLoaderProps {
  onLoadComplete: () => void;
}

export function MovieLoader({ onLoadComplete }: MovieLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Simulate loading progress with smooth acceleration
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowContent(false);
            setTimeout(onLoadComplete, 800);
          }, 500);
          return 100;
        }
        // Non-linear progress for more dynamic feel
        const increment = prev < 50 ? 1.5 : prev < 80 ? 2.5 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
        >
          {/* Animated background with multiple gradients */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.4) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.4) 0%, transparent 50%),
                                 radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
              }}
            />
            
            {/* Animated grid pattern */}
            <motion.div 
              className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                backgroundSize: ["4rem 4rem", "5rem 5rem", "4rem 4rem"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Film strip pattern with animation */}
            <div className="absolute inset-0 opacity-10">
              <motion.div 
                className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-primary/30 to-transparent"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary/30 to-transparent"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Film reel animation with enhanced effects */}
            <div className="relative">
              {/* Outer pulsing rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary via-accent to-primary blur-2xl"
              />
              
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-xl"
              />
              
              {/* Spinning sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      transform: `translateY(-60px) translateX(-50%)`,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Film reel with 3D effect */}
              <motion.div
                animate={{ 
                  rotate: -360,
                  rotateY: [0, 360],
                }}
                transition={{ 
                  rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                className="relative flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 ring-4 ring-primary/40 backdrop-blur-md shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Inner holes pattern with glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      className="absolute h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 30}deg) translateY(-50px)`,
                      }}
                    />
                  ))}
                </div>

                {/* Center icon with enhanced animation */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative z-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Film className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-2xl" />
                  </motion.div>
                  
                  {/* Inner glow */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-white/30 blur-md"
                  />
                </motion.div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 20px rgba(var(--accent-rgb), 0.5)",
                      "0 0 40px rgba(var(--accent-rgb), 0.8)",
                      "0 0 20px rgba(var(--accent-rgb), 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-4 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-xl ring-2 ring-white/50"
                >
                  <Play className="h-5 w-5 text-white fill-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              {/* Orbiting stars */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 3, repeat: Infinity }
                  }}
                  className="absolute -left-4 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent/80 shadow-lg"
                >
                  <Star className="h-4 w-4 text-white fill-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Loading text with enhanced animations */}
            <div className="space-y-5 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <motion.h2
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
                  style={{ letterSpacing: "0.02em" }}
                >
                  Loading Filmora
                </motion.h2>
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ maxWidth: "200px" }}
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 1] }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-base sm:text-lg text-muted-foreground font-medium"
              >
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Preparing your cinematic experience
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </motion.p>

              {/* Loading stage indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xs sm:text-sm text-primary/70 font-mono"
              >
                {progress < 30 && "Initializing components..."}
                {progress >= 30 && progress < 60 && "Loading assets..."}
                {progress >= 60 && progress < 90 && "Preparing dashboard..."}
                {progress >= 90 && "Almost ready!"}
              </motion.div>
            </div>

            {/* Enhanced Progress bar */}
            <div className="w-72 sm:w-96 space-y-3">
              <div className="relative h-3 overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/20 shadow-inner">
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-primary/5"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Progress fill with gradient */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary shadow-lg"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    width: { duration: 0.3, ease: "easeOut" },
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                
                {/* Multiple shimmer effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
                />

                {/* Progress pulse at the end */}
                {progress > 0 && (
                  <motion.div
                    className="absolute inset-y-0 w-2 bg-white/50 blur-sm"
                    style={{ left: `${Math.max(0, progress - 1)}%` }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <motion.span 
                  className="text-muted-foreground font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {progress < 100 ? "Loading" : "Complete"}
                </motion.span>
                <motion.span 
                  className="font-mono font-bold text-primary tabular-nums"
                  animate={{ scale: progress === 100 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>

            {/* Enhanced floating film strips and stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`strip-${i}`}
                className="absolute rounded"
                style={{
                  width: i % 2 === 0 ? 16 : 12,
                  height: i % 2 === 0 ? 2 : 3,
                  top: `${15 + i * 15}%`,
                  left: `${5 + i * 15}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                <div className="h-full w-full bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 rounded shadow-lg" />
              </motion.div>
            ))}

            {/* Floating stars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{
                  top: `${20 + i * 10}%`,
                  right: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <Star className="h-3 w-3 text-primary fill-primary" />
              </motion.div>
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
