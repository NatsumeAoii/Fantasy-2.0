import { toPng } from 'html-to-image';

const SAFE_FILENAME_RE = /[^a-zA-Z0-9_-]/g;
const MAX_FILENAME_BASE_LENGTH = 80;

function sanitizeFilename(filename: string): string {
    const safeName = filename.replace(SAFE_FILENAME_RE, '_').slice(0, MAX_FILENAME_BASE_LENGTH);
    return safeName || 'character';
}

/**
 * Export a DOM element as a PNG image and trigger download.
 * @param element Target element to render.
 * @param filename Base filename (sanitized, timestamp-appended).
 * @throws Re-throws so callers (e.g. toast.promise) can display the error.
 */
export const exportAsImage = async (element: HTMLElement | null, filename: string = 'aetheris-character') => {
    if (!element) throw new Error('No element to export');
    if (typeof document === 'undefined') throw new Error('Image export is only available in a browser');

    const safeName = sanitizeFilename(filename);

    const dataUrl = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#050505',
    });

    const link = document.createElement('a');
    link.download = `${safeName}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
};
