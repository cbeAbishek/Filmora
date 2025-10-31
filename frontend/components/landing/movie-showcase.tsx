"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShowcaseMovie {
  id: string;
  title: string;
  status: string;
  tag: string;
  image: string;
}

const movieColumns: Array<{
  id: string;
  direction: "up" | "down";
  speed: number;
  movies: ShowcaseMovie[];
}> = [
  {
    id: "column-a",
    direction: "up",
    speed: 55,
    movies: [
      {
        id: "dune",
        title: "Dune: Resonance",
        status: "Now streaming",
        tag: "Sci-Fi",
        image: "./thv1.jpeg",
      },
      {
        id: "neon-dancer",
        title: "Neon Dancer",
        status: "Festival highlight",
        tag: "Drama",
        image: "./thv2.jpeg",
      },
      {
        id: "starlight",
        title: "Starlight Echoes",
        status: "In theatres",
        tag: "Adventure",
        image: "./thv3.jpeg",
      },
      {
        id: "afterglow",
        title: "Afterglow City",
        status: "Director's cut",
        tag: "Thriller",
        image: "./thv4.jpeg",
      },
      {
        id: "nocturne",
        title: "Nocturne Tide",
        status: "Limited release",
        tag: "Mystery",
        image: "./thv5.jpeg",
      },
      {
        id: "starbound",
        title: "Starbound",
        status: "Coming soon",
        tag: "Sci-Fi",
        image: "./thv6.jpeg",
      },
    ],
  },
  {
    id: "column-b",
    direction: "down",
    speed: 52,
    movies: [
      {
        id: "midnight-radio",
        title: "Midnight Radio",
        status: "Now streaming",
        tag: "Music",
        image: "./thv7.jpeg",
      },
      {
        id: "velvet-horizon",
        title: "Velvet Horizon",
        status: "In production",
        tag: "Romance",
        image: "./thv8.jpeg",
      },
      {
        id: "aurora-run",
        title: "Aurora Run",
        status: "New acquisition",
        tag: "Sci-Fi",
        image: "./thv9.jpeg",
      },
      {
        id: "solstice",
        title: "Solstice",
        status: "In theatres",
        tag: "Drama",
        image: "./thv10.jpeg",
      },
      {
        id: "skyline-pulse",
        title: "Skyline Pulse",
        status: "Award contender",
        tag: "Action",
        image: "./thv11.jpeg",
      },
      {
        id: "silent-frame",
        title: "Silent Frame",
        status: "Coming soon",
        tag: "Documentary",
        image: "./thv12.jpeg",
      },
    ],
  },
  {
    id: "column-c",
    direction: "up",
    speed: 58,
    movies: [
      {
        id: "cascade-bloom",
        title: "Cascade Bloom",
        status: "Now streaming",
        tag: "Fantasy",
        image: "./thv13.jpeg",
      },
      {
        id: "prism",
        title: "Prism",
        status: "In festivals",
        tag: "Drama",
        image: "./thv1.jpeg",
      },
      {
        id: "luminous",
        title: "Luminous",
        status: "Now streaming",
        tag: "Thriller",
        image: "./thv2.jpeg",
      },
      {
        id: "drift",
        title: "Drift",
        status: "Editor's pick",
        tag: "Adventure",
        image: "./thv3.jpeg",
      },
      {
        id: "emberfall",
        title: "Emberfall",
        status: "In theatres",
        tag: "Action",
        image: "./thv4.jpeg",
      },
      {
        id: "chromatic-tide",
        title: "Chromatic Tide",
        status: "Coming soon",
        tag: "Sci-Fi",
        image: "./thv5.jpeg",
      },
    ],
  },
  // {
  //   id: "column-d",
  //   direction: "down",
  //   speed: 54,
  //   movies: [
  //     {
  //       id: "parallel-lines",
  //       title: "Parallel Lines",
  //       status: "Now streaming",
  //       tag: "Mystery",
  //       image: "./thv6.jpeg",
  //     },
  //     {
  //       id: "celestial",
  //       title: "Celestial",
  //       status: "Global premiere",
  //       tag: "Sci-Fi",
  //       image: "./thv7.jpeg",
  //     },
  //     {
  //       id: "neon-harvest",
  //       title: "Neon Harvest",
  //       status: "Festival darling",
  //       tag: "Drama",
  //       image: "./thv8.jpeg",
  //     },
  //     {
  //       id: "golden-hour",
  //       title: "Golden Hour",
  //       status: "In theatres",
  //       tag: "Romance",
  //       image: "./thv9.jpeg",
  //     },
  //     {
  //       id: "polaris",
  //       title: "Polaris",
  //       status: "Coming soon",
  //       tag: "Adventure",
  //       image: "./thv10.jpeg",
  //     },
  //     {
  //       id: "midnight-atlas",
  //       title: "Midnight Atlas",
  //       status: "Editor's pick",
  //       tag: "Thriller",
  //       image: "./thv11.jpeg",
  //     },
  //   ],
  // },
];

function ShowcaseCard({ movie }: { movie: ShowcaseMovie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative h-[260px] w-full overflow-hidden rounded-[32px] border border-border/40 bg-background/40 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.4)] backdrop-blur"
    >
      <img src={movie.image} alt={movie.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

function TypewriterLabel({ text }: { text: string }) {
  const labelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(labelRef, { once: true, margin: "-120px" });
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let index = 0;
    const typingInterval = window.setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(typingInterval);
      }
    }, 60);

    return () => {
      window.clearInterval(typingInterval);
    };
  }, [isInView, text]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const blinkInterval = window.setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 500);

    return () => {
      window.clearInterval(blinkInterval);
    };
  }, [isInView]);

  return (
    <motion.div
      ref={labelRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/70"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative block whitespace-nowrap uppercase tracking-[0.4em]">
        <span aria-hidden className="invisible select-none uppercase tracking-[0.4em]">{text}</span>
        <span aria-hidden className="absolute inset-0 flex items-center uppercase tracking-[0.4em]">
          <span>{displayText}</span>
          <span
            className={`${displayText.length === 0 ? "ml-0" : "ml-1"} h-4 w-[1px] bg-white/60 transition-opacity duration-150 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      </span>
    </motion.div>
  );
}

function ScrollingColumn({
  column,
}: {
  column: (typeof movieColumns)[number];
}) {
  const fadeSize = 140;

  return (
    <div
      className="relative flex shrink-0 basis-1/2 flex-col overflow-hidden rounded-[40px] border border-border/40 bg-background/50 p-4 backdrop-blur sm:basis-1/3 lg:basis-auto min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px] lg:min-w-[260px] lg:w-[260px] h-[700px]"
      style={{
        maskImage: `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`,
      }}
    >
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: column.direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: column.speed, ease: "linear", repeat: Infinity }}
      >
        {[...column.movies, ...column.movies].map((movie, index) => (
          <ShowcaseCard key={`${column.id}-${movie.id}-${index}`} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
}

export function MovieShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yInverse = useTransform(scrollYProgress, [0, 1], [-140, 140]);

  return (
    <section ref={containerRef} id="showcase" className="relative overflow-hidden py-24">
      <motion.div
        style={{ y }}
        className="absolute -left-40 top-[-10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px] -z-10"
      />
      <motion.div
        style={{ y: yInverse }}
        className="absolute -right-40 bottom-[-20%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[160px] -z-10"
      />

      <div className="container px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <TypewriterLabel text="Featured Slate" />
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Recent productions that audiences can&apos;t stop streaming.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Filmora keeps your catalogue alive with live metadata, artwork, and availability windows. Watch
              cards cascade in real-time as new projects join the slate.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
                <Link href="/dashboard">
                  Explore dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-white/5 px-8 py-6 text-base text-white hover:bg-white/10"
              >
                <Link href="#search">Browse library</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="hide-scrollbar flex gap-6 overflow-x-auto pb-6"
          >
            {movieColumns.map((column) => (
              <ScrollingColumn key={column.id} column={column} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
