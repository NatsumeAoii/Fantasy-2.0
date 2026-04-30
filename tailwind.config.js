/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Colors are defined via CSS variables in theme.css and exposed via @theme
            },
            // STRICT TYPOGRAPHY SYSTEM (using new token names)
            fontSize: {
                xs: ['var(--fs-xs)', { lineHeight: 'var(--lh-normal)' }],
                sm: ['var(--fs-s)', { lineHeight: 'var(--lh-normal)' }],
                base: ['var(--fs-m)', { lineHeight: 'var(--lh-normal)' }],
                lg: ['var(--fs-lg)', { lineHeight: 'var(--lh-tight)' }],
                xl: ['var(--fs-xl)', { lineHeight: 'var(--lh-tight)' }],
            },
            fontWeight: {
                // SAFETY NET: Remap all thin/light weights to Regular (400)
                thin: 'var(--fw-400)',       // 100 -> 400
                extralight: 'var(--fw-400)', // 200 -> 400
                light: 'var(--fw-400)',      // 300 -> 400
                normal: 'var(--fw-400)',     // 400 -> 400
                medium: 'var(--fw-400)',     // 500 -> 400
                semibold: 'var(--fw-600)',   // 600 -> 600
                bold: 'var(--fw-800)',       // 700 -> 800
                extrabold: 'var(--fw-800)',  // 800 -> 800
                black: 'var(--fw-800)',      // 900 -> 800
            },
            lineHeight: {
                tight: 'var(--lh-tight)',
                normal: 'var(--lh-normal)',
                loose: 'var(--lh-loose)',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
                mono: 'var(--font-mono)',
                serif: 'var(--font-serif)',
            },
            spacing: {
                xs: 'var(--space-xs)',
                s: 'var(--space-s)',
                m: 'var(--space-m)',
                lg: 'var(--space-lg)',
                xl: 'var(--space-xl)',
            },
            borderRadius: {
                s: 'var(--radius-s)',
                m: 'var(--radius-m)',
                l: 'var(--radius-l)',
            },
            boxShadow: {
                sm: 'var(--shadow-1)',
                lg: 'var(--shadow-2)',
                glow: 'var(--shadow-glow)',
                accent: 'var(--shadow-accent)',
            },
        },
    },
    plugins: [],
}
