"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";
import { movieSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildUrl, handleResponse } from "@/lib/api-client";
import { getEnv } from "@/lib/env";
import { generateMovieDetails } from "@/lib/gemini";
import { toast } from "sonner";

const formSchema = movieSchema.extend({
  duration: z.number().int("Duration must be an integer").positive("Duration must be greater than zero"),
});

export type MovieFormSchema = z.infer<typeof movieSchema>;
type FormValues = z.infer<typeof formSchema>;

interface MovieFormProps {
  onSubmit: (values: MovieFormSchema) => Promise<void> | void;
  defaultValues?: Partial<MovieFormSchema>;
  loading?: boolean;
  submitLabel?: string;
}

const fieldClass = "space-y-2";

interface ImagekitAuthResponse {
  token: string;
  expire: number;
  signature: string;
}

interface ImagekitUploadResponse {
  url?: string;
  thumbnailUrl?: string;
  fileId: string;
  message?: string;
}

function normalizeReleaseDate(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const candidate = trimmed.includes("T") ? trimmed : `${trimmed}T00:00:00Z`;
  const date = new Date(candidate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

const FORM_CACHE_KEY = "filmora_movie_form_cache";

export function MovieForm({ onSubmit, defaultValues, loading, submitLabel = "Save movie" }: MovieFormProps) {
  const { getToken } = useAuth();
  const {
    NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    NEXT_PUBLIC_GEMINI_API_KEY,
  } = getEnv();
  const [isPosterUploading, setIsPosterUploading] = useState(false);
  const [posterUploadError, setPosterUploadError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const posterPlaceholder = `${NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/poster.jpg`;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      title: "",
      director: "",
      budget: null,
      location: "",
      duration: 120,
      releaseYear: null,
      releaseDate: null,
      description: "",
      posterUrl: "",
      omdbId: null,
      ...defaultValues,
    },
  });

  // Load cached form data on mount
  useEffect(() => {
    if (!defaultValues) {
      try {
        const cached = localStorage.getItem(FORM_CACHE_KEY);
        if (cached) {
          const cachedData = JSON.parse(cached) as Partial<FormValues>;
          form.reset({
            title: cachedData.title ?? "",
            director: cachedData.director ?? "",
            budget: cachedData.budget ?? null,
            location: cachedData.location ?? "",
            duration: cachedData.duration ?? 120,
            releaseYear: cachedData.releaseYear ?? null,
            releaseDate: cachedData.releaseDate ?? null,
            description: cachedData.description ?? "",
            posterUrl: cachedData.posterUrl ?? "",
            omdbId: cachedData.omdbId ?? null,
          });
        }
      } catch (error) {
        console.error("Failed to load cached form data:", error);
      }
    }
  }, [defaultValues, form]);

  // Cache form data on every change
  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to cache form data:", error);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const posterUrlField = form.register("posterUrl", {
    onChange: () => setPosterUploadError(null),
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title ?? "",
        director: defaultValues.director ?? "",
        budget: defaultValues.budget ?? null,
        location: defaultValues.location ?? "",
        duration: defaultValues.duration ?? 120,
        releaseYear: defaultValues.releaseYear ?? null,
        releaseDate: defaultValues.releaseDate ?? null,
        description: defaultValues.description ?? "",
        posterUrl: defaultValues.posterUrl ?? "",
        omdbId: defaultValues.omdbId ?? null,
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const budget = data.budget?.trim();
    const description = data.description?.trim();
    const posterUrl = data.posterUrl?.trim();
    const omdbId = data.omdbId?.trim();
    const releaseDate = normalizeReleaseDate(data.releaseDate);

    const payload: MovieFormSchema = {
      title: data.title.trim(),
      director: data.director.trim(),
      location: data.location.trim(),
      duration: data.duration,
      ...(budget ? { budget } : {}),
      ...(typeof data.releaseYear === "number" ? { releaseYear: data.releaseYear } : {}),
      ...(releaseDate ? { releaseDate } : {}),
      ...(description ? { description } : {}),
      ...(posterUrl ? { posterUrl } : {}),
      ...(omdbId ? { omdbId } : {}),
    };

    await onSubmit(payload);
    
    // Clear cache after successful submission
    try {
      localStorage.removeItem(FORM_CACHE_KEY);
    } catch (error) {
      console.error("Failed to clear form cache:", error);
    }
  });

  const handleGenerateDetails = async () => {
    const title = form.getValues("title");
    
    if (!title?.trim()) {
      toast.error("Please enter a movie title first");
      return;
    }

    if (!NEXT_PUBLIC_GEMINI_API_KEY) {
      toast.error("Gemini API key not configured");
      return;
    }

    setIsGenerating(true);
    
    try {
      const details = await generateMovieDetails(title.trim(), NEXT_PUBLIC_GEMINI_API_KEY);
      
      if (!details) {
        toast.error("Failed to generate movie details");
        return;
      }

      // Update form with generated details (except title and posterUrl)
      form.setValue("director", details.director, { shouldValidate: true });
      form.setValue("budget", details.budget, { shouldValidate: true });
      form.setValue("location", details.location, { shouldValidate: true });
      form.setValue("duration", details.duration, { shouldValidate: true });
      form.setValue("releaseYear", details.releaseYear, { shouldValidate: true });
      form.setValue("releaseDate", details.releaseDate, { shouldValidate: true });
      form.setValue("description", details.description, { shouldValidate: true });

      toast.success("Movie details generated successfully!");
    } catch (error) {
      console.error("Error generating details:", error);
      toast.error("Failed to generate movie details");
    } finally {
      setIsGenerating(false);
    }
  };

  const getAuthToken = async () => {
    try {
      return NEXT_PUBLIC_CLERK_JWT_TEMPLATE
        ? await getToken({ template: NEXT_PUBLIC_CLERK_JWT_TEMPLATE })
        : await getToken();
    } catch {
      return null;
    }
  };

  const fetchImagekitAuth = async (): Promise<ImagekitAuthResponse> => {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("Sign in to upload posters");
    }

    const response = await fetch(buildUrl("/imagekit/auth"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    return handleResponse<ImagekitAuthResponse>(response);
  };

  const uploadPoster = async (file: File) => {
    setPosterUploadError(null);
    setIsPosterUploading(true);

    try {
      const auth = await fetchImagekitAuth();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("token", auth.token);
      formData.append("expire", String(auth.expire));
      formData.append("signature", auth.signature);
      formData.append("publicKey", NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);

      const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await uploadResponse.json().catch(() => null)) as ImagekitUploadResponse | null;

      if (!uploadResponse.ok) {
        const message = payload?.message ?? "Failed to upload poster";
        throw new Error(message);
      }

      if (!payload?.url) {
        throw new Error("ImageKit response did not include a file URL");
      }

      form.setValue("posterUrl", payload.url, { shouldValidate: true, shouldDirty: true });
      void form.trigger("posterUrl");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not upload poster";
      setPosterUploadError(message);
    } finally {
      setIsPosterUploading(false);
    }
  };

  const handlePosterFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPosterUploadError("Poster must be an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPosterUploadError("Poster must be smaller than 5MB");
      return;
    }

    await uploadPoster(file);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      <div className={fieldClass}>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="title">Title</Label>
          {NEXT_PUBLIC_GEMINI_API_KEY && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerateDetails}
              disabled={isGenerating || !form.watch("title")?.trim()}
              className="gap-2 h-8 text-xs bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" />
                  AI Auto-fill
                </>
              )}
            </Button>
          )}
        </div>
        <Input id="title" placeholder="Enter movie title" {...form.register("title")} />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
        )}
        {NEXT_PUBLIC_GEMINI_API_KEY && (
          <p className="text-xs text-muted-foreground mt-1">
            Enter a title and click AI Auto-fill to generate details automatically
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <Label htmlFor="director">Director</Label>
        <Input id="director" placeholder="Director" {...form.register("director")} />
        {form.formState.errors.director && (
          <p className="text-sm text-destructive">{form.formState.errors.director.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={fieldClass}>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            {...form.register("duration", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {form.formState.errors.duration && (
            <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
          )}
        </div>
        <div className={fieldClass}>
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input id="budget" placeholder="e.g. 2000000" {...form.register("budget")} />
          {form.formState.errors.budget && (
            <p className="text-sm text-destructive">{form.formState.errors.budget.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={fieldClass}>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Filming location" {...form.register("location")} />
          {form.formState.errors.location && (
            <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
          )}
        </div>
        <div className={fieldClass}>
          <Label htmlFor="releaseYear">Release year</Label>
          <Input
            id="releaseYear"
            type="number"
            {...form.register("releaseYear", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
            })}
          />
          {form.formState.errors.releaseYear && (
            <p className="text-sm text-destructive">{form.formState.errors.releaseYear.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={fieldClass}>
          <Label htmlFor="releaseDate">Release date</Label>
          <Input
            id="releaseDate"
            type="date"
            {...form.register("releaseDate", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
          />
          {form.formState.errors.releaseDate && (
            <p className="text-sm text-destructive">{form.formState.errors.releaseDate.message}</p>
          )}
        </div>
        <div className={fieldClass}>
          <Label htmlFor="posterUrl">Poster</Label>
          <Input id="posterUrl" placeholder={posterPlaceholder} {...posterUrlField} />
          <Input id="posterFile" type="file" accept="image/*" onChange={handlePosterFileChange} disabled={isPosterUploading} />
          {isPosterUploading ? <p className="text-sm text-muted-foreground">Uploading poster…</p> : null}
          {posterUploadError ? <p className="text-sm text-destructive">{posterUploadError}</p> : null}
          {form.formState.errors.posterUrl && (
            <p className="text-sm text-destructive">{form.formState.errors.posterUrl.message}</p>
          )}
        </div>
      </div>

      <div className={fieldClass}>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} placeholder="Write a synopsis" {...form.register("description")} />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="hidden">
        <Label htmlFor="omdbId">OMDb id</Label>
        <Input id="omdbId" {...form.register("omdbId")} />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
