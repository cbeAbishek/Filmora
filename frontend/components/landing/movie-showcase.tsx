"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Play, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Movie {
  id: number;
  title: string;
  year: string;
  rating: number;
  genre: string;
  image: string;
  description: string;
}

const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: "2010",
    rating: 8.8,
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    description: "A thief who steals corporate secrets through dream-sharing technology",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: "2008",
    rating: 9.0,
    genre: "Action",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    description: "Batman faces the Joker in this epic crime thriller",
  },
  {
    id: 3,
    title: "Interstellar",
    year: "2014",
    rating: 8.6,
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    description: "A team of explorers travel through a wormhole in space",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: "1994",
    rating: 8.9,
    genre: "Crime",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    description: "Interwoven stories of Los Angeles criminals and misfits",
  },
];

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl">
          {/* Movie poster with 3D tilt effect */}
          <motion.div
            className="relative h-96 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
              animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            />
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
              >
                <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                  <Play className="h-6 w-6" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.15 }}
              >
                <Button size="icon" variant="secondary" className="rounded-full h-14 w-14 shadow-lg">
                  <Info className="h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              className="absolute top-4 right-4 z-20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Badge className="gap-1 px-3 py-1.5 bg-yellow-500/90 text-black backdrop-blur-md">
                <Star className="h-3 w-3 fill-current" />
                {movie.rating}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Movie info */}
          <motion.div
            className="p-6 space-y-3"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-xl line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {movie.genre}
              </Badge>
            </div>
            <motion.p
              className="text-sm text-muted-foreground line-clamp-2"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {movie.description}
            </motion.p>
          </motion.div>

          {/* Animated border effect */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/0 pointer-events-none"
            animate={{
              borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function MovieShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10"
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Interactive Showcase
            </Badge>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover over cards to reveal interactive controls and immersive details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
