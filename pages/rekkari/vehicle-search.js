import { RekkariPage } from './rekkari-page'

class VehicleSearchPage extends RekkariPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.url = {
      fi: 'https://02rekkari.fi/',
      sv: 'https://02rekkari.fi/sv/',
      en: 'https://02rekkari.fi/en/'
    }
    this.headerText = {
      fi: 'Ajoneuvon ja veneen tiedot nopeasti rekisterinumerohaulla',
      sv: 'Fordons- och farkostuppgifter snabbt med en registernummersökning',
      en: 'Vehicle and boat details quickly with a registration number search'
    }
    // Define locators for elements on the page
    this.searchForRegId = page.getByPlaceholder('ABC-123')
    this.searchButton = page.locator('#search-submit')
    this.vehicleTypeButton = (type) => page.locator(`#search-${type}`)
  }

  // Define method to open the page
  async open() {
    await this.page.goto(this.url[this.lang])
  }

  // Define methods to interact with the elements on the page
  async searchForVehicle(type, regId) {
    await this.searchForRegId.fill(regId)
    await this.vehicleTypeButton(type).click()
    await this.searchButton.click()
  }
}

export { VehicleSearchPage }
