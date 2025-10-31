"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferenceService = void 0;
const http_error_1 = require("../utils/http-error");
const prisma_1 = require("../config/prisma");
class PreferenceService {
    normalizeAccent(accentColor) {
        if (!accentColor)
            return null;
        const value = accentColor.trim();
        if (!value)
            return null;
        const hex = value.startsWith('#') ? value.slice(1) : value;
        const normalized = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
        return `#${normalized.toLowerCase()}`;
    }
    async get(auth) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        return prisma_1.prisma.userPreference.findUnique({
            where: { userId: auth.userId },
        });
    }
    async upsert(auth, input) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        const accentColor = this.normalizeAccent(input.accentColor ?? null);
        return prisma_1.prisma.userPreference.upsert({
            where: { userId: auth.userId },
            create: {
                userId: auth.userId,
                theme: input.theme,
                accentColor,
            },
            update: {
                theme: input.theme,
                accentColor,
            },
        });
    }
}
exports.preferenceService = new PreferenceService();
//# sourceMappingURL=preference.service.js.map