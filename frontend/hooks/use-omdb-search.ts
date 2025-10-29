"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { buildUrl, handleResponse } from "@/lib/api-client";
import { getEnv } from "@/lib/env";
import type { OmdbSearchResponse } from "@/lib/types";

export function useOmdbSearch(search: string, page = 1) {
  const { getToken, isSignedIn } = useAuth();
  const { NEXT_PUBLIC_CLERK_JWT_TEMPLATE } = getEnv();

  return useQuery({
    queryKey: ["omdb", search, page],
    enabled: search.trim().length > 0 && Boolean(isSignedIn),
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
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
        throw new Error("Sign in to search OMDb");
      }
      const url = buildUrl("/movies/integrations/omdb/search", { query: search, page });
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      return handleResponse<OmdbSearchResponse>(response);
    },
  });
}
