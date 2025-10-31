"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePreferences } from "@/hooks/use-preferences";

export function PreferencesSync() {
  const { query } = usePreferences();
  const { setTheme } = useTheme();
  const defaultPrimaryRef = useRef<string | null>(null);

  // Store default primary color on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!defaultPrimaryRef.current) {
      const computed = getComputedStyle(document.documentElement);
      defaultPrimaryRef.current = computed.getPropertyValue("--primary").trim();
    }
  }, []);

  // Sync theme mode from database
  useEffect(() => {
    const theme = query.data?.theme;
    if (!theme) return;
    setTheme(theme);
  }, [query.data?.theme, setTheme]);

  // Sync accent/primary color from database
  useEffect(() => {
    if (typeof window === "undefined" || !defaultPrimaryRef.current) return;
    const root = document.documentElement;
    const accentColor = query.data?.accentColor;
    
    if (accentColor) {
      // Convert hex to HSL and apply
      const hslColor = hexToHsl(accentColor);
      if (hslColor) {
        root.style.setProperty("--primary", hslColor);
        
        // Adjust for dark mode
        const isDark = root.classList.contains("dark");
        if (isDark) {
          // Lighter shade for dark mode
          const lightHsl = hslColor.replace(/(\d+)%\)$/, (_, p1) => `${Math.min(parseInt(p1) + 20, 95)}%)`);
          root.style.setProperty("--primary", lightHsl);
        }
      }
    } else {
      // Restore default
      root.style.setProperty("--primary", defaultPrimaryRef.current);
    }
  }, [query.data?.accentColor]);

  return null;
}

function hexToHsl(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

