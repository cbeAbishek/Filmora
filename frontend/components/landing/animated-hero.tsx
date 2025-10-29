"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2, Film } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

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
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1521986329282-0436c1f1bab5?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=520&h=320&fit=crop",
    ],
  },
  {
    id: "poster-row-2",
    direction: "right" as const,
    offset: "36%",
    speed: 60,
    posters: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1629541130237-e9324f9564c7?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=520&h=320&fit=crop",
    ],
  },
  {
    id: "poster-row-3",
    direction: "left" as const,
    offset: "64%",
    speed: 50,
    posters: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1517747614396-d21a78b846db?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1521986329282-0436c1f1bab5?w=520&h=320&fit=crop",
      "https://images.unsplash.com/photo-1626943304965-06b5be708529?w=520&h=320&fit=crop",
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
    <section ref={containerRef} className="relative flex min-h-[95vh] items-center overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={{ opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
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
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl text-white/90"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 text-balance">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm uppercase tracking-[0.4em] text-white/60"
              >
                Welcome to Filmora
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
              >
                Produce unforgettable film experiences with a living library that never stops evolving.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75 md:mx-0"
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

      <motion.div
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
      </motion.div>
    </section>
  );
}
