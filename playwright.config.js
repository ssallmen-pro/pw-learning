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
    baseURL: 'https://www.alko.fi',

    /* Retain trace only for failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: { mode: 'only-on-failure', fullPage: true }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'alko-chromium-data-fi',
      testMatch: 'alko/product-data.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'fi' }
    },

    {
      name: 'alko-chromium-data-sv',
      testMatch: 'alko/product-data.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'sv' }
    },

    {
      name: 'alko-chromium-data-en',
      testMatch: 'alko/product-data.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'en' }
    },

    {
      name: 'alko-chromium-e2e-fi',
      testMatch: 'alko/e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'fi' }
    },

    {
      name: 'alko-chromium-e2e-sv',
      testMatch: 'alko/e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'sv' }
    },

    {
      name: 'alko-chromium-e2e-en',
      testMatch: 'alko/e2e.spec.js',
      use: { ...devices['Desktop Chrome'], language: 'en' }
    },

    {
      name: 'alko-firefox-fi',
      testMatch: 'alko/*.spec.js',
      use: { ...devices['Desktop Firefox'], language: 'fi' }
    },

    {
      name: 'alko-firefox-sv',
      testMatch: 'alko/*.spec.js',
      use: { ...devices['Desktop Firefox'], language: 'sv' }
    },

    {
      name: 'alko-firefox-en',
      testMatch: 'alko/*.spec.js',
      use: { ...devices['Desktop Firefox'], language: 'en' }
    },

    {
      name: 'alko-webkit-fi',
      testMatch: 'alko/*.spec.js',
      use: { ...devices['Desktop Safari'], language: 'fi' }
    },

    {
      name: 'alko-webkit-sv',
      testMatch: 'alko/*.spec.js',
      use: { ...devices['Desktop Safari'], language: 'sv' }
    },

    {
      name: 'alko-webkit-en',
      testMatch: 'alko/*.spec.js',
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
