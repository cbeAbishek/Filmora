"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, SlidersHorizontal, Menu, X, LogOut, ChevronRight } from "lucide-react";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <div className="flex h-full flex-col justify-between gap-6 p-6">
      <div className="space-y-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">F</span>
          <span>Filmora</span>
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
                  "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <ChevronRight className={cn("h-4 w-4 transition-transform", active ? "rotate-90 text-primary" : "text-muted-foreground")}
                />
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="space-y-3">
        <SignedIn>
          <SignOutButton redirectUrl="/">
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-[var(--sidebar-width)] border-r border-border/60 bg-background lg:flex">
        {Sidebar}
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setIsMobileOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="text-base font-semibold">
              Filmora
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <h1 className="text-lg font-semibold capitalize">
              {navItems.find(({ href }) => pathname.startsWith(href))?.label ?? "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="h-full w-[min(80vw,320px)] border-r border-border/60 bg-background shadow-xl">
            {Sidebar}
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            className="flex-1 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
