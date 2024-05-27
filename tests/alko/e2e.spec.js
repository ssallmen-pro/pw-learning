import { test, expect } from '../../fixtures/alko-test'

test('Search for a famous Finnish product called Jaloviina', async ({
  alkoMainPage,
  productListPage,
  productPage,
  language,
  browserName
}) => {
  const testData = {
    fi: {
      productNumber: { name: 'tuotenumero', value: '107067' },
      package: { name: 'pakkaus', value: 'pullo' }
    },
    sv: {
      productNumber: { name: 'varunummer', value: '107067' },
      package: { name: 'förpackning', value: 'flaska' }
    },
    en: {
      productNumber: { name: 'product number', value: '107067' },
      package: { name: 'packaging', value: 'bottle' }
    }
  }

  test.slow(browserName === 'webkit', 'This feature is slow in Safari')
  await test.step('Open the main page and accept cookies', async () => {
    await alkoMainPage.open()
    await expect(await alkoMainPage.isOpen()).toEqual(true)
    await alkoMainPage.acceptCookies()
    await expect(await alkoMainPage.activeLanguage()).toEqual(language)
  })
  await test.step('Go to webshop', async () => {
    await alkoMainPage.goToMenuItem('products')
    await expect(await productListPage.isOpen()).toEqual(true)
  })
  await test.step('Search for Jaloviina', async () => {
    await productListPage.searchForProduct('Jaloviina')
    await expect(await productListPage.productCount()).toBeLessThan(20)
  })
  await test.step('Open "Jaloviina *"', async () => {
    await productListPage.productDetails({ id: 107067 }).click()
    // await productListPage.page.pause()
    await expect(await productPage.isOpen()).toEqual(true)
    await expect(productPage.productName).toHaveText('Jaloviina *')
    await expect(await productPage.productPrice()).toEqual(26.99)
    await expect(productPage.productVolume).toHaveText('0.7 l')
    await expect(productPage.productFact(testData[language].productNumber.name)).toHaveText(testData[language].productNumber.value)
    await expect(productPage.productFact(testData[language].package.name)).toHaveText(testData[language].package.value)
  })
})
