const { RekkariPage } = require('./rekkari-page')

exports.VehicleSearchPage = class VehicleSearchPage extends RekkariPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    // Define locators for elements on the page
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler')
    this.searchForRegId = page.getByPlaceholder('ABC-123')
    this.searchButton = page.locator('#search-submit')
    this.vehicleTypeButton = (type) => page.locator(`#search-${type}`)
  }

  // Define method to open the page
  async open() {
    await this.page.goto(this.url)
  }

  // Define methods to interact with the elements on the page
  async searchForVehicle(type, regId) {
    await this.searchForRegId.fill(regId)
    await this.vehicleTypeButton(type).click()
    await this.searchButton.click()
  }
}
