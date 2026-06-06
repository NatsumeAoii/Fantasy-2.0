import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { changelogPlugin } from './vite-plugin-changelog'

export default defineConfig({
  plugins: [react(), changelogPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    css: true,
  },
})
