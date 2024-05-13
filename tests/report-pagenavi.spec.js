const { test, expect } = require('../fixtures/report-test')

test.describe('Title and Registration Number', () => {
  test('Check the page title', async ({ vehicleReportPage }) => {
    await expect(vehicleReportPage.pageHeader).toBeVisible()
  })
  test('Check the registration number', async ({ vehicleReportPage }) => {
    await expect(vehicleReportPage.registrationPlate).toHaveText('ABC-123')
  })
})

test.describe('On-page navigation', () => {
  const testData = [
    { buttonName: 'Tekniset tiedot', headingText: 'Tekniset tiedot' },
    { buttonName: 'Historiatiedot', headingText: 'Historiatiedot' },
    { buttonName: 'Hinta-arvio', headingText: 'Hinta-arvio' },
    { buttonName: 'Omistajat', headingText: 'Nykyiset omistajat ja haltijat' },
    { buttonName: 'Perustiedot', headingText: 'Perustiedot' }
  ]

  testData.forEach(({ buttonName, headingText }) => {
    test(`Should navigate to ${headingText}`, async ({ vehicleReportPage }) => {
      await vehicleReportPage.sectionButton(buttonName).click()
      await expect(vehicleReportPage.sectionHeading(headingText)).toBeInViewport()
    })
  })
})
