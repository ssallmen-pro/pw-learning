import { test as base } from '@playwright/test'
import { VehicleReportPage } from '../pages/rekkari/vehicle-report'
import { VehicleSearchPage } from '../pages/rekkari/vehicle-search'
import { BundleSelectionPage } from '../pages/rekkari/select-bundle'
import { PaymentPage } from '../pages/rekkari/payment'

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.test.extend({
  language: ['fi', { option: true }],
  vehicleSearchPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const vehicleSearchPage = new VehicleSearchPage(page)
    vehicleSearchPage.lang = language
    // await vehicleSearchPage.open()
    // await vehicleSearchPage.acceptCookies()
    // Use the fixture value in the test.
    await use(vehicleSearchPage)
  },
  bundleSelectionPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const bundleSelectionPage = new BundleSelectionPage(page)
    bundleSelectionPage.lang = language
    // Use the fixture value in the test.
    await use(bundleSelectionPage)
  },
  paymentPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const paymentPage = new PaymentPage(page)
    paymentPage.lang = language
    // Use the fixture value in the test.
    await use(paymentPage)
  },
  vehicleReportPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const vehicleReportPage = new VehicleReportPage(page)
    vehicleReportPage.lang = language
    // Use the fixture value in the test.
    await use(vehicleReportPage)
  }
})

export { test }
export { expect } from '@playwright/test'
