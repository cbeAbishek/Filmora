"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2, Film } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";

const featureBadges = [
  { label: "Infinite Library", icon: Sparkles },
  { label: "Smart Imports", icon: Wand2 },
  { label: "Cinematic Experience", icon: Film },
];

const posterRows = [
  {
    id: "poster-row-1",
    direction: "left" as const,
    offset: "8%",
    speed: 55,
    posters: [
      "./th_1.jpeg",
      "./th_2.jpeg",
      "./th_3.jpeg",
      "./th_4.jpeg",
      "./th_5.jpeg",
      "./th_6.jpeg",
    ],
  },
  {
    id: "poster-row-2",
    direction: "right" as const,
    offset: "36%",
    speed: 60,
    posters: [
      "./th_1.jpeg",
      "./th_2.jpeg",
      "./th_3.jpeg",
      "./th_4.jpeg",
      "./th_5.jpeg",
      "./th_6.jpeg"
    ]
  },
  {
    id: "poster-row-3",
    direction: "left" as const,
    offset: "64%",
    speed: 50,
    posters: [
      "./th_7.jpeg",
      "./th_8.jpeg",
      "./th_9.jpeg",
      "./th_10.jpeg",
      "./th_11.jpeg",
      "./th_12.jpeg",
    ],
  },
];

function HeroPosterRow({
  posters,
  direction,
  speed,
  offset,
}: {
  posters: string[];
  direction: "left" | "right";
  speed: number;
  offset: string;
}) {
  return (
    <div
      className="absolute left-1/2 w-[200%] -translate-x-1/2 overflow-hidden"
      style={{ top: offset }}
    >
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...posters, ...posters].map((poster, index) => (
          <div
            key={`${poster}-${index}`}
            className="relative h-40 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)]"
          >
            <img src={poster} alt="Featured poster" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl [text-shadow:_0_4px_20px_rgba(0,0,0,0.8)]"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function AnimatedLabel({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-2 text-sm font-medium uppercase tracking-[0.4em] text-white backdrop-blur-xl drop-shadow-lg"
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block h-2 w-2 rounded-full bg-primary"
      />
      {text}
    </motion.span>
  );
}

export function AnimatedHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section ref={containerRef} className="pt-34 relative flex min-h-[95vh] items-center overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={{ opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/85 to-black z-10" />
        {posterRows.map((row) => (
          <HeroPosterRow key={row.id} {...row} />
        ))}
        <motion.div
          className="absolute -top-24 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-primary/20 blur-[160px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-30%] right-[-10%] h-[680px] w-[680px] rounded-full bg-accent/25 blur-[140px]"
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div style={{ y, scale }} className="container relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              {featureBadges.map(({ label, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2 backdrop-blur-xl text-white font-medium drop-shadow-lg"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 text-balance">
              <AnimatedLabel text="Welcome to Filmora" />
              <AnimatedTitle text="Produce unforgettable film experiences with a living library that never stops evolving." />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-lg md:mx-0 [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]"
              >
                Curate cinematic universes, manage releases, and collaborate with your team inside a single cinematic hub. Filmora blends metadata magic with breathtaking presentation so every story gets the spotlight it deserves.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
            >
              <SignedIn>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Button asChild size="lg" className="gap-2 rounded-full px-10 py-6 text-lg shadow-2xl shadow-primary/30">
                    <Link href="/dashboard">
                      Launch dashboard
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <Button size="lg" className="gap-2 rounded-full px-10 py-6 text-lg shadow-2xl shadow-primary/30">
                      Sign in to start
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </SignInButton>
              </SignedOut>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/30 bg-white/5 px-10 py-6 text-lg text-white hover:bg-white/10"
                >
                  <Link href="#features">Discover features</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-center justify-center rounded-full border border-white/40">
          <motion.span
            animate={{ y: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </div>
      </motion.div> */}
    </section>
  );
}
