export interface Movie {
  id: string;
  userId: string;
  title: string;
  director: string;
  budget: string | null;
  location: string;
  duration: number;
  releaseYear: number | null;
  releaseDate: string | null;
  description: string | null;
  posterUrl: string | null;
  omdbId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMoviesResponse {
  data: Movie[];
  nextCursor?: string;
}

export interface OmdbSearchItem {
  id: string;
  title: string;
  year?: number;
  type: string;
  posterUrl?: string;
}

export interface OmdbSearchResponse {
  items: OmdbSearchItem[];
  total: number;
  page: number;
}

export interface MovieFormValues {
  title: string;
  director: string;
  budget?: string | null;
  location: string;
  duration: number;
  releaseYear?: number | null;
  releaseDate?: string | null;
  description?: string | null;
  posterUrl?: string | null;
  omdbId?: string | null;
}

export interface PreferenceResponse {
  id: string;
  userId: string;
  theme: string;
  accentColor: string | null;
  createdAt: string;
  updatedAt: string;
}
