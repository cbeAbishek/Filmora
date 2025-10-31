"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, LogIn } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { AdvancedThemeToggle } from "@/components/advanced-theme-toggle";

interface NavigationLink {
  href: string;
  label: string;
}

const links: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/#showcase", label: "Showcase" },
  { href: "/#features", label: "Features" },
  { href: "/#search", label: "Search" },
];

export function LandingNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveRoute = useMemo(
    () =>
      (href: string) => {
        if (href === "/") {
          return pathname === "/";
        }

        if (href.startsWith("/#")) {
          return pathname === "/";
        }

        return pathname?.startsWith(href);
      },
    [pathname],
  );

  return (
    <nav className={`fixed left-0 right-0 top-4 z-50 transition-all duration-300 ${isScrolled ? "translate-y-[-0.5rem]" : ""}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-xl border border-border/60 bg-background/90 backdrop-blur-sm shadow-md transition-shadow duration-300 ${
            isScrolled ? "shadow-lg" : ""
          }`}
        >
          <div className="flex items-center justify-between px-6 py-3 sm:px-8 sm:py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-muted sm:h-12 sm:w-12">
                <Image src="/logo.svg" alt="Filmora logo" fill className="object-contain" priority />
              </span>
              <span className="text-xl font-semibold text-foreground sm:text-2xl">Filmora</span>
            </Link>

            <div className="hidden items-center space-x-2 md:flex">
              {links.map((link) => {
                const active = isActiveRoute(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 lg:px-4 lg:text-base ${
                      active 
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20" 
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold lg:px-6 lg:text-base">
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button asChild className="rounded-full px-5 py-2 text-sm font-semibold lg:px-6 lg:text-base">
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </SignedIn>
              
              {/* Desktop Theme Toggle with Color Picker */}
              <AdvancedThemeToggle variant="full" align="end" />
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative h-6 w-6">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-border/60 bg-background/95">
              <div className="space-y-3 px-6 py-6 pb-8">
                {links.map((link, index) => {
                  const active = isActiveRoute(link.href);
                  return (
                    <div
                      key={link.href}
                      className={`transition-transform duration-300 ${
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                    >
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-5 py-3 text-base font-semibold transition-all duration-200 ${
                          active
                            ? "bg-primary/10 text-primary border border-primary/20 ring-1 ring-primary/10"
                            : "border border-transparent text-foreground/80 hover:border-border hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                })}

                <div
                  className="transition-transform duration-300"
                  style={{ transitionDelay: isMobileMenuOpen ? `${links.length * 50}ms` : "0ms" }}
                >
                  <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                      <Button
                        className="mt-2 w-full rounded-full px-6 py-3 text-base font-semibold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <LogIn className="h-5 w-5" />
                          Log in
                        </div>
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Button asChild className="mt-2 w-full rounded-full px-6 py-3 text-base font-semibold">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        Go to dashboard
                      </Link>
                    </Button>
                  </SignedIn>
                  
                  {/* Mobile Theme Toggle with Color Picker */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground px-2 mb-3">Appearance</p>
                    <div className="rounded-lg border border-border/60 p-3 bg-muted/30">
                      <AdvancedThemeToggle variant="full" align="center" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavigation;

