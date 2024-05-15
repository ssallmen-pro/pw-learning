const { test, expect } = require('../fixtures/report-test')

test('Check the page title', async ({ vehicleReportPage }) => {
  await expect(vehicleReportPage.pageHeader()).toBeVisible()
})

test('Check the registration number', async ({ vehicleReportPage }) => {
  await expect(vehicleReportPage.registrationPlate).toHaveText('ABC-123')
})

test('Check on-page navigation', async ({ vehicleReportPage, language }) => {
  const testData = {
    fi: [
      { buttonName: 'Tekniset tiedot', headingText: 'Tekniset tiedot' },
      { buttonName: 'Historiatiedot', headingText: 'Historiatiedot' },
      { buttonName: 'Hinta-arvio', headingText: 'Hinta-arvio' },
      { buttonName: 'Omistajat', headingText: 'Nykyiset omistajat ja haltijat' },
      { buttonName: 'Perustiedot', headingText: 'Perustiedot' }
    ],
    sv: [
      { buttonName: 'Tekniska uppgifter', headingText: 'Tekniska uppgifter' },
      { buttonName: 'Historikuppgifter', headingText: 'Historikuppgifter' },
      { buttonName: 'Prisuppskattning', headingText: 'Prisuppskattning' },
      { buttonName: 'Ägare', headingText: 'Nuvarande ägare och innehavare' },
      { buttonName: 'Basuppgifter', headingText: 'Basuppgifter' }
    ],
    en: [
      { buttonName: 'Technical information', headingText: 'Technical information' },
      { buttonName: 'History information', headingText: 'History information' },
      { buttonName: 'Valuation', headingText: 'Valuation' },
      { buttonName: 'Owners', headingText: 'Current owners and holders' },
      { buttonName: 'Basic information', headingText: 'Basic information' }
    ]
  }

  // await new Promise((resolve) => setTimeout(resolve, 1000))
  for (const { buttonName, headingText } of testData[language]) {
    await test.step(`Should navigate to ${headingText}`, async () => {
      await vehicleReportPage.sectionButton(buttonName).click()
      await expect(vehicleReportPage.sectionHeading(headingText)).toBeInViewport()
    })
  }
})
