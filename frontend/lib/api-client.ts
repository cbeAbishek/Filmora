import { getEnv } from "@/lib/env";

const { NEXT_PUBLIC_API_URL } = getEnv();

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const json = await response.json().catch(() => undefined);
      throw new Error(json?.message ?? response.statusText);
    }
    const text = await response.text().catch(() => response.statusText);
    throw new Error(text || "Unexpected error");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function buildUrl(path: string, params?: Record<string, string | number | undefined | null>) {
  const url = new URL(path.replace(/^(?!https?:)/, `${NEXT_PUBLIC_API_URL}`));
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}
