"use client";

import { motion } from "framer-motion";
import { Film, Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
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
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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
      <div className="relative z-10 container px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-10">
          {/* Animated 404 with film reel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Glowing background */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary via-accent to-primary blur-3xl"
            />

            {/* 404 Text */}
            <div className="relative flex items-center gap-4 sm:gap-6">
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-8xl sm:text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{ letterSpacing: "-0.02em" }}
              >
                4
              </motion.span>

              {/* Animated Film Reel */}
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 ring-4 ring-primary/40 backdrop-blur-md shadow-2xl"
              >
                {/* Inner dots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(8)].map((_, i) => (
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
                      className="absolute h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 45}deg) translateY(-${i % 2 === 0 ? '32px' : '28px'})`,
                      }}
                    />
                  ))}
                </div>

                {/* Center icon */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: -360,
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                  className="relative z-10 flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-2xl"
                >
                  <Film className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-8xl sm:text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{ letterSpacing: "-0.02em" }}
              >
                4
              </motion.span>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Scene Not Found</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              This Page is Off-Screen
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Looks like you've wandered into uncharted territory. The page you're looking for doesn't exist in our cinematic universe.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <Link href="/" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-white group"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Back to Home
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto gap-2 border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all shadow-md group"
              >
                <Film className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-8 border-t border-border/40 w-full max-w-md"
          >
            <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/#search" 
                className="group flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50 hover:border-primary/30"
              >
                <Search className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Search Movies</span>
              </Link>
              <Link 
                href="/#features" 
                className="group flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50 hover:border-primary/30"
              >
                <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Features</span>
              </Link>
            </div>
          </motion.div>

          {/* Fun message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xs sm:text-sm text-muted-foreground/70 italic max-w-md"
          >
            "In cinema, as in life, sometimes we take a wrong turn. But that's okay—the best stories often come from unexpected journeys." 🎬
          </motion.p>
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 opacity-10"
      >
        <Film className="h-16 w-16 sm:h-24 sm:w-24 text-primary" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 opacity-10"
      >
        <Film className="h-16 w-16 sm:h-24 sm:w-24 text-accent" />
      </motion.div>
    </div>
  );
}
