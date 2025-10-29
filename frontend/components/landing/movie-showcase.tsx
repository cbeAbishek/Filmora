"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
        image: "https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?w=600&h=900&fit=crop",
      },
      {
        id: "neon-dancer",
        title: "Neon Dancer",
        status: "Festival highlight",
        tag: "Drama",
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=600&h=900&fit=crop",
      },
      {
        id: "starlight",
        title: "Starlight Echoes",
        status: "In theatres",
        tag: "Adventure",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=900&fit=crop",
      },
      {
        id: "afterglow",
        title: "Afterglow City",
        status: "Director's cut",
        tag: "Thriller",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=900&fit=crop",
      },
      {
        id: "nocturne",
        title: "Nocturne Tide",
        status: "Limited release",
        tag: "Mystery",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=900&fit=crop",
      },
      {
        id: "starbound",
        title: "Starbound",
        status: "Coming soon",
        tag: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=900&fit=crop",
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
        image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=600&h=900&fit=crop",
      },
      {
        id: "velvet-horizon",
        title: "Velvet Horizon",
        status: "In production",
        tag: "Romance",
        image: "https://images.unsplash.com/photo-1581905764498-5d1ed0c5089d?w=600&h=900&fit=crop",
      },
      {
        id: "aurora-run",
        title: "Aurora Run",
        status: "New acquisition",
        tag: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1430122030412-8e122edcc2c1?w=600&h=900&fit=crop",
      },
      {
        id: "solstice",
        title: "Solstice",
        status: "In theatres",
        tag: "Drama",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=900&fit=crop",
      },
      {
        id: "skyline-pulse",
        title: "Skyline Pulse",
        status: "Award contender",
        tag: "Action",
        image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=900&fit=crop",
      },
      {
        id: "silent-frame",
        title: "Silent Frame",
        status: "Coming soon",
        tag: "Documentary",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85d?w=600&h=900&fit=crop",
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
        image: "https://images.unsplash.com/photo-1515191107209-c28698631303?w=600&h=900&fit=crop",
      },
      {
        id: "prism",
        title: "Prism",
        status: "In festivals",
        tag: "Drama",
        image: "https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=600&h=900&fit=crop",
      },
      {
        id: "luminous",
        title: "Luminous",
        status: "Now streaming",
        tag: "Thriller",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=900&fit=crop",
      },
      {
        id: "drift",
        title: "Drift",
        status: "Editor's pick",
        tag: "Adventure",
        image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&h=900&fit=crop",
      },
      {
        id: "emberfall",
        title: "Emberfall",
        status: "In theatres",
        tag: "Action",
        image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=600&h=900&fit=crop",
      },
      {
        id: "chromatic-tide",
        title: "Chromatic Tide",
        status: "Coming soon",
        tag: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1513135065346-a098c7404a09?w=600&h=900&fit=crop",
      },
    ],
  },
  {
    id: "column-d",
    direction: "down",
    speed: 54,
    movies: [
      {
        id: "parallel-lines",
        title: "Parallel Lines",
        status: "Now streaming",
        tag: "Mystery",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=900&fit=crop",
      },
      {
        id: "celestial",
        title: "Celestial",
        status: "Global premiere",
        tag: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=900&fit=crop",
      },
      {
        id: "neon-harvest",
        title: "Neon Harvest",
        status: "Festival darling",
        tag: "Drama",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&h=900&fit=crop",
      },
      {
        id: "golden-hour",
        title: "Golden Hour",
        status: "In theatres",
        tag: "Romance",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
      },
      {
        id: "polaris",
        title: "Polaris",
        status: "Coming soon",
        tag: "Adventure",
        image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&h=900&fit=crop",
      },
      {
        id: "midnight-atlas",
        title: "Midnight Atlas",
        status: "Editor's pick",
        tag: "Thriller",
        image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop",
      },
    ],
  },
];

function ShowcaseCard({ movie }: { movie: ShowcaseMovie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative h-[320px] w-full overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.12] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
    >
      <img src={movie.image} alt={movie.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
          <span>{movie.status}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-white drop-shadow-lg">
          {movie.title}
        </h3>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
          {movie.tag}
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-accent/40 mix-blend-screen" />
      </div>
    </motion.div>
  );
}

function ScrollingColumn({
  column,
}: {
  column: (typeof movieColumns)[number];
}) {
  return (
    <div
      className="relative flex shrink-0 basis-1/2 flex-col overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl sm:basis-1/3 lg:basis-auto min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px] lg:min-w-[260px] lg:w-[260px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex flex-col gap-4"
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

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
              Featured Slate
            </div>
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
            className="flex gap-6 overflow-x-auto pb-6"
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
