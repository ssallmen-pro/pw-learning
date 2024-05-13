exports.VehicleSearchPage = class VehicleSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.url = 'https://02rekkari.fi/'
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
  async acceptCookies() {
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 })
    } catch (error) {
      console.log('No cookies to accept')
    }
  }

  async searchForVehicle(type, regId) {
    await this.searchForRegId.fill(regId)
    await this.vehicleTypeButton(type).click()
    await this.searchButton.click()
  }
}
