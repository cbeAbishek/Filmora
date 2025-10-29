"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagekitRouter = void 0;
const express_1 = require("express");
const imagekit_controller_1 = require("../controllers/imagekit.controller");
const require_auth_1 = require("../middleware/require-auth");
exports.imagekitRouter = (0, express_1.Router)();
exports.imagekitRouter.use(require_auth_1.requireAuth);
exports.imagekitRouter.get('/auth', imagekit_controller_1.getImagekitAuthParameters);
//# sourceMappingURL=imagekit.routes.js.map