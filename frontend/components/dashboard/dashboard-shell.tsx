"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, SlidersHorizontal, Menu, X, LogOut, ChevronRight } from "lucide-react";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AdvancedThemeToggle } from "@/components/advanced-theme-toggle";

interface DashboardShellProps {
  children: ReactNode;
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Film },
  { href: "/dashboard/preferences", label: "Preferences", icon: SlidersHorizontal },
];

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const Sidebar = (
    <div className="flex h-full flex-col justify-between gap-6 p-4 sm:p-6">
      <div className="space-y-6 sm:space-y-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
          onClick={() => setIsMobileOpen(false)}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-primary/20">
            F
          </span>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Filmora</span>
        </Link>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground active:scale-[0.98]",
                )}
              >
                {active && (
                  <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary" />
                )}
                <span className="flex items-center gap-3">
                  <Icon className={cn("h-4 w-4 transition-transform", active && "scale-110")} />
                  {label}
                </span>
                <ChevronRight 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200", 
                    active ? "rotate-90 text-primary" : "text-muted-foreground/50 group-hover:translate-x-0.5"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="space-y-3 border-t border-border/50 pt-4">
        <SignedIn>
          <SignOutButton redirectUrl="/">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden w-[var(--sidebar-width)] border-r border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 lg:flex">
        {Sidebar}
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sm:px-6">
          {/* Mobile: Menu + Logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-primary/10"
              onClick={() => setIsMobileOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? (
                <X className="h-5 w-5 transition-transform duration-200" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-200" />
              )}
            </Button>
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold sm:text-base">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-primary/20 sm:h-8 sm:w-8">
                F
              </span>
              <span className="hidden xs:inline">Filmora</span>
            </Link>
          </div>

          {/* Desktop: Page Title */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <h1 className="text-lg font-semibold capitalize tracking-tight">
              {navItems.find(({ href }) => pathname.startsWith(href))?.label ?? "Dashboard"}
            </h1>
          </div>

          {/* Right: Theme + User */}
          <div className="flex items-center gap-1 sm:gap-2">
            <AdvancedThemeToggle variant="full" align="end" />
            <UserButton 
              appearance={{ 
                elements: { 
                  avatarBox: "h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background" 
                } 
              }} 
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div 
            className="absolute left-0 top-0 h-full w-[min(85vw,320px)] border-r border-border/40 bg-background/95 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 transition-transform duration-300 ease-out"
          >
            {Sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
