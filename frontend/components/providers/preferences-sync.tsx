"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePreferences } from "@/hooks/use-preferences";
import { hexToHsl } from "@/lib/color";

export function PreferencesSync() {
  const { query } = usePreferences();
  const { setTheme } = useTheme();
  const defaultsRef = useRef<{ accent: string; foreground: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!defaultsRef.current) {
      const computed = getComputedStyle(document.documentElement);
      defaultsRef.current = {
        accent: computed.getPropertyValue("--accent").trim(),
        foreground: computed.getPropertyValue("--accent-foreground").trim(),
      };
    }
  }, []);

  useEffect(() => {
    const theme = query.data?.theme;
    if (!theme) return;
    setTheme(theme);
  }, [query.data?.theme, setTheme]);

  useEffect(() => {
    if (typeof window === "undefined" || !defaultsRef.current) return;
    const root = document.documentElement;
    const accentColor = query.data?.accentColor;
    if (accentColor) {
      const { accent, foreground } = hexToHsl(accentColor);
      root.style.setProperty("--accent", accent);
      root.style.setProperty("--accent-foreground", foreground);
    } else {
      root.style.setProperty("--accent", defaultsRef.current.accent);
      root.style.setProperty("--accent-foreground", defaultsRef.current.foreground);
    }
  }, [query.data?.accentColor]);

  return null;
}
