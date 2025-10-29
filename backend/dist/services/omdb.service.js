"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.omdbService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const http_error_1 = require("../utils/http-error");
const omdbClient = axios_1.default.create({
    baseURL: env_1.env.OMDB_BASE_URL,
    timeout: 5_000,
    params: {
        apikey: env_1.env.OMDB_API_KEY,
    },
});
const parseRuntime = (runtime) => {
    if (!runtime) {
        return undefined;
    }
    const match = runtime.match(/^(\d+)\s*min/);
    const minutes = match?.[1];
    return minutes ? Number.parseInt(minutes, 10) : undefined;
};
const parseCurrency = (value) => {
    if (!value) {
        return undefined;
    }
    const normalized = value.replace(/[^0-9.]/g, '');
    return normalized.length > 0 ? normalized : undefined;
};
const parseDate = (value) => {
    if (!value) {
        return undefined;
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};
class OmdbService {
    async search(query) {
        try {
            const response = await omdbClient.get('', {
                params: {
                    s: query.query,
                    type: query.type,
                    y: query.year,
                    page: query.page,
                },
            });
            if (response.data.Response === 'False') {
                throw new http_error_1.HttpError(404, response.data.Error ?? 'No results found');
            }
            const items = (response.data.Search ?? []).map((item) => {
                const mapped = {
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
        }
        catch (error) {
            if (error instanceof http_error_1.HttpError) {
                throw error;
            }
            const axiosError = error;
            throw new http_error_1.HttpError(502, 'Failed to communicate with OMDb API', axiosError.message);
        }
    }
    async getDetailsById(id) {
        try {
            const response = await omdbClient.get('', {
                params: {
                    i: id,
                    plot: 'full',
                },
            });
            if (response.data.Response === 'False') {
                throw new http_error_1.HttpError(404, response.data.Error ?? 'No details found');
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
        }
        catch (error) {
            if (error instanceof http_error_1.HttpError) {
                throw error;
            }
            const axiosError = error;
            throw new http_error_1.HttpError(502, 'Failed to communicate with OMDb API', axiosError.message);
        }
    }
}
exports.omdbService = new OmdbService();
//# sourceMappingURL=omdb.service.js.map