// @ts-check
import { defineConfig, devices } from '@playwright/test'
import { testPlanFilter } from 'allure-playwright/dist/testplan'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  grep: testPlanFilter(),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Retain trace only for failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: { mode: 'only-on-failure', fullPage: true }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium-e2e-fi',
      testMatch: '**/rekkari-e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'fi' }
    },

    {
      name: 'chromium-e2e-sv',
      testMatch: '**/rekkari-e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'sv' }
    },

    {
      name: 'chromium-e2e-en',
      testMatch: '**/rekkari-e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'en' }
    },

    {
      name: 'chromium-report-fi',
      testMatch: '**/report-*.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'fi' }
    },

    {
      name: 'chromium-report-sv',
      testMatch: '**/report-*.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'sv' }
    },

    {
      name: 'chromium-report-en',
      testMatch: '**/report-*.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'en'}
    },

    {
      name: 'firefox-fi',
      use: { ...devices['Desktop Firefox'], language: 'fi' }
    },

    {
      name: 'firefox-sv',
      use: { ...devices['Desktop Firefox'], language: 'sv' }
    },

    {
      name: 'firefox-en',
      use: { ...devices['Desktop Firefox'], language: 'en' }
    },

    {
      name: 'webkit-fi',
      use: { ...devices['Desktop Safari'], language: 'fi' }
    },

    {
      name: 'webkit-sv',
      use: { ...devices['Desktop Safari'], language: 'sv' }
    },

    {
      name: 'webkit-en',
      use: { ...devices['Desktop Safari'], language: 'en' }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
