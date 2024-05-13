const { test, expect } = require('../fixtures/rekkari-test')

test.describe('Vehicle Search', () => {
  test('Search motorcycle with reg number ABC123 and get full bundle', async ({
    vehicleSearchPage,
    bundleSelectionPage,
    paymentPage,
    vehicleReportPage
  }) => {
    await vehicleSearchPage.open()
    await vehicleSearchPage.acceptCookies()
    await vehicleSearchPage.searchForVehicle('motorcycle', 'ABC123')
    await expect(bundleSelectionPage.regPlate).toHaveText(/ABC[\s-]?123/)
    await bundleSelectionPage.selectBundle('full')
    await expect(paymentPage.regPlate).toHaveText(/ABC[\s-]?123/)
    await paymentPage.openBundleInfo()
    await expect(await paymentPage.bundleInfoDialog()).toBeVisible()
    await paymentPage.closeBundleInfo()
    await paymentPage.selectPaymentType('mobilepay')
    await paymentPage.fillPaymentEmail('foo@bar.com')
    await paymentPage.consentRules()
    // The following is not executing payment but only opening the sample report
    await paymentPage.payTheReport()
    await expect(vehicleReportPage.pageHeader).toBeVisible()
    await expect(vehicleReportPage.registrationPlate).toHaveText('ABC-123')
  })
})
