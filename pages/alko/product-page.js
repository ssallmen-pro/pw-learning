import { AlkoPage, Translations } from './alko-page'

class ProductPage extends AlkoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.translations = new ProductTranslations()
    this.url = {
      fi: './tuotteet',
      sv: './sv/tuotteet',
      en: './en/tuotteet'
    }
    // Override pageHeader locator for this page
    this.pageHeader = () => this.pageMain.locator('.product-info').getByText(this.translation('mainHeader'))

    // Define other locators for elements on the page
    this.productMain = page.locator('div.product-main')
    this.productDetails = page.locator('div.product-details')
    this.productName = this.productMain.locator('h1.product-name')
    this.productPriceAndVolume = this.productMain.locator('div.price-splash')
    this.productPrice = async () => {
      const parts = (await this.productPriceAndVolume.locator('.price-part').all()).map(async (part) => await part.textContent())
      return parseFloat((await Promise.all(parts)).join('.'))
    }
    this.productVolume = this.productPriceAndVolume.locator('.volume')
    this.productInfoAccordion = this.productDetails
      .locator('div.product-info')
      .getByRole('tablist')
    this.productFacts = this.productInfoAccordion.locator('div.hard-facts')
    this.productTaste = this.productInfoAccordion.locator('div.taste-section')
    this.productFact = (field) => this.productFacts.locator(`li:has(div.fact-label:text-is('${field.toUpperCase()}')) > div.fact-data`)
  }

  // Define methods to interact with the elements on the page
  async open(productId) {
    await this.page.goto(this.url[this.lang] + `/${productId.toString().padStart(6, '0')}`)
  }
}

// Text translations for the page
class ProductTranslations extends Translations {
  constructor() {
    super({
      fi: {
        mainHeader: 'Tuotetiedot',
        productId: 'tuotenumero',
        alcohol: 'alkoholi',
        sugar: 'sokeri',
        deposit: 'pantti',
        packaging: 'pakkaus',
        closure: 'suljenta',
        producer: 'valmistaja/valmistuttaja',
        selection: 'valikoima'
      },
      sv: {
        mainHeader: 'Produktinformation',
        productId: 'varunummer',
        alcohol: 'alkohol',
        sugar: 'socker',
        deposit: 'pant',
        packaging: 'förpackning',
        closure: 'förslutning',
        producer: 'producent',
        selection: 'sortiment'
      },
      en: {
        mainHeader: 'Product details',
        productId: 'product number',
        alcohol: 'alcohol',
        sugar: 'sugar',
        deposit: 'deposit',
        packaging: 'packaging',
        closure: 'closure',
        producer: 'producer',
        selection: 'selection'
      }
    })
  }
}

export { ProductPage, ProductTranslations }
