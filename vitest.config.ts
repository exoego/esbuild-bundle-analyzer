// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config'

// https://vitest.dev/config/
export default defineConfig({
  test: {
    pool: "forks",
    clearMocks: true,
    globals: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
    },
    watch: true,
    exclude: [
      ...configDefaults.exclude,
      '/node_modules/',
      // '/__fixtures__/'
    ]
  }
})
