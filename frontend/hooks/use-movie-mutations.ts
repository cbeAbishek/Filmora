"use client";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleResponse, buildUrl } from "@/lib/api-client";
import { getEnv } from "@/lib/env";
import type { Movie, MovieFormValues } from "@/lib/types";

type GetToken = ReturnType<typeof useAuth>["getToken"];

const { NEXT_PUBLIC_CLERK_JWT_TEMPLATE } = getEnv();

async function getClerkToken(getToken: GetToken, template?: string | undefined | null) {
  try {
    return template ? await getToken({ template }) : await getToken();
  } catch {
    return undefined;
  }
}

async function authorizedFetch(url: string, init: RequestInit, getToken: GetToken, template?: string) {
  const token = await getClerkToken(getToken, template);
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
    credentials: "include",
  });
  return response;
}

export function useMovieMutations() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (values: MovieFormValues) => {
      const response = await authorizedFetch(
        buildUrl("/movies"),
        { method: "POST", body: JSON.stringify(values) },
        getToken,
        NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      );
      return handleResponse<Movie>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<MovieFormValues> }) => {
      const response = await authorizedFetch(
        buildUrl(`/movies/${id}`),
        { method: "PUT", body: JSON.stringify(values) },
        getToken,
        NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      );
      return handleResponse<Movie>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await authorizedFetch(
        buildUrl(`/movies/${id}`),
        { method: "DELETE" },
        getToken,
        NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      );
      return handleResponse<void>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const importFromOmdb = useMutation({
    mutationFn: async (payload: { omdbId: string; overrides?: Partial<MovieFormValues> }) => {
      const response = await authorizedFetch(
        buildUrl("/movies/import/omdb"),
        { method: "POST", body: JSON.stringify(payload) },
        getToken,
        NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      );
      return handleResponse<Movie>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  return { createMutation, updateMutation, deleteMutation, importFromOmdb };
}
