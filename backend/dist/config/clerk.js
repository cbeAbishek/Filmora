"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerk = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const env_1 = require("./env");
exports.clerk = (0, clerk_sdk_node_1.createClerkClient)({
    secretKey: env_1.env.CLERK_SECRET_KEY,
});
//# sourceMappingURL=clerk.js.map