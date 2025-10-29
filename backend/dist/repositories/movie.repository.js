"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRepository = exports.MovieRepository = void 0;
const prisma_1 = require("../config/prisma");
const buildOrderBy = (sort, order) => ({
    [sort]: order,
});
class MovieRepository {
    async create(userId, input) {
        return prisma_1.prisma.movie.create({
            data: {
                userId,
                title: input.title,
                director: input.director,
                budget: input.budget ?? null,
                location: input.location,
                duration: input.duration,
                releaseYear: input.releaseYear ?? null,
                releaseDate: input.releaseDate ?? null,
                description: input.description ?? null,
                posterUrl: input.posterUrl ?? null,
                omdbId: input.omdbId ?? null,
            },
        });
    }
    async update(id, input) {
        return prisma_1.prisma.movie.update({
            where: { id },
            data: {
                ...(input.title !== undefined && { title: input.title }),
                ...(input.director !== undefined && { director: input.director }),
                ...(input.budget !== undefined && { budget: input.budget }),
                ...(input.location !== undefined && { location: input.location }),
                ...(input.duration !== undefined && { duration: input.duration }),
                ...(input.releaseYear !== undefined && { releaseYear: input.releaseYear }),
                ...(input.releaseDate !== undefined && { releaseDate: input.releaseDate }),
                ...(input.description !== undefined && { description: input.description }),
                ...(input.posterUrl !== undefined && { posterUrl: input.posterUrl }),
                ...(input.omdbId !== undefined && { omdbId: input.omdbId }),
            },
        });
    }
    async delete(id) {
        return prisma_1.prisma.movie.delete({ where: { id } });
    }
    async findById(id) {
        return prisma_1.prisma.movie.findUnique({ where: { id } });
    }
    async findByOmdbId(userId, omdbId) {
        return prisma_1.prisma.movie.findFirst({ where: { userId, omdbId } });
    }
    async list(userId, query) {
        const { cursor, limit, search, sort, order } = query;
        const where = {
            userId,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { director: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const records = await prisma_1.prisma.movie.findMany({
            where,
            take: limit + 1,
            ...(cursor && { cursor: { id: cursor }, skip: 1 }),
            orderBy: buildOrderBy(sort, order),
        });
        let nextCursor;
        if (records.length > limit) {
            const nextItem = records.pop();
            nextCursor = nextItem?.id;
        }
        return {
            data: records,
            nextCursor,
        };
    }
}
exports.MovieRepository = MovieRepository;
exports.movieRepository = new MovieRepository();
//# sourceMappingURL=movie.repository.js.map