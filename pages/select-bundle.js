exports.BundleSelectionPage = class BundleSelectionPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.url = 'https://02rekkari.fi/tuotteet'
    // Define locators for elements on the page
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler')
    this.pageHeader = page.locator('h1')
    this.regPlate = page.locator('#registration-plate')
    this.bundleTypeButton = (type) => page.locator(`#bundle-${type}`)
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

  async selectBundle(bundleType) {
    const allowedBundles = ['basic', 'phone', 'full', 'lite']
    if (!allowedBundles.includes(bundleType)) {
      throw new Error(
        `Invalid bundle type: ${bundleType}. Allowed bundle types are: ${allowedBundles.join(
          ', '
        )}`
      )
    }
    await this.bundleTypeButton(bundleType).click()
  }
}
