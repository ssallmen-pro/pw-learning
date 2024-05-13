const { expect } = require('@playwright/test')
// const { expect } = require('../fixtures/rekkari-test')
const { VehicleReportPage } = require('../pages/vehicle-report')

exports.PaymentPage = class PaymentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    // Define locators for elements on the page
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler')
    this.pageHeader = page.locator('h1')
    this.regPlate = page.locator('#registration-plate')
    this.bundleName = page.locator('#summary-bundle-title')
    this.bundlePrice = page.locator('#summary-bundle-price')
    this.showMoreButton = page.locator('#summary-bundle-show-more')
    this.closeMoreButton = page.locator('#bundle-info-close')
    this.bundleInfoDialog = async () => page.getByRole('presentation').getByRole('heading', { name: await this.bundleName.textContent() })
    this.paymentEmail = page.locator('#payment-email')
    this.consentRulesCheckbox = page.locator('#consent-checkbox')
    this.paymentTypeButton = (type) => page.locator(`#payment-type-${type}`)
    this.continueButton = page.locator('#payment-continue')
  }

  // Define methods to interact with the elements on the page
  async acceptCookies() {
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 })
    } catch (error) {
      console.log('No cookies to accept')
    }
  }

  async openBundleInfo() {
    await this.showMoreButton.click()
  }

  async closeBundleInfo() {
    await this.closeMoreButton.click()
  }

  async selectPaymentType(paymentType) {
    const allowedTypes = ['bank', 'siirto', 'mobilepay', 'mobile', 'creditcard', 'pivo', 'phone']
    if (!allowedTypes.includes(paymentType)) {
      throw new Error(
        `Invalid payment type: ${paymentType}. Allowed bundle types are: ${allowedTypes.join(
          ', '
        )}`
      )
    }
    await this.paymentTypeButton(paymentType).click()
  }

  async fillPaymentEmail(email) {
    await this.paymentEmail.fill(email)
  }

  async consentRules() {
    await this.consentRulesCheckbox.check()
  }

  async declineRules() {
    await this.consentRulesCheckbox.uncheck()
  }

  async payTheReport() {
    await expect(this.continueButton).toBeEnabled()
    new VehicleReportPage(this.page).open()
  }
}
