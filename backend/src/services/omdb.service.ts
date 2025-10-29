import axios, { AxiosError } from 'axios';
import { env } from '../config/env';
import type { OmdbSearchQuery } from '../schemas/movie.schema';
import { HttpError } from '../utils/http-error';

interface OmdbSearchItemRaw {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster?: string;
}

interface OmdbSearchResponse {
  Search?: OmdbSearchItemRaw[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbSearchItem {
  id: string;
  title: string;
  year?: number;
  type: string;
  posterUrl?: string;
}

interface OmdbDetailResponse {
  Title?: string;
  Released?: string;
  Year?: string;
  Director?: string;
  Plot?: string;
  Runtime?: string;
  imdbID?: string;
  BoxOffice?: string;
  Country?: string;
  Response: 'True' | 'False';
  Error?: string;
  Poster?: string;
}

const omdbClient = axios.create({
  baseURL: env.OMDB_BASE_URL,
  timeout: 5_000,
  params: {
    apikey: env.OMDB_API_KEY,
  },
});

const parseRuntime = (runtime?: string): number | undefined => {
  if (!runtime) {
    return undefined;
  }

  const match = runtime.match(/^(\d+)\s*min/);
  const minutes = match?.[1];
  return minutes ? Number.parseInt(minutes, 10) : undefined;
};

const parseCurrency = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.replace(/[^0-9.]/g, '');
  return normalized.length > 0 ? normalized : undefined;
};

const parseDate = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

class OmdbService {
  async search(query: OmdbSearchQuery) {
    try {
      const response = await omdbClient.get<OmdbSearchResponse>('', {
        params: {
          s: query.query,
          type: query.type,
          y: query.year,
          page: query.page,
        },
      });

      if (response.data.Response === 'False') {
        throw new HttpError(404, response.data.Error ?? 'No results found');
      }

      const items: OmdbSearchItem[] = (response.data.Search ?? []).map((item) => {
        const mapped: OmdbSearchItem = {
          id: item.imdbID,
          title: item.Title,
          type: item.Type,
        };

        const year = item.Year ? Number.parseInt(item.Year, 10) : undefined;
        if (year !== undefined) {
          mapped.year = year;
        }

        const poster = item.Poster && item.Poster !== 'N/A' ? item.Poster : undefined;
        if (poster) {
          mapped.posterUrl = poster;
        }

        return mapped;
      });

      return {
        items,
        total: response.data.totalResults ? Number.parseInt(response.data.totalResults, 10) : items.length,
        page: query.page,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      const axiosError = error as AxiosError;
      throw new HttpError(502, 'Failed to communicate with OMDb API', axiosError.message);
    }
  }

  async getDetailsById(id: string) {
    try {
      const response = await omdbClient.get<OmdbDetailResponse>('', {
        params: {
          i: id,
          plot: 'full',
        },
      });

      if (response.data.Response === 'False') {
        throw new HttpError(404, response.data.Error ?? 'No details found');
      }

      return {
        title: response.data.Title,
        director: response.data.Director ?? undefined,
        releaseDate: parseDate(response.data.Released),
        releaseYear: response.data.Year ? Number.parseInt(response.data.Year, 10) : undefined,
        description: response.data.Plot ?? undefined,
        duration: parseRuntime(response.data.Runtime),
        budget: parseCurrency(response.data.BoxOffice),
        location: response.data.Country ?? undefined,
        posterUrl: response.data.Poster && response.data.Poster !== 'N/A' ? response.data.Poster : undefined,
        omdbId: response.data.imdbID ?? id,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      const axiosError = error as AxiosError;
      throw new HttpError(502, 'Failed to communicate with OMDb API', axiosError.message);
    }
  }
}

export const omdbService = new OmdbService();
