"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePreferences } from "@/hooks/use-preferences";
import { preferenceSchema, type PreferenceSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const themeOptions: Array<{ value: PreferenceSchema["theme"]; label: string; description: string }> = [
  { value: "system", label: "System", description: "Match your device preference." },
  { value: "light", label: "Light", description: "Bright interface great for daytime." },
  { value: "dark", label: "Dark", description: "Cinematic look for late-night browsing." },
];

export function PreferencesView() {
  const form = useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      theme: "system",
      accentColor: null,
    },
  });

  const { query, mutation } = usePreferences();

  useEffect(() => {
    if (query.data) {
      form.reset({
        theme: query.data.theme as PreferenceSchema["theme"],
        accentColor: query.data.accentColor,
      });
    }
  }, [query.data, form]);

  const onSubmit = async (values: PreferenceSchema) => {
    try {
      await mutation.mutateAsync({
        theme: values.theme,
        accentColor: values.accentColor ?? null,
      });
      toast.success("Preferences saved");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save preferences";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Preferences</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Choose how Filmora looks and feels across sessions. Your theme and accent color are saved to your account.
        </p>
      </div>

      {/* Info Card */}
      <Card className="max-w-3xl border-primary/20 bg-primary/5">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">Quick Theme Access</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                You can also change your theme and accent color from the theme toggle button in the header. 
                Click the theme icon to see all options with a color picker. Changes are saved automatically.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-3xl shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl">Theme & Colors</CardTitle>
          <CardDescription className="text-sm">Pick a base theme and optional accent color to personalize the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {query.isLoading ? (
            <div className="space-y-5 sm:space-y-6">
              <Skeleton className="h-20 sm:h-24 w-full" />
              <Skeleton className="h-12 sm:h-14 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
                
                {/* Mobile: Grid Cards */}
                <div className="grid grid-cols-1 gap-2 sm:hidden">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => form.setValue("theme", option.value, { shouldDirty: true })}
                      className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                        form.watch("theme") === option.value
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-background hover:border-primary/50 hover:bg-accent/50"
                      }`}
                    >
                      <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        form.watch("theme") === option.value
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}>
                        {form.watch("theme") === option.value && (
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Desktop: Select Dropdown */}
                <Select 
                  value={form.watch("theme") ?? "system"} 
                  onValueChange={(value) => form.setValue("theme", value as PreferenceSchema["theme"], { shouldDirty: true })}
                >
                  <SelectTrigger id="theme" className="w-full hidden sm:flex sm:w-72">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.theme ? (
                  <p className="text-sm text-destructive">{form.formState.errors.theme.message}</p>
                ) : null}
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="accentColor" className="text-sm font-medium">Accent color</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => form.setValue("accentColor", null, { shouldDirty: true })}
                    disabled={!form.watch("accentColor")}
                    className="h-8 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="accentColor"
                      placeholder="#ff6a00"
                      className="h-11 sm:h-12 pr-12"
                      {...form.register("accentColor", {
                        setValueAs: (value: string) => {
                          const trimmed = value?.trim();
                          if (!trimmed) return null;
                          const normalized = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
                          return normalized.toLowerCase();
                        },
                      })}
                    />
                    {form.watch("accentColor") && (
                      <div 
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded border border-border shadow-sm"
                        style={{ backgroundColor: form.watch("accentColor") || "#000" }}
                      />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Use a hex value (e.g. #ff6a00) to tint buttons and accents.</p>
                {form.formState.errors.accentColor ? (
                  <p className="text-sm text-destructive">{form.formState.errors.accentColor.message}</p>
                ) : null}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
                  {mutation.isPending ? "Saving..." : "Save preferences"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    form.reset({
                      theme: (query.data?.theme as PreferenceSchema["theme"]) ?? "system",
                      accentColor: query.data?.accentColor ?? null,
                    })
                  }
                >
                  Reset
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
