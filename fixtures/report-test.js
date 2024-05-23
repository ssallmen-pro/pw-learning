import { test as base } from '@playwright/test'
import { VehicleReportPage } from '../pages/rekkari/vehicle-report'

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.test.extend({
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

export { test }
export { expect } from '@playwright/test'
