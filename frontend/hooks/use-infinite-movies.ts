"use client";

import { useAuth } from "@clerk/nextjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { buildUrl, handleResponse } from "@/lib/api-client";
import { getEnv } from "@/lib/env";
import type { PaginatedMoviesResponse } from "@/lib/types";

interface Options {
  search?: string;
  sort?: "createdAt" | "title" | "releaseYear";
  order?: "asc" | "desc";
  enabled?: boolean;
}

export function useInfiniteMovies({ search, sort = "createdAt", order = "desc", enabled = true }: Options) {
  const { getToken, isSignedIn } = useAuth();
  const { NEXT_PUBLIC_CLERK_JWT_TEMPLATE } = getEnv();

  return useInfiniteQuery({
    queryKey: ["movies", { search, sort, order }],
    enabled: enabled && Boolean(isSignedIn),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const token = await (async () => {
        try {
          return NEXT_PUBLIC_CLERK_JWT_TEMPLATE
            ? await getToken({ template: NEXT_PUBLIC_CLERK_JWT_TEMPLATE })
            : await getToken();
        } catch {
          return undefined;
        }
      })();
      if (!token) {
        throw new Error("Sign in to view your movies");
      }
      const url = buildUrl("/movies", {
        limit: 20,
        cursor: pageParam,
        search,
        sort,
        order,
      });
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      return handleResponse<PaginatedMoviesResponse>(response);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
