import type { AuthContext } from '../utils/auth-context';
import { type CreateMovieInput, type ImportFromOmdbInput, type ListMoviesQuery, type UpdateMovieInput } from '../schemas/movie.schema';
declare class MovieService {
    create(auth: AuthContext, input: CreateMovieInput): Promise<{
        title: string;
        director: string;
        budget: import("@prisma/client/runtime/library").Decimal | null;
        location: string;
        releaseYear: number | null;
        releaseDate: Date | null;
        duration: number;
        description: string | null;
        posterUrl: string | null;
        omdbId: string | null;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
    }>;
    update(auth: AuthContext, id: string, input: UpdateMovieInput): Promise<{
        title: string;
        director: string;
        budget: import("@prisma/client/runtime/library").Decimal | null;
        location: string;
        releaseYear: number | null;
        releaseDate: Date | null;
        duration: number;
        description: string | null;
        posterUrl: string | null;
        omdbId: string | null;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
    }>;
    delete(auth: AuthContext, id: string): Promise<void>;
    importFromOmdb(auth: AuthContext, input: ImportFromOmdbInput): Promise<{
        title: string;
        director: string;
        budget: import("@prisma/client/runtime/library").Decimal | null;
        location: string;
        releaseYear: number | null;
        releaseDate: Date | null;
        duration: number;
        description: string | null;
        posterUrl: string | null;
        omdbId: string | null;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
    }>;
    get(auth: AuthContext, id: string): Promise<{
        title: string;
        director: string;
        budget: import("@prisma/client/runtime/library").Decimal | null;
        location: string;
        releaseYear: number | null;
        releaseDate: Date | null;
        duration: number;
        description: string | null;
        posterUrl: string | null;
        omdbId: string | null;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
    }>;
    list(auth: AuthContext, query: ListMoviesQuery): Promise<{
        data: {
            title: string;
            director: string;
            budget: import("@prisma/client/runtime/library").Decimal | null;
            location: string;
            releaseYear: number | null;
            releaseDate: Date | null;
            duration: number;
            description: string | null;
            posterUrl: string | null;
            omdbId: string | null;
            createdAt: Date;
            id: string;
            userId: string;
            updatedAt: Date;
        }[];
        nextCursor: string | undefined;
    }>;
}
export declare const movieService: MovieService;
export {};
//# sourceMappingURL=movie.service.d.ts.map