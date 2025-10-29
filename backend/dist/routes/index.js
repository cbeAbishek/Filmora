"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const health_routes_1 = require("./health.routes");
const movie_routes_1 = require("./movie.routes");
const preference_routes_1 = require("./preference.routes");
const imagekit_routes_1 = require("./imagekit.routes");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use('/health', health_routes_1.healthRouter);
exports.apiRouter.use('/movies', movie_routes_1.movieRouter);
exports.apiRouter.use('/preferences', preference_routes_1.preferenceRouter);
exports.apiRouter.use('/imagekit', imagekit_routes_1.imagekitRouter);
//# sourceMappingURL=index.js.map