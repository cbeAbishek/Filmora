"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = exports.getPreferences = void 0;
const movie_schema_1 = require("../schemas/movie.schema");
const validate_1 = require("../middleware/validate");
const async_handler_1 = require("../utils/async-handler");
const preference_service_1 = require("../services/preference.service");
exports.getPreferences = [
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const preferences = await preference_service_1.preferenceService.get(req.auth);
        res.json(preferences);
    }),
];
exports.updatePreferences = [
    (0, validate_1.validateBody)(movie_schema_1.preferenceSchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const body = movie_schema_1.preferenceSchema.parse(req.body);
        const preferences = await preference_service_1.preferenceService.upsert(req.auth, body);
        res.json(preferences);
    }),
];
//# sourceMappingURL=preference.controller.js.map