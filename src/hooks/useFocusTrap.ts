import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within a container while active.
 * Returns a ref to attach to the container element.
 * Restores focus to the previously focused element on deactivation.
 */
export function useFocusTrap(active: boolean) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active || !containerRef.current) return;

        const container = containerRef.current;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousTabIndex = container.getAttribute('tabindex');

        // Focus the first focusable element inside the trap
        const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusables.length > 0) {
            focusables[0].focus();
        } else {
            container.setAttribute('tabindex', previousTabIndex ?? '-1');
            container.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const els = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            if (els.length === 0) return;

            const first = els[0];
            const last = els[els.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (previousTabIndex === null) {
                container.removeAttribute('tabindex');
            } else {
                container.setAttribute('tabindex', previousTabIndex);
            }
            previouslyFocused?.focus();
        };
    }, [active]);

    return containerRef;
}
