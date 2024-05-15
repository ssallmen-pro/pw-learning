const { expect } = require('@playwright/test')
const { RekkariPage } = require('./rekkari-page')
const { VehicleReportPage } = require('../pages/vehicle-report')

exports.PaymentPage = class PaymentPage extends RekkariPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.headerText = {
      fi: 'Maksu',
      sv: 'Betalning',
      en: 'Payment'
    }
    // Define locators for elements on the page
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
    // This methoid simulates the actual payment finalization, with the assumption that the payment
    // is successful and that the next page to open is the vehicle report page.
    await expect(this.continueButton).toBeEnabled()
    await new VehicleReportPage(this.page).open({ language: this.lang })
  }
}
