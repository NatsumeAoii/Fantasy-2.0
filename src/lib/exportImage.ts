import { toPng } from 'html-to-image';

const SAFE_FILENAME_RE = /[^a-zA-Z0-9_-]/g;
const MAX_FILENAME_BASE_LENGTH = 80;

/** Background colors matching the dark and light theme roots. */
const THEME_BACKGROUNDS: Record<string, string> = {
    dark: '#050505',
    light: '#dccfbc',
};

function sanitizeFilename(filename: string): string {
    const safeName = filename.replace(SAFE_FILENAME_RE, '_').slice(0, MAX_FILENAME_BASE_LENGTH);
    return safeName || 'character';
}

/**
 * Reads the active theme from the document root attribute.
 * Falls back to dark if the attribute is absent or unrecognised.
 */
function resolveBackgroundColor(): string {
    if (typeof document === 'undefined') return THEME_BACKGROUNDS.dark;
    const theme = document.documentElement.getAttribute('data-theme') ?? 'dark';
    return THEME_BACKGROUNDS[theme] ?? THEME_BACKGROUNDS.dark;
}

/**
 * Export a DOM element as a PNG image and trigger a download.
 *
 * @param element  Target element to render.
 * @param filename Base filename (sanitized, timestamp-appended).
 * @throws Re-throws so callers (e.g. toast.promise) can display the error.
 *
 * Notes:
 * - Background color is read from the active theme so light-mode exports
 *   don't get a dark background.
 * - The anchor element is appended to the DOM before clicking and removed
 *   afterward for cross-browser compatibility (required on some Safari versions).
 * - pixelRatio: 2 produces retina-quality output. On low-memory devices
 *   toPng may throw an OOM error — this is caught and re-thrown to the caller.
 */
export const exportAsImage = async (element: HTMLElement | null, filename: string = 'aetheris-character'): Promise<void> => {
    if (!element) throw new Error('No element to export');
    if (typeof document === 'undefined') throw new Error('Image export is only available in a browser');

    const safeName = sanitizeFilename(filename);
    const backgroundColor = resolveBackgroundColor();

    const dataUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor,
    });

    const link = document.createElement('a');
    link.download = `${safeName}-${Date.now()}.png`;
    link.href = dataUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
