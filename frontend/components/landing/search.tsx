"use client";

import { useMemo, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Search, Sparkle } from "lucide-react";
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
  if (!posterUrl || posterUrl === "N/A") {
    return (
      <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        {title.slice(0, 1).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className="aspect-[2/3] w-full rounded-lg bg-cover bg-center shadow-inner"
      style={{ backgroundImage: `url(${posterUrl})` }}
      aria-label={`Poster for ${title}`}
    />
  );
}

function ResultCard({ item, index = 0 }: { item: OmdbSearchItem; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden border-border/80 bg-card/90 backdrop-blur-xl relative group">
          {/* Animated gradient border effect */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/0 pointer-events-none"
            animate={{
              borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0)",
            }}
            transition={{ duration: 0.3 }}
          />
          
          <CardHeader className="space-y-2 pb-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="uppercase">{item.type}</Badge>
              </motion.div>
              {item.year ? <span>{item.year}</span> : null}
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {item.title}
            </CardTitle>
            <CardDescription>Add to your dashboard with one click.</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Poster title={item.title} posterUrl={item.posterUrl} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="space-y-2 pb-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </CardHeader>
          <CardContent>
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
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-border/50 bg-gradient-to-br from-card/90 via-card/80 to-card/90 p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Animated background decoration */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="flex flex-col gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Search the OMDb catalog instantly
            </h2>
            <p className="text-muted-foreground text-lg">
              Import official details, posters, and release information straight into your Filmora dashboard.
            </p>
          </motion.div>
          
          <SignedIn>
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for any movie or series"
                  className="pl-12 h-14 text-base bg-background/50 backdrop-blur-xl border-border/50 focus:border-primary/50 transition-all"
                />
              </motion.div>
              
              {isFetching ? (
                <LoadingGrid />
              ) : results.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((item, index) => (
                    <ResultCard key={`${item.id}-${item.title}`} item={item} index={index} />
                  ))}
                </div>
              ) : isFetched && !results.length ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 p-16 text-center text-muted-foreground bg-background/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkle className="h-8 w-8" />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-base font-medium">No results just yet</p>
                    <p className="text-sm">Try another title or adjust your search term.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {curatedSelections.map((item, index) => (
                    <ResultCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              )}
            </div>
          </SignedIn>
          
          <SignedOut>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-8 rounded-xl border border-dashed border-border/60 p-12 text-center bg-background/30"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkle className="h-10 w-10 text-primary" />
              </motion.div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Search powered by OMDb</h3>
                <p className="text-base text-muted-foreground max-w-md">
                  Sign in to explore millions of titles and add them to your collection instantly.
                </p>
              </div>
              <SignInButton mode="modal">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2 px-8 py-6 text-base shadow-lg">
                    Sign in to search
                    <Search className="h-5 w-5" />
                  </Button>
                </motion.div>
              </SignInButton>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
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
