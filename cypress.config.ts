import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100', // Base URL de tu app
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // Incluye .ts
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
