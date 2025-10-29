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
  { value: "sunset", label: "Sunset", description: "Warm gradient primary inspired by golden hour." },
  { value: "lagoon", label: "Lagoon", description: "Cool teal palette ideal for sci-fi marathons." },
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
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground">Choose how Filmora looks and feels across sessions.</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Theme & Colors</CardTitle>
          <CardDescription>Pick a base theme and optional accent color to personalize the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {query.isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-80" />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="theme">Theme</Label>
                <Select value={form.watch("theme") ?? "system"} onValueChange={(value) => form.setValue("theme", value as PreferenceSchema["theme"], { shouldDirty: true })}>
                  <SelectTrigger id="theme" className="w-full sm:w-72">
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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="accentColor">Accent color</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => form.setValue("accentColor", null, { shouldDirty: true })}
                    disabled={!form.watch("accentColor")}
                  >
                    Clear
                  </Button>
                </div>
                <Input
                  id="accentColor"
                  placeholder="#ff6a00"
                  {...form.register("accentColor", {
                    setValueAs: (value: string) => {
                      const trimmed = value?.trim();
                      if (!trimmed) return null;
                      const normalized = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
                      return normalized.toLowerCase();
                    },
                  })}
                />
                <p className="text-xs text-muted-foreground">Use a hex value (e.g. #ff6a00) to tint buttons and accents.</p>
                {form.formState.errors.accentColor ? (
                  <p className="text-sm text-destructive">{form.formState.errors.accentColor.message}</p>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save preferences"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
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
