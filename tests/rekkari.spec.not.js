const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('https://02rekkari.fi/esimerkkiraportti/')
  await page.click('text="Accept All"')
})

test.describe('Car Data', () => {
  const testData = [
    { fieldTitle: 'Väri', fieldValue: 'Valkoinen (valkoinen)' },
    { fieldTitle: 'Valmistenumero', fieldValue: 'XLB34350M4C3H3K54' },
    { fieldTitle: 'Seuraava katsastusaikaväli', fieldValue: '20.5.2022 - 10.6.2024' },
    { fieldTitle: 'Rekisterikilven malli', fieldValue: 'Matala' }
  ]

  testData.forEach(({ fieldTitle, fieldValue }) => {
    test(`Check the ${fieldTitle} of the car`, async ({ page }) => {
      const fieldLocator = await page.locator(`.MuiGrid-item:has(> div:text("${fieldTitle}"),p:text("${fieldTitle}")) + .MuiGrid-item`).first()
      await expect(fieldLocator).toHaveText(fieldValue)
    })
  })
})

test.describe('Owner Data', () => {
  const testData = [
    { owner: '1.omistaja', fieldValue: /.*01001234.*/ },
    { owner: '1.omistaja', fieldValue: /.*Esimerkkiyritys Oy.*/ },
    { owner: '1. haltija', fieldValue: /.*Meikäläinen Matti.*/ },
    { owner: '1. haltija', fieldValue: /.*0401234567.*/ },
    { owner: 'Muu haltija', fieldValue: /.*Meikäläinen Maija.*/ },
    { owner: 'Muu haltija', fieldValue: /.*0407654321.*/ }
  ]

  testData.forEach(({ owner, fieldValue }) => {
    test(`Check the ${owner} of the car has data ${fieldValue}`, async ({ page }) => {
      const allCurrentOwnersLocator = await page.locator('div:has(> :text("Nykyiset omistajat ja haltijat"))')
      const ownerLocator = await allCurrentOwnersLocator.locator(`div.MuiGrid-container:has(:text("${owner}"))`)
      await expect(ownerLocator).toHaveText(fieldValue)
    })
  })
})

test.describe('On page navigation', () => {
  const testData = [
    { buttonName: 'Tekniset tiedot', headingText: 'Tekniset tiedot' },
    { buttonName: 'Historiatiedot', headingText: 'Historiatiedot' },
    { buttonName: 'Hinta-arvio', headingText: 'Hinta-arvio' },
    { buttonName: 'Omistajat', headingText: 'Nykyiset omistajat ja haltijat' },
    { buttonName: 'Perustiedot', headingText: 'Perustiedot' }
  ]

  testData.forEach(({ buttonName, headingText }) => {
    test(`should navigate to ${headingText}`, async ({ page }) => {
      await page.getByRole('button', { name: buttonName }).click()
      await expect(page.locator(`h2:text("${headingText}")`)).toBeInViewport()
    })
  })
})
