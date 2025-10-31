"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Film, Palette, ShieldCheck, Sparkles, Zap, Globe } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Film,
    title: "Your cinematic hub",
    description:
      "Organize every movie and series with cast, posters, and release data pulled directly from OMDb.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Adaptive themes",
    description:
      "Switch between light, dark, or custom accent palettes and sync your preferences across devices.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description: "Clerk authentication, granular permissions, and ImageKit file storage keep your media pristine.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Smart discovery",
    description: "AI-powered recommendations help you find your next favorite film based on your taste.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description: "Optimized performance with instant search, seamless scrolling, and rapid data synchronization.",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Global library",
    description: "Access millions of titles from around the world with multi-language support and regional content.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ opacity }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="h-full touch-manipulation"
      >
        <Card className="relative overflow-hidden border border-border/40 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl h-full group shadow-md hover:shadow-xl transition-all duration-500 will-change-transform">
          {/* Animated gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500`}
          />
          
          {/* Shimmer effect - Desktop only */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 hidden md:block pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          {/* Border glow effect - Desktop only */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 hidden md:block">
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-lg opacity-50`} />
          </div>

          <CardHeader className="space-y-4 sm:space-y-5 relative z-10 p-6 sm:p-8">
            {/* Icon container */}
            <motion.div
              className="relative w-fit"
              whileHover={{ scale: 1.08, rotate: [0, -8, 8, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg relative overflow-hidden`}>
                {/* Icon glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-sm opacity-40`} />
                <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 relative z-10 drop-shadow-md" strokeWidth={2.5} />
              </div>
              {/* Floating ring - Desktop only */}
              <motion.div
                className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-current opacity-0 md:opacity-20 hidden md:block`}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: `hsl(var(--primary))` }}
              />
            </motion.div>

            <div className="space-y-2 sm:space-y-3">
              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight transition-colors duration-300">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300">
                {feature.description}
              </CardDescription>
            </div>
          </CardHeader>

          {/* Corner accent - Desktop only */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block pointer-events-none">
            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-xl transform translate-x-6 -translate-y-6`} />
          </div>

          {/* Bottom gradient line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Mobile tap indicator */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function FeatureCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="features" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[300px] sm:h-[400px] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-[80px] sm:blur-[100px] -z-10"
      />

      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Powerful Features
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto px-4"
          >
            Everything you need to manage, discover, and enjoy your movie collection with style
          </motion.p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
