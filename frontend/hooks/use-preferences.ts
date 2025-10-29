"use client";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildUrl, handleResponse } from "@/lib/api-client";
import { getEnv } from "@/lib/env";
import type { PreferenceResponse } from "@/lib/types";
import type { PreferenceSchema } from "@/lib/validation";

export function usePreferences() {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const { NEXT_PUBLIC_CLERK_JWT_TEMPLATE } = getEnv();

  const query = useQuery({
    queryKey: ["preferences"],
    enabled: Boolean(isSignedIn),
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
        return null;
      }
      const response = await fetch(buildUrl("/preferences"), {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });
      if (response.status === 401) {
        return null;
      }
      return handleResponse<PreferenceResponse | null>(response);
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: PreferenceSchema) => {
      if (!isSignedIn) {
        throw new Error("Sign in to update preferences");
      }
      const token = await (async () => {
        try {
          return NEXT_PUBLIC_CLERK_JWT_TEMPLATE
            ? await getToken({ template: NEXT_PUBLIC_CLERK_JWT_TEMPLATE })
            : await getToken();
        } catch {
          return undefined;
        }
      })();
      const response = await fetch(buildUrl("/preferences"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      return handleResponse<PreferenceResponse>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
  return { query, mutation, isSignedIn: Boolean(isSignedIn) };
}
