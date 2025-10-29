import type { OmdbSearchQuery } from '../schemas/movie.schema';
export interface OmdbSearchItem {
    id: string;
    title: string;
    year?: number;
    type: string;
    posterUrl?: string;
}
declare class OmdbService {
    search(query: OmdbSearchQuery): Promise<{
        items: OmdbSearchItem[];
        total: number;
        page: number;
    }>;
    getDetailsById(id: string): Promise<{
        title: string | undefined;
        director: string | undefined;
        releaseDate: Date | undefined;
        releaseYear: number | undefined;
        description: string | undefined;
        duration: number | undefined;
        budget: string | undefined;
        location: string | undefined;
        posterUrl: string | undefined;
        omdbId: string;
    }>;
}
export declare const omdbService: OmdbService;
export {};
//# sourceMappingURL=omdb.service.d.ts.map