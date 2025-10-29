"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const env_1 = require("../config/env");
const http_error_1 = require("../utils/http-error");
const errorHandler = (error, _req, res, _next) => {
    const isDevelopment = env_1.env.NODE_ENV === 'development';
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation failed',
            issues: error.issues,
        });
    }
    if (error instanceof http_error_1.HttpError) {
        return res.status(error.status).json({
            message: error.message,
            details: error.details,
        });
    }
    const status = 500;
    const message = 'Internal server error';
    if (isDevelopment) {
        console.error('Unhandled error:', error);
    }
    return res.status(status).json({
        message,
        ...(isDevelopment && { stack: error instanceof Error ? error.stack : error }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map