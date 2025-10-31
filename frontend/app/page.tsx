"use client";

import { useState } from "react";
import { LandingNavigation } from "@/components/landing/navigation";
import { AnimatedHero } from "@/components/landing/animated-hero";
import { MovieShowcase } from "@/components/landing/movie-showcase";
import { FeatureCards } from "@/components/landing/feature-cards";
import { FloatingElements } from "@/components/landing/floating-elements";
import { LandingSearch } from "@/components/landing/search";
import { CinematicFooter } from "@/components/landing/cinematic-footer";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { MovieLoader, BackgroundMusic } from "@/components/landing/movie-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <MovieLoader onLoadComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <BackgroundMusic />
          <div className="relative isolate overflow-hidden">
            <LandingNavigation />
            <ScrollProgress />
            <FloatingElements />
            <div className="relative">
              <AnimatedHero />
              <MovieShowcase />
              <FeatureCards />
              <section id="search" className="container py-24">
                <LandingSearch />
              </section>
              <CinematicFooter />
            </div>
          </div>
        </>
      )}
    </>
  );
}
