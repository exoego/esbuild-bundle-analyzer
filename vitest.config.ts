// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config'

// https://vitest.dev/config/
export default defineConfig({
  test: {
    pool: "forks",
    clearMocks: true,
    globals: true,
    reporters: ['verbose'],
    watch: true,
    exclude: [
      ...configDefaults.exclude,
      '**/__fixtures__/**'
    ]
  }
})
