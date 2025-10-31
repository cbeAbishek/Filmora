import type { PreferenceInput } from '../schemas/movie.schema';
import type { AuthContext } from '../utils/auth-context';
declare class PreferenceService {
    private normalizeAccent;
    get(auth: AuthContext): Promise<{
        createdAt: Date;
        id: string;
        theme: string;
        accentColor: string | null;
        userId: string;
        updatedAt: Date;
    } | null>;
    upsert(auth: AuthContext, input: PreferenceInput): Promise<{
        createdAt: Date;
        id: string;
        theme: string;
        accentColor: string | null;
        userId: string;
        updatedAt: Date;
    }>;
}
export declare const preferenceService: PreferenceService;
export {};
//# sourceMappingURL=preference.service.d.ts.map