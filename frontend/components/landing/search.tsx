"use client";

import { useMemo, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Search, Sparkle, Film } from "lucide-react";
import { useOmdbSearch } from "@/hooks/use-omdb-search";
import { useDebounce } from "@/hooks/use-debounce";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { OmdbSearchItem } from "@/lib/types";

const curatedSelections: OmdbSearchItem[] = [
  { id: "tt1745960", title: "Top Gun: Maverick", year: 2022, type: "movie", posterUrl: "https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
  { id: "tt0306414", title: "The Wire", year: 2002, type: "series", posterUrl: "https://image.tmdb.org/t/p/w300/wdM3uuXWcbiG0Vagi7Ue3Q3tEWm.jpg" },
  { id: "tt0944947", title: "Game of Thrones", year: 2011, type: "series", posterUrl: "https://image.tmdb.org/t/p/w300/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg" },
  { id: "tt0133093", title: "The Matrix", year: 1999, type: "movie", posterUrl: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: "tt7366338", title: "Chernobyl", year: 2019, type: "series", posterUrl: "https://image.tmdb.org/t/p/w300/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg" },
  { id: "tt2395427", title: "Avengers: Age of Ultron", year: 2015, type: "movie", posterUrl: "https://image.tmdb.org/t/p/w300/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg" },
];

function Poster({ title, posterUrl }: { title: string; posterUrl?: string | null }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!posterUrl || posterUrl === "N/A" || imageError) {
    return (
      <div className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-muted/80 to-muted/50 border border-border/40 backdrop-blur-sm">
        <Film className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/60" strokeWidth={1.5} />
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-lg sm:text-xl font-bold text-primary">
          {title.slice(0, 1).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <img
        src={posterUrl}
        alt={`Poster for ${title}`}
        className="h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

function ResultCard({ item, index = 0 }: { item: OmdbSearchItem; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="h-full touch-manipulation"
      >
        <Card className="overflow-hidden border border-border/60 bg-card/95 backdrop-blur-xl relative group h-full shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Animated gradient border effect */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/0 pointer-events-none"
            animate={{
              borderColor: isHovered ? "hsl(var(--primary) / 0.4)" : "hsl(var(--primary) / 0)",
            }}
            transition={{ duration: 0.3 }}
          />
          
          <CardHeader className="space-y-2 pb-3 sm:pb-4 relative z-10 p-4 sm:p-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="uppercase text-xs px-2 py-0.5">
                  {item.type}
                </Badge>
              </motion.div>
              {item.year ? <span className="text-xs sm:text-sm">{item.year}</span> : null}
            </div>
            <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm line-clamp-2">
              Add to your dashboard with one click.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative p-4 pt-0 sm:p-6 sm:pt-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
            >
              <Poster title={item.title} posterUrl={item.posterUrl} />
            </motion.div>
          </CardContent>
          
          {/* Mobile tap indicator */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="space-y-2 pb-3 sm:pb-4 p-4 sm:p-6">
            <Skeleton className="h-3 w-16 sm:w-24" />
            <Skeleton className="h-4 sm:h-5 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LandingSearch() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const { data, isFetching, isFetched } = useOmdbSearch(debounced, 1);

  const results = useMemo(() => data?.items ?? [], [data]);

  return (
    <section className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl sm:rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card/85 to-card/95 p-6 sm:p-8 md:p-12 shadow-xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Animated background decoration */}
        <motion.div
          className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-80 sm:h-80 bg-primary/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="flex flex-col gap-6 sm:gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2 sm:space-y-3 text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              Search the OMDb catalog instantly
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Import official details, posters, and release information straight into your Filmora dashboard.
            </p>
          </motion.div>
          
          <SignedIn>
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative"
              >
                <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for any movie or series"
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base bg-background/50 backdrop-blur-xl border-border/50 focus:border-primary/50 transition-all touch-manipulation"
                />
              </motion.div>
              
              {isFetching ? (
                <LoadingGrid />
              ) : results.length > 0 ? (
                <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((item, index) => (
                    <ResultCard key={`${item.id}-${item.title}`} item={item} index={index} />
                  ))}
                </div>
              ) : isFetched && !results.length ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-3 sm:gap-4 rounded-xl border border-dashed border-border/60 p-12 sm:p-16 text-center text-muted-foreground bg-background/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkle className="h-7 w-7 sm:h-8 sm:w-8" />
                  </motion.div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-base font-medium">No results just yet</p>
                    <p className="text-xs sm:text-sm">Try another title or adjust your search term.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                  {curatedSelections.map((item, index) => (
                    <ResultCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              )}
            </div>
          </SignedIn>
          
          <SignedOut>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center gap-6 sm:gap-8 rounded-xl border border-dashed border-border/60 p-8 sm:p-12 text-center bg-background/30"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </motion.div>
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl font-semibold">Search powered by OMDb</h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                  Sign in to explore millions of titles and add them to your collection instantly.
                </p>
              </div>
              <SignInButton mode="modal">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Button size="lg" className="gap-2 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg touch-manipulation">
                    Sign in to search
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </SignInButton>
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 w-full">
                {curatedSelections.map((item, index) => (
                  <ResultCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </SignedOut>
        </div>
      </motion.div>
    </section>
  );
}
