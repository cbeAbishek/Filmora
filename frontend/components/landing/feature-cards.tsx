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

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ opacity }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl h-full group">
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />
          
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom right, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))`,
              filter: "blur(20px)",
              zIndex: -1,
            }}
          />

          <CardHeader className="space-y-4 relative z-10">
            {/* Icon with 3D effect */}
            <motion.div
              className="relative"
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                <feature.icon className="h-7 w-7" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </div>
          </CardHeader>

          {/* Hover particles effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/50 rounded-full"
                initial={{ x: "50%", y: "50%" }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
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
    <section ref={containerRef} id="features" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-[100px] -z-10"
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage, discover, and enjoy your movie collection with style
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
