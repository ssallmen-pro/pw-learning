const base = require('@playwright/test')
const { VehicleReportPage } = require('../pages/vehicle-report')

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
  vehicleReportPage: async ({ page }, use) => {
    // Set up the fixture.
    const vehicleReportPage = new VehicleReportPage(page)
    await vehicleReportPage.open()
    await vehicleReportPage.acceptCookies()
    // Use the fixture value in the test.
    await use(vehicleReportPage)
  }
})

exports.expect = base.expect
