"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = require("./app");
const env_1 = require("./config/env");
const app = (0, app_1.createApp)();
const server = (0, http_1.createServer)(app);
server.listen(env_1.env.PORT, () => {
    console.log(`Server listening on port ${env_1.env.PORT}`);
});
//# sourceMappingURL=server.js.map