const base = require('@playwright/test')
const { VehicleReportPage } = require('../pages/vehicle-report')
const { VehicleSearchPage } = require('../pages/vehicle-search')
const { BundleSelectionPage } = require('../pages/select-bundle')
const { PaymentPage } = require('../pages/payment')

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
  vehicleSearchPage: async ({ page }, use) => {
    // Set up the fixture.
    const vehicleSearchPage = new VehicleSearchPage(page)
    // await vehicleSearchPage.open()
    // await vehicleSearchPage.acceptCookies()
    // Use the fixture value in the test.
    await use(vehicleSearchPage)
  },
  bundleSelectionPage: async ({ page }, use) => {
    // Set up the fixture.
    const bundleSelectionPage = new BundleSelectionPage(page)
    // Use the fixture value in the test.
    await use(bundleSelectionPage)
  },
  paymentPage: async ({ page }, use) => {
    // Set up the fixture.
    const paymentPage = new PaymentPage(page)
    // Use the fixture value in the test.
    await use(paymentPage)
  },
  vehicleReportPage: async ({ page }, use) => {
    // Set up the fixture.
    const vehicleReportPage = new VehicleReportPage(page)
    // Use the fixture value in the test.
    await use(vehicleReportPage)
  }
})

exports.expect = base.expect
