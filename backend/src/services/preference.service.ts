import type { PreferenceInput } from '../schemas/movie.schema';
import type { AuthContext } from '../utils/auth-context';
import { HttpError } from '../utils/http-error';
import { prisma } from '../config/prisma';

class PreferenceService {
  private normalizeAccent(accentColor?: string | null) {
    if (!accentColor) return null;
    const value = accentColor.trim();
    if (!value) return null;
    const hex = value.startsWith('#') ? value.slice(1) : value;
    const normalized = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
    return `#${normalized.toLowerCase()}`;
  }

  async get(auth: AuthContext) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    return prisma.userPreference.findUnique({
      where: { userId: auth.userId },
    });
  }

  async upsert(auth: AuthContext, input: PreferenceInput) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    const accentColor = this.normalizeAccent(input.accentColor ?? null);

    return prisma.userPreference.upsert({
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

export const preferenceService = new PreferenceService();
