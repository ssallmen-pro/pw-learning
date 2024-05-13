const { test, expect } = require('../fixtures/report-test')

test.describe('Title and Registration Number', () => {
  test('Check the page title', async ({ vehicleReportPage }) => {
    await expect(vehicleReportPage.pageHeader).toBeVisible()
  })
  test('Check the registration number', async ({ vehicleReportPage }) => {
    await expect(vehicleReportPage.registrationPlate).toHaveText('ABC-123')
  })
})

test.describe('Vehicle Data', () => {
  const testData = [
    { fieldTitle: 'Väri', fieldValue: 'Valkoinen (valkoinen)' },
    { fieldTitle: 'Valmistenumero', fieldValue: 'XLB34350M4C3H3K54' },
    { fieldTitle: 'Seuraava katsastusaikaväli', fieldValue: '20.5.2022 - 10.6.2024' },
    { fieldTitle: 'Rekisterikilven malli', fieldValue: 'Matala' }
  ]

  testData.forEach(({ fieldTitle, fieldValue }) => {
    test(`Check the ${fieldTitle} of the vehicle`, async ({ vehicleReportPage }) => {
      await expect(vehicleReportPage.vehicleData(fieldTitle)).toHaveText(fieldValue)
    })
  })
})

test.describe('Vehicle owner Data', () => {
  const testData = [
    { ownerType: '1.omistaja', ownerData: /.*01001234.*/ },
    { ownerType: '1.omistaja', ownerData: /.*Esimerkkiyritys Oy.*/ },
    { ownerType: '1. haltija', ownerData: /.*Meikäläinen Matti.*/ },
    { ownerType: '1. haltija', ownerData: /.*0401234567.*/ },
    { ownerType: 'Muu haltija', ownerData: /.*Meikäläinen Maija.*/ },
    { ownerType: 'Muu haltija', ownerData: /.*0407654321.*/ }
  ]

  testData.forEach(({ ownerType, ownerData }) => {
    test(`Check the ${ownerType} of the car has data ${ownerData}`, async ({ vehicleReportPage }) => {
      await expect(vehicleReportPage.currentOwner(ownerType)).toHaveText(ownerData)
    })
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
