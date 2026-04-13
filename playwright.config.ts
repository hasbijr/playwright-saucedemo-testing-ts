import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/test/features/*.feature',
  steps: 'src/test/steps/*.ts',
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'on',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
