import { toast } from 'sonner';

/**
 * Copy text to clipboard with a fallback for browsers without the Clipboard API.
 * Shows toast notifications for success/failure.
 */
export async function copyToClipboard(
    text: string,
    successMessage = 'Copied!',
    successDescription?: string,
): Promise<boolean> {
    const successOptions = successDescription ? { description: successDescription } : undefined;
    const clipboard = typeof navigator === 'undefined' ? undefined : navigator.clipboard;

    if (clipboard) {
        try {
            await clipboard.writeText(text);
            toast.success(successMessage, successOptions);
            return true;
        } catch {
            // Fall through to the textarea fallback below.
        }
    }

    if (typeof document === 'undefined' || typeof document.execCommand !== 'function' || !document.body) {
        toast.error('Failed to copy.');
        return false;
    }

    // Fallback: textarea + execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        const copied = document.execCommand('copy');
        if (!copied) {
            toast.error('Failed to copy.');
            return false;
        }

        toast.success(successMessage, successOptions);
        return true;
    } catch {
        toast.error('Failed to copy.');
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}
