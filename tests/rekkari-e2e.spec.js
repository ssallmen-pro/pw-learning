const { test, expect } = require('../fixtures/rekkari-test')

test('Search motorcycle with reg number ABC123 and get full bundle', async ({
  vehicleSearchPage,
  bundleSelectionPage,
  paymentPage,
  vehicleReportPage,
  language
}) => {
  await test.step('Open the main page and accept cookies', async () => {
    await vehicleSearchPage.open()
    await expect(await vehicleSearchPage.isOpen()).toEqual(true)
    await vehicleSearchPage.acceptCookies()
    await expect(await vehicleSearchPage.activeLanguage()).toEqual(language)
  })
  await test.step('Search motorcycle with reg number ABC123', async () => {
    await vehicleSearchPage.searchForVehicle('motorcycle', 'ABC123')
    await expect(await bundleSelectionPage.isOpen()).toEqual(true)
    await expect(bundleSelectionPage.regPlate).toHaveText(/ABC[\s-]?123/)
  })
  await test.step('Select full bundle', async () => {
    await bundleSelectionPage.selectBundle('full')
    await expect(await paymentPage.isOpen()).toEqual(true)
    await expect(paymentPage.regPlate).toHaveText(/ABC[\s-]?123/)
  })
  await test.step('Check the bundle info and pay for the report', async () => {
    await paymentPage.openBundleInfo()
    await expect(await paymentPage.bundleInfoDialog()).toBeVisible()
    await paymentPage.closeBundleInfo()
    await paymentPage.selectPaymentType('mobilepay')
    await paymentPage.fillPaymentEmail('foo@bar.com')
    await paymentPage.consentRules()
    // The following is not executing payment but only opening the sample report
    await paymentPage.payTheReport()
    await expect(await vehicleReportPage.isOpen()).toEqual(true)
    await expect(vehicleReportPage.registrationPlate).toHaveText('ABC-123')
  })
})
