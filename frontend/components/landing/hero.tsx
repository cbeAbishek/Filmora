"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featureBadges = [
  { label: "Infinite Library", icon: Sparkles },
  { label: "Smart Imports", icon: Wand2 },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-background to-background/60 p-12 shadow-lg">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))/0.25,_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {featureBadges.map(({ label, icon: Icon }) => (
            <Badge key={label} variant="secondary" className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </Badge>
          ))}
        </div>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Manage every movie you love and discover what to watch next.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Filmora centralizes your favourite films and series with rich metadata, smart search through OMDb, and customizable viewing themes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <SignedIn>
            <Button asChild size="lg" className="gap-2">
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="gap-2">
                Sign in to start
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <Button variant="ghost" asChild>
            <Link href="#features">View features</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
