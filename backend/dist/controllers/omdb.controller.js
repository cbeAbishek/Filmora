"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOmdbDetails = exports.searchOmdb = void 0;
const movie_schema_1 = require("../schemas/movie.schema");
const validate_1 = require("../middleware/validate");
const async_handler_1 = require("../utils/async-handler");
const omdb_service_1 = require("../services/omdb.service");
const http_error_1 = require("../utils/http-error");
exports.searchOmdb = [
    (0, validate_1.validateQuery)(movie_schema_1.omdbSearchQuerySchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const query = movie_schema_1.omdbSearchQuerySchema.parse(req.query);
        const result = await omdb_service_1.omdbService.search(query);
        res.json(result);
    }),
];
exports.getOmdbDetails = [
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new http_error_1.HttpError(400, 'OMDb id is required');
        }
        const result = await omdb_service_1.omdbService.getDetailsById(id);
        res.json(result);
    }),
];
//# sourceMappingURL=omdb.controller.js.map