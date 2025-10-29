"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagekitAuthParameters = void 0;
const async_handler_1 = require("../utils/async-handler");
const imagekit_1 = require("../config/imagekit");
exports.getImagekitAuthParameters = [
    (0, async_handler_1.asyncHandler)((_req, res) => {
        const params = imagekit_1.imagekit.getAuthenticationParameters();
        res.json(params);
    }),
];
//# sourceMappingURL=imagekit.controller.js.map