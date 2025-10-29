"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferenceRouter = void 0;
const express_1 = require("express");
const preference_controller_1 = require("../controllers/preference.controller");
const require_auth_1 = require("../middleware/require-auth");
exports.preferenceRouter = (0, express_1.Router)();
exports.preferenceRouter.use(require_auth_1.requireAuth);
exports.preferenceRouter.get('/', preference_controller_1.getPreferences);
exports.preferenceRouter.put('/', preference_controller_1.updatePreferences);
//# sourceMappingURL=preference.routes.js.map