import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import type { CreateMovieInput, ListMoviesQuery, UpdateMovieInput } from '../schemas/movie.schema';

const buildOrderBy = (sort: ListMoviesQuery['sort'], order: ListMoviesQuery['order']): Prisma.MovieOrderByWithRelationInput => ({
  [sort]: order,
}) as Prisma.MovieOrderByWithRelationInput;

export class MovieRepository {
  async create(userId: string, input: CreateMovieInput) {
    return prisma.movie.create({
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

  async update(id: string, input: UpdateMovieInput) {
    return prisma.movie.update({
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

  async delete(id: string) {
    return prisma.movie.delete({ where: { id } });
  }

  async findById(id: string) {
    return prisma.movie.findUnique({ where: { id } });
  }

  async findByOmdbId(userId: string, omdbId: string) {
    return prisma.movie.findFirst({ where: { userId, omdbId } });
  }

  async list(userId: string, query: ListMoviesQuery) {
    const { cursor, limit, search, sort, order } = query;

    const where: Prisma.MovieWhereInput = {
      userId,
    };

    const searchTerm = search?.trim();
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
        { director: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
        { location: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
      ];
    }

    const records = await prisma.movie.findMany({
      where,
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: buildOrderBy(sort, order),
    });

    let nextCursor: string | undefined;
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

export const movieRepository = new MovieRepository();
