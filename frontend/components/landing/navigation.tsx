"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AlertCircle, Check, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NavigationLink {
  href: string;
  label: string;
}

const links: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/#showcase", label: "Showcase" },
  { href: "/#features", label: "Features" },
  { href: "/#search", label: "Search" },
  { href: "/dashboard", label: "Dashboard" },
];

interface WaitlistPayload {
  email: string;
  fullName: string;
  userType: string;
  district: string;
  phone: string;
  message: string;
  source: string;
}

export function LandingNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistUserType, setWaitlistUserType] = useState("advertiser");
  const [waitlistDistrict, setWaitlistDistrict] = useState("");
  const [waitlistPhone, setWaitlistPhone] = useState("");
  const [waitlistNote, setWaitlistNote] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState("");
  const [waitlistError, setWaitlistError] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => event.preventDefault();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key)) ||
        (event.ctrlKey && event.key.toLowerCase() === "u")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isActiveRoute = useMemo(() => (
    href: string,
  ) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/#")) {
      return pathname === "/";
    }

    return pathname?.startsWith(href);
  }, [pathname]);

  const handleJoinWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitlistError("");
    setWaitlistSuccess("");
    setWaitlistLoading(true);

    const payload: WaitlistPayload = {
      email: waitlistEmail,
      fullName: waitlistName,
      userType: waitlistUserType,
      district: waitlistDistrict,
      phone: waitlistPhone,
      message: waitlistNote,
      source: "navigation_modal",
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 409) {
          setWaitlistError("This email is already on our priority list. Try a different address.");
        } else {
          setWaitlistError((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        }
      } else {
        setWaitlistSuccess("🎉 You are on the priority list! We will keep you updated.");
        setWaitlistEmail("");
        setWaitlistName("");
        setWaitlistUserType("advertiser");
        setWaitlistDistrict("");
        setWaitlistPhone("");
        setWaitlistNote("");
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.error("Waitlist error", error);
      setWaitlistError("We could not reach the server. Please check your connection.");
    } finally {
      setWaitlistLoading(false);
    }
  };

  return (
    <nav className={`fixed left-0 right-0 top-6 z-50 transition-all duration-500 ${isScrolled ? "top-4" : ""}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? "border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl shadow-cyan-400/20"
              : "border-white/10 bg-black/60 backdrop-blur-md shadow-lg"
          }`}
        >
          <div className="relative flex items-center justify-between px-6 py-3 sm:px-8 sm:py-4 lg:px-10">
            <Link href="/" className="group relative z-10 flex items-center space-x-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/40 to-purple-500/40 sm:h-12 sm:w-12">
                <Image
                  src="/logo.svg"
                  alt="Filmora logo"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </span>
              <span className="text-gradient text-xl font-bold transition-transform duration-300 group-hover:scale-105 sm:text-2xl">
                Filmora
              </span>
            </Link>

            <div className="relative z-10 hidden items-center space-x-1 md:flex lg:space-x-2">
              {links.map((link) => {
                const active = isActiveRoute(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative rounded-[5px] px-3 py-2 text-sm font-medium transition-all duration-300 lg:px-4 lg:text-base ${
                      active
                        ? "text-white"
                        : "text-foreground/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {active ? (
                      <span className="absolute inset-0 rounded-[5px] bg-gradient-to-r from-cyan-400/20 to-purple-500/20" />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                    <span
                      className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="relative z-10 hidden md:block">
              <Button
                onClick={() => setShowWaitlistModal(true)}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 lg:px-6 lg:text-base"
              >
                <span className="relative z-10">Join Waitlist</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative z-10 rounded-lg p-2 text-foreground transition-all duration-300 hover:bg-white/10 md:hidden"
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
            className={`md:hidden transition-all ${
              isMobileMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-white/10 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm">
              <div className="space-y-3 px-6 py-6 pb-8">
                {links.map((link, index) => {
                  const active = isActiveRoute(link.href);
                  return (
                    <div
                      key={link.href}
                      className={`transform transition-all duration-500 ${
                        isMobileMenuOpen
                          ? "translate-y-0 scale-100 opacity-100"
                          : "translate-y-8 scale-95 opacity-0"
                      }`}
                      style={{ transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : "0ms" }}
                    >
                      <Link
                        href={link.href}
                        className={`block rounded-full px-5 py-3.5 transition-all duration-300 ${
                          active
                            ? "border border-white/20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-white shadow-lg shadow-cyan-400/20"
                            : "border border-transparent text-foreground/80 hover:border-white/10 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium">{link.label}</span>
                          {active ? <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" /> : null}
                        </div>
                      </Link>
                    </div>
                  );
                })}

                <div className="transform transition-all duration-500" style={{ transitionDelay: isMobileMenuOpen ? `${links.length * 60}ms` : "0ms" }}>
                  <Button
                    onClick={() => {
                      setShowWaitlistModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3.5 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWaitlistModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-br from-black/90 to-black/80 p-8 shadow-2xl shadow-cyan-400/20">
            <button
              type="button"
              onClick={() => {
                setShowWaitlistModal(false);
                setWaitlistError("");
                setWaitlistSuccess("");
              }}
              className="absolute right-4 top-4 rounded-lg p-2 transition-all duration-300 hover:bg-white/10"
              aria-label="Close waitlist"
            >
              <X className="h-5 w-5 text-white/80" />
            </button>

            <div className="mb-6">
              <div className="mb-3 flex items-center space-x-2">
                <Mail className="h-6 w-6 text-cyan-400" />
                <h2 className="text-gradient text-2xl font-bold">Join Waitlist</h2>
              </div>
              <p className="text-sm text-white/70">
                Be among the first to explore the next evolution of Filmora. Share your details and we will keep you in the loop.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleJoinWaitlist}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={waitlistName}
                  onChange={(event) => setWaitlistName(event.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50"
                  disabled={waitlistLoading}
                  required
                />
                <select
                  value={waitlistUserType}
                  onChange={(event) => setWaitlistUserType(event.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  disabled={waitlistLoading}
                >
                  <option value="advertiser" className="text-black">
                    Advertiser
                  </option>
                  <option value="mediator" className="text-black">
                    Media Partner
                  </option>
                  <option value="designer" className="text-black">
                    Designer
                  </option>
                  <option value="ad_space_owner" className="text-black">
                    Ad Space Owner
                  </option>
                  <option value="enthusiast" className="text-black">
                    Startup Enthusiast
                  </option>
                </select>
              </div>

              <Input
                type="email"
                placeholder="Email address"
                value={waitlistEmail}
                onChange={(event) => setWaitlistEmail(event.target.value)}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50"
                disabled={waitlistLoading}
                required
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  type="text"
                  placeholder="Your district"
                  value={waitlistDistrict}
                  onChange={(event) => setWaitlistDistrict(event.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50"
                  disabled={waitlistLoading}
                />
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={waitlistPhone}
                  onChange={(event) => setWaitlistPhone(event.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50"
                  disabled={waitlistLoading}
                />
              </div>

              <Textarea
                placeholder="Tell us what support you need (optional)"
                value={waitlistNote}
                onChange={(event) => setWaitlistNote(event.target.value)}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50"
                rows={3}
                disabled={waitlistLoading}
              />

              {waitlistError ? (
                <div className="flex items-center space-x-2 rounded-lg border border-red-500/50 bg-red-500/20 p-3">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-red-100">{waitlistError}</p>
                </div>
              ) : null}

              {waitlistSuccess ? (
                <div className="flex items-center space-x-2 rounded-lg border border-emerald-500/50 bg-emerald-500/20 p-3">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm text-emerald-100">{waitlistSuccess}</p>
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={waitlistLoading}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 disabled:opacity-50"
              >
                {waitlistLoading ? "Joining..." : "Join Waitlist"}
              </Button>

              <p className="text-center text-xs text-white/50">We respect your privacy and will only email about Filmora launches.</p>
            </form>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default LandingNavigation;
