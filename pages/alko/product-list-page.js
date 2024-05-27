import { AlkoPage, Translations } from './alko-page'

class ProductListPage extends AlkoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.url = {
      fi: './tuotteet',
      sv: './sv/tuotteet',
      en: './en/tuotteet'
    }
    this.translations = new ProductListTranslations()

    // Define locators for elements on the page
    this.searchField = () => page.getByPlaceholder(this.translation('searchPlaceholder'))
    this.searchButton = () => page.getByRole('button', { name: this.translation('searchButtonText') })
    this.productCount = async () => {
      await page.waitForLoadState('networkidle')
      return parseInt((await page.locator('h3.product-count > strong').first().innerText()).replace(/\s/g, ''))
    }
    this.productList = page.locator('#js-product-list')
    this.productDetails = ({ id, name } = {}) => {
      if (id) {
        return this.productList.locator(`*[role='listitem']:has(#product-tile-${id.toString().padStart(6, '0')})`)
      }
      return this.productList.locator(`*[role='listitem']:has(a.js-product-link[title='${name}'])`)
    }
  }

  // Define method to open the page
  async open() {
    await this.page.goto(this.url[this.lang])
  }

  // Define methods to interact with the elements on the page
  async searchForProduct(text) {
    await this.searchField().fill(text)
    await this.searchButton().click()
  }
}

// Text translations for the page
class ProductListTranslations extends Translations {
  constructor() {
    super({
      fi: {
        mainHeader: 'TUOTTEET',
        searchPlaceholder: 'Hae tuotteista',
        searchButtonText: 'Hae tuotteita'
      },
      sv: {
        mainHeader: 'PRODUKTER',
        searchPlaceholder: 'Sök från produkter',
        searchButtonText: 'Sök produkter'
      },
      en: {
        mainHeader: 'ALL PRODUCTS',
        searchPlaceholder: 'Search from products',
        searchButtonText: 'Search products'
      }
    })
  }
}

export { ProductListPage, ProductListTranslations }
