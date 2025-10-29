"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const omdb_controller_1 = require("../controllers/omdb.controller");
const require_auth_1 = require("../middleware/require-auth");
exports.movieRouter = (0, express_1.Router)();
exports.movieRouter.use(require_auth_1.requireAuth);
exports.movieRouter.get('/', movie_controller_1.listMovies);
exports.movieRouter.post('/', movie_controller_1.createMovie);
exports.movieRouter.post('/import/omdb', movie_controller_1.importMovieFromOmdb);
exports.movieRouter.get('/integrations/omdb/search', omdb_controller_1.searchOmdb);
exports.movieRouter.get('/integrations/omdb/:id', omdb_controller_1.getOmdbDetails);
exports.movieRouter.get('/:id', movie_controller_1.getMovie);
exports.movieRouter.put('/:id', movie_controller_1.updateMovie);
exports.movieRouter.delete('/:id', movie_controller_1.deleteMovie);
//# sourceMappingURL=movie.routes.js.map