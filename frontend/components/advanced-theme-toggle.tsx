"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/hooks/use-preferences";
import { toast } from "sonner";

const ACCENT_COLORS = [
  { name: "Violet", value: "#8B5CF6", hsl: "262 83% 57%" },
  { name: "Blue", value: "#3B82F6", hsl: "221 83% 53%" },
  { name: "Cyan", value: "#06B6D4", hsl: "189 94% 43%" },
  { name: "Emerald", value: "#10B981", hsl: "160 84% 39%" },
  { name: "Orange", value: "#F97316", hsl: "25 95% 53%" },
  { name: "Rose", value: "#F43F5E", hsl: "350 89% 60%" },
  { name: "Pink", value: "#EC4899", hsl: "330 81% 60%" },
  { name: "Amber", value: "#F59E0B", hsl: "38 92% 50%" },
];

interface AdvancedThemeToggleProps {
  variant?: "full" | "compact";
  align?: "start" | "center" | "end";
}

export function AdvancedThemeToggle({ variant = "full", align = "end" }: AdvancedThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { query, mutation, isSignedIn } = usePreferences();
  const [mounted, setMounted] = useState(false);
  const [currentAccent, setCurrentAccent] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query.data?.accentColor) {
      setCurrentAccent(query.data.accentColor);
      applyAccentColor(query.data.accentColor);
    }
  }, [query.data]);

  const applyAccentColor = (color: string) => {
    // Convert hex to HSL
    const hslColor = hexToHsl(color);
    if (hslColor) {
      document.documentElement.style.setProperty("--primary", hslColor);
      
      // Adjust for dark mode
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        // Lighter shade for dark mode
        const lightHsl = hslColor.replace(/(\d+)%\)$/, (_, p1) => `${Math.min(parseInt(p1) + 20, 95)}%)`);
        document.documentElement.style.setProperty("--primary", lightHsl);
      }
    }
  };

  const hexToHsl = (hex: string): string | null => {
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
  };

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme);
    
    if (isSignedIn) {
      try {
        await mutation.mutateAsync({
          theme: newTheme as "light" | "dark" | "system",
          accentColor: currentAccent,
        });
      } catch (error) {
        console.error("Failed to save theme:", error);
      }
    }
  };

  const handleAccentChange = async (color: string) => {
    setCurrentAccent(color);
    applyAccentColor(color);
    
    if (isSignedIn) {
      try {
        await mutation.mutateAsync({
          theme: (theme as "light" | "dark" | "system") || "system",
          accentColor: color,
        });
        toast.success("Accent color updated!");
      } catch (error) {
        toast.error("Failed to save accent color");
        console.error("Failed to save accent color:", error);
      }
    } else {
      toast.info("Sign in to save your preferences");
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const themeIcon =
    theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    );

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            {themeIcon}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuItem onClick={() => handleThemeChange("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          {themeIcon}
          {currentAccent && (
            <span
              className="absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-background"
              style={{ backgroundColor: currentAccent }}
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
          {theme === "system" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Accent Color
        </DropdownMenuLabel>
        <div className="grid grid-cols-4 gap-2 p-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => handleAccentChange(color.value)}
              className={cn(
                "group relative h-8 w-8 rounded-md transition-all hover:scale-110 active:scale-95",
                currentAccent === color.value && "ring-2 ring-offset-2 ring-offset-background ring-primary"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {currentAccent === color.value && (
                <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-lg" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
