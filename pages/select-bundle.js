const { RekkariPage } = require('./rekkari-page')

exports.BundleSelectionPage = class BundleSelectionPage extends RekkariPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    // Define locators for elements on the page
    this.regPlate = page.locator('#registration-plate')
    this.bundleTypeButton = (type) => page.locator(`#bundle-${type}`)
  }

  // Define method to open the page
  async open() {
    await this.page.goto(this.url)
  }

  // Define methods to interact with the elements on the page
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
