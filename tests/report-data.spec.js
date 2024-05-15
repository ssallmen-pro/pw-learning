const { test, expect } = require('../fixtures/report-test')

test('Check the owner data values', async ({ vehicleReportPage, language }) => {
  const testData = {
    fi: [
      { ownerType: '1.omistaja', ownerData: /.*01001234.*/ },
      { ownerType: '1.omistaja', ownerData: /.*Esimerkkiyritys Oy.*/ },
      { ownerType: '1. haltija', ownerData: /.*Meikäläinen Matti.*/ },
      { ownerType: '1. haltija', ownerData: /.*0401234567.*/ },
      { ownerType: 'Muu haltija', ownerData: /.*Meikäläinen Maija.*/ },
      { ownerType: 'Muu haltija', ownerData: /.*0407654321.*/ }
    ],
    sv: [
      { ownerType: '1 ägaren', ownerData: /.*01001234.*/ },
      { ownerType: '1 ägaren', ownerData: /.*Esimerkkiyritys Oy.*/ },
      { ownerType: '1 innehavaren', ownerData: /.*Meikäläinen Matti.*/ },
      { ownerType: '1 innehavaren', ownerData: /.*0401234567.*/ },
      { ownerType: 'Annan innehavaren', ownerData: /.*Meikäläinen Maija.*/ },
      { ownerType: 'Annan innehavaren', ownerData: /.*0407654321.*/ }
    ],
    en: [
      { ownerType: 'First owner', ownerData: /.*01001234.*/ },
      { ownerType: 'First owner', ownerData: /.*Esimerkkiyritys Oy.*/ },
      { ownerType: 'First operator', ownerData: /.*Meikäläinen Matti.*/ },
      { ownerType: 'First operator', ownerData: /.*0401234567.*/ },
      { ownerType: 'Other operator', ownerData: /.*Meikäläinen Maija.*/ },
      { ownerType: 'Other operator', ownerData: /.*0407654321.*/ }
    ]
  }

  for (const { ownerType, ownerData } of testData[language]) {
    await test.step(`Check the ${ownerType} of the car has data ${ownerData}`, async () => {
      await expect(vehicleReportPage.currentOwner(ownerType)).toHaveText(ownerData)
    })
  }
})

test('Check the vehicle data values', async ({ vehicleReportPage, language }) => {
  const testData = {
    fi: [
      { fieldTitle: 'Väri', fieldValue: 'Valkoinen (valkoinen)' },
      { fieldTitle: 'Valmistenumero', fieldValue: 'XLB34350M4C3H3K54' },
      { fieldTitle: 'Seuraava katsastusaikaväli', fieldValue: '20.5.2022 - 10.6.2024' },
      { fieldTitle: 'Rekisterikilven malli', fieldValue: 'Matala' }
    ],
    sv: [
      { fieldTitle: 'Färg', fieldValue: 'Vit (vit)' },
      { fieldTitle: 'Tillverkningsnummer', fieldValue: 'XLB34350M4C3H3K54' },
      { fieldTitle: 'Nästa besiktningsperiod', fieldValue: '2022-05-20 - 2024-06-10' },
      { fieldTitle: 'Registreringsskylt form', fieldValue: 'Låg' }
    ],
    en: [
      { fieldTitle: 'Colour', fieldValue: 'White (white)' },
      { fieldTitle: 'Vehicle identification number', fieldValue: 'XLB34350M4C3H3K54' },
      { fieldTitle: 'Next annual inspection to be done', fieldValue: '5/20/2022 - 6/10/2024' },
      { fieldTitle: 'Registration plate shape', fieldValue: 'Low' }
    ]
  }

  for (const { fieldTitle, fieldValue } of testData[language]) {
    await test.step(`Check the ${fieldTitle} of the vehicle`, async () => {
      await expect(vehicleReportPage.vehicleData(fieldTitle)).toHaveText(fieldValue)
    })
  }
})
