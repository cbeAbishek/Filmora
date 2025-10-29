"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Laptop, Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePreferences } from "@/hooks/use-preferences";
import type { PreferenceSchema } from "@/lib/validation";

const themes = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
  { value: "sunset", label: "Sunset", icon: SunMedium },
  { value: "lagoon", label: "Lagoon", icon: Moon },
];

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { mutation, query, isSignedIn } = usePreferences();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const active = themes.find((t) => t.value === theme) ?? themes[0];
  const ActiveIcon = active.icon;

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <ActiveIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((item) => {
          const ItemIcon = item.icon;
          const isActive = currentTheme === item.value;
          return (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => {
                setTheme(item.value);
                if (!isSignedIn) return;
                if (query.data?.theme === item.value) return;
                const payload: PreferenceSchema = {
                  theme: item.value as PreferenceSchema["theme"],
                  accentColor: query.data?.accentColor ?? null,
                };
                mutation.mutate(payload);
              }}
              className={isActive ? "bg-accent/60" : undefined}
              disabled={mutation.isPending}
            >
              <ItemIcon className="mr-2 h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
