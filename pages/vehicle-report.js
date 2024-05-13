exports.VehicleReportPage = class VehicleReportPage {
  // class VehicleReportPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.url = 'https://02rekkari.fi/esimerkkiraportti/'
    this.headerText = 'Esimerkkiraportti'
    // Define locators for elements on the page
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All' })
    this.pageHeader = page.locator('#page-header').getByText(this.headerText)
    this.registrationPlate = page.locator('#registration-plate').first()
    this.vehicleData = (fieldTitle) =>
      page
        .locator(
          `.MuiGrid-item:has(> div:text("${fieldTitle}"),p:text("${fieldTitle}")) + .MuiGrid-item`
        )
        .first()
    this.allCurrentOwners = page.locator(
      'div:has(> :text("Nykyiset omistajat ja haltijat"))'
    )
    this.currentOwner = (ownerType) =>
      this.allCurrentOwners.locator(
        `div.MuiGrid-container:has(:text("${ownerType}"))`
      )
    this.sectionButton = (buttonTitle) =>
      page.getByRole('button', { name: buttonTitle })
    this.sectionHeading = (headingText) =>
      page.locator(`h2:text("${headingText}")`)
  }

  // Define method to open the page
  async open() {
    try {
      await this.pageHeader().waitFor({ timeout: 1000 })
    } catch (error) {
      await this.page.goto(this.url)
    }
  }

  // Define methods to interact with the elements on the page
  async acceptCookies() {
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 })
    } catch (error) {
      console.log('No cookies to accept')
    }
  }
}

// export { VehicleReportPage };
