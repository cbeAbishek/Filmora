import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getMovie,
  importMovieFromOmdb,
  listMovies,
  updateMovie,
} from '../controllers/movie.controller';
import { getOmdbDetails, searchOmdb } from '../controllers/omdb.controller';
import { requireAuth } from '../middleware/require-auth';

export const movieRouter = Router();

movieRouter.use(requireAuth);

movieRouter.get('/', listMovies);
movieRouter.post('/', createMovie);
movieRouter.post('/import/omdb', importMovieFromOmdb);
movieRouter.get('/integrations/omdb/search', searchOmdb);
movieRouter.get('/integrations/omdb/:id', getOmdbDetails);
movieRouter.get('/:id', getMovie);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);
