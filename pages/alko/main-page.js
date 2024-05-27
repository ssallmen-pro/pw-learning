import { AlkoPage, Translations } from './alko-page'

class AlkoMainPage extends AlkoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.url = {
      fi: '/',
      sv: '/sv',
      en: '/en'
    }
    this.translations = new MainTranslations()
    this.pageHeader = () => this.pageMain.locator('h2').first().getByText(this.translation('mainHeader'))
    // Define locators for elements on the page
  }

  // Define method to open the page
  async open() {
    await this.page.goto(this.url[this.lang])
  }

  // Define methods to interact with the elements on the page
}

// Text translations for the page
class MainTranslations extends Translations {
  constructor() {
    super({
      fi: {
        mainHeader: 'Anna lahjaksi makuelämyksiä'
      },
      sv: {
        mainHeader: 'Alkos presentkort nu också digitalt'
      },
      en: {
        mainHeader: 'Alko Gift Card – now available in digital format'
      }
    })
  }
}

export { AlkoMainPage, MainTranslations }
