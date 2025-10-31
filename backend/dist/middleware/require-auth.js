"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const clerk_1 = require("../config/clerk");
const env_1 = require("../config/env");
const http_error_1 = require("../utils/http-error");
const BEARER_PREFIX = 'Bearer ';
const requireAuth = async (req, _res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader?.startsWith(BEARER_PREFIX)) {
        return next(new http_error_1.HttpError(401, 'Authentication required'));
    }
    const token = authorizationHeader.substring(BEARER_PREFIX.length).trim();
    try {
        const verifyOptions = env_1.env.CLERK_JWT_TEMPLATE_NAME
            ? { template: env_1.env.CLERK_JWT_TEMPLATE_NAME }
            : undefined;
        const verification = await clerk_1.clerk.verifyToken(token, verifyOptions);
        const authContext = {
            userId: verification.sub,
        };
        if (verification.sid) {
            authContext.sessionId = verification.sid;
        }
        if (typeof verification.email === 'string') {
            authContext.email = verification.email;
        }
        if (!authContext.userId) {
            throw new Error('Missing user identifier in token');
        }
        req.auth = authContext;
        next();
    }
    catch (error) {
        next(new http_error_1.HttpError(401, 'Invalid or expired token', error instanceof Error ? error.message : error));
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=require-auth.js.map