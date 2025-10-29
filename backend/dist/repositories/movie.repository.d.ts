import type { CreateMovieInput, ListMoviesQuery, UpdateMovieInput } from '../schemas/movie.schema';
export declare class MovieRepository {
    create(userId: string, input: CreateMovieInput): Promise<{
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
    update(id: string, input: UpdateMovieInput): Promise<{
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
    delete(id: string): Promise<{
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
    findById(id: string): Promise<{
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
    } | null>;
    findByOmdbId(userId: string, omdbId: string): Promise<{
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
    } | null>;
    list(userId: string, query: ListMoviesQuery): Promise<{
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
export declare const movieRepository: MovieRepository;
//# sourceMappingURL=movie.repository.d.ts.map