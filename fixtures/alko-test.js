import { test as base } from '@playwright/test'
import { AlkoMainPage } from '../pages/alko/main-page'
import { ProductListPage } from '../pages/alko/product-list-page'
import { ProductPage } from '../pages/alko/product-page'

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.test.extend({
  language: ['fi', { option: true }],
  alkoMainPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const alkoMainPage = new AlkoMainPage(page)
    alkoMainPage.lang = language
    // Use the fixture value in the test.
    await use(alkoMainPage)
  },
  productListPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const productListPage = new ProductListPage(page)
    productListPage.lang = language
    // Use the fixture value in the test.
    await use(productListPage)
  },
  productPage: async ({ page, language }, use) => {
    // Set up the fixture.
    const productPage = new ProductPage(page)
    productPage.lang = language
    // Use the fixture value in the test.
    await use(productPage)
  }
})

export { test }
export { expect } from '@playwright/test'
