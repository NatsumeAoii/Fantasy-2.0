import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { changelogPlugin } from './vite-plugin-changelog'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      generatedRouteTree: './src/routeTree.gen.ts',
      routeFileIgnorePattern: '(buildCharacterDestination|\\.test)',
      disableLogging: false,
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
    changelogPlugin(),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/')

          if (normalized.includes('/node_modules/react-icons/gi/')) return 'icons-gi'
          if (normalized.includes('/node_modules/react-icons/fa/')) return 'icons-fa'
          if (normalized.includes('/node_modules/react-icons/tb/')) return 'icons-tb'
          if (normalized.includes('/node_modules/react-icons/lu/')) return 'icons-lu'
          if (normalized.includes('/node_modules/react-icons/')) return 'icons'
          if (normalized.includes('/node_modules/recharts')) return 'charts'
          if (normalized.includes('/src/data/bestiary/')) return 'data-bestiary'
          if (normalized.includes('/src/data/character/roleSkills.ts')) return 'data-character-skills'
          if (normalized.includes('/src/data/character/roleTitles.ts')) return 'data-character-titles'
          if (normalized.includes('/src/data/character/')) return 'data-character'
          if (normalized.includes('/src/data/identity/')) return 'data-identity'
          if (normalized.includes('/src/data/inventory/accessories.ts')) return 'data-inventory-accessories'
          if (normalized.includes('/src/data/inventory/armors.ts')) return 'data-inventory-armors'
          if (normalized.includes('/src/data/inventory/consumables.ts')) return 'data-inventory-consumables'
          if (normalized.includes('/src/data/inventory/cuisine.ts')) return 'data-inventory-cuisine'
          if (normalized.includes('/src/data/inventory/enchantments.ts')) return 'data-inventory-enchantments'
          if (normalized.includes('/src/data/inventory/instruments.ts')) return 'data-inventory-instruments'
          if (normalized.includes('/src/data/inventory/materials.ts')) return 'data-inventory-materials'
          if (normalized.includes('/src/data/inventory/merchandise.ts')) return 'data-inventory-merchandise'
          if (normalized.includes('/src/data/inventory/recipes.ts')) return 'data-inventory-recipes'
          if (normalized.includes('/src/data/inventory/weapons.ts')) return 'data-inventory-weapons'
          if (normalized.includes('/src/data/inventory/')) return 'data-inventory'
          if (normalized.includes('/src/data/magic/')) return 'data-magic'
          if (normalized.includes('/src/data/mechanics/')) return 'data-mechanics'
          if (normalized.includes('/src/data/story/')) return 'data-story'
          if (normalized.includes('/src/data/world/')) return 'data-world'

          return undefined
        },
      },
    },
  },
  server: {
    // Add your local tunnel hostname here during development (e.g. localtunnel, ngrok).
    // Do not commit personal tunnel hostnames — they are developer-specific.
    allowedHosts: []
  }
})
