"use client";

import { motion } from "framer-motion";
import { Film, Github, Twitter, Mail, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/cbeAbishek/Filmora", label: "GitHub" },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Showcase", href: "/#showcase" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Search Movies", href: "/#search" },
      { label: "Documentation", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function CinematicFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      <div className="container relative z-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Main content grid */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand section - Mobile: full width, Desktop: 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6 lg:col-span-5"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
                <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 5.6, type: "spring" }}
                className="flex h-11 w-11 sm:h-20 sm:w-20 items-center justify-center to-accent shadow-lg shadow-primary/25 p-2"
                >
                <img
                  src="/logo.png"
                  alt="Filmora logo"
                  className="h-25 w-25 sm:h-20 sm:w-20 object-contain"
                />
                </motion.div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-primary">
                Filmora
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Your personal cinematic universe. Organize, discover, and enjoy every movie and series you love with powerful tools and beautiful design.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links sections - Mobile: single column, Tablet: 3 columns, Desktop: 7 columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:col-span-7 lg:gap-12">
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-4 sm:space-y-5"
              >
                <h3 className="text-sm font-semibold tracking-wide text-foreground sm:text-base">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <motion.span 
                          whileHover={{ x: 3 }} 
                          className="block transition-transform"
                        >
                          {link.label}
                        </motion.span>
                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/40"
        >
          {/* Mobile: Stack vertically, Desktop: Flex row */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span>© 2025 Filmora. Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 fill-current" />
                </motion.span>
                <span>for movie lovers</span>
              </p>
              <p className="text-xs text-muted-foreground/80 text-center sm:text-left">
                Developed by{" "}
                <a 
                  href="https://abi-portfoilio.vercel.app/" 
                  className="font-medium text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
                >
                  Abishek
                </a>
              </p>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <Link 
                href="#" 
                className="hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <span className="text-border">•</span>
              <Link 
                href="#" 
                className="hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
              <span className="text-border">•</span>
              <Link 
                href="#" 
                className="hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
