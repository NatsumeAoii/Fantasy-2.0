const STORAGE_KEY = 'f4_generation_count';

export class GenerationStateManager {
    static getGenerationCount() {
        if (typeof window === 'undefined' || !window.localStorage) return 0;
        const count = localStorage.getItem(STORAGE_KEY);
        return count ? parseInt(count, 10) : 0;
    }

    static incrementGenerationCount() {
        if (typeof window === 'undefined' || !window.localStorage) return 1;
        const current = this.getGenerationCount();
        const next = current + 1;
        localStorage.setItem(STORAGE_KEY, next.toString());
        return next;
    }

    static resetGenerationCount() {
        if (typeof window === 'undefined' || !window.localStorage) return;
        localStorage.setItem(STORAGE_KEY, '0');
    }
}
