const base = require('@playwright/test')
const { VehicleReportPage } = require('../pages/vehicle-report')

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
  language: ['fi', { option: true }],
  vehicleReportPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const vehicleReportPage = new VehicleReportPage(page)
    vehicleReportPage.lang = language
    await vehicleReportPage.open()
    await vehicleReportPage.acceptCookies()
    // Use the fixture value in the test.
    await use(vehicleReportPage)
  }
})

exports.expect = base.expect
