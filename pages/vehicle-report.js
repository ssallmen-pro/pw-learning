import { RekkariPage } from './rekkari-page'

class VehicleReportPage extends RekkariPage {
  // class VehicleReportPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.url = {
      fi: 'https://02rekkari.fi/esimerkkiraportti/',
      sv: 'https://02rekkari.fi/sv/exempelrapport/',
      en: 'https://02rekkari.fi/en/example-search/'
    }
    this.headerText = {
      fi: 'Esimerkkiraportti',
      sv: 'Exempelrapport',
      en: 'Example report'
    }
    this.currentOwnersHeaderText = {
      fi: 'Nykyiset omistajat ja haltijat',
      sv: 'Nuvarande ägare och innehavare',
      en: 'Current owners and holders'
    }
    // Define locators for elements on the page
    this.registrationPlate = page.locator('#registration-plate').first()
    this.vehicleData = (fieldTitle) =>
      page
        .locator(
          `.MuiGrid-item:has(> div:text("${fieldTitle}"),p:text("${fieldTitle}")) + .MuiGrid-item`
        )
        .first()
    this.allCurrentOwners = (lang = this.lang) => page.locator(
      `div:has(> :text("${this.currentOwnersHeaderText[lang]}"))`
    )
    this.currentOwner = (ownerType) =>
      this.allCurrentOwners().locator(
        `div.MuiGrid-container:has(:text("${ownerType}"))`
      )
    this.sectionButton = (buttonTitle) =>
      page.getByRole('button', { name: buttonTitle })
    this.sectionHeading = (headingText) =>
      page.locator(`h2:text("${headingText}")`)
  }

  // Define method to open the page
  async open({ language = this.lang } = {}) {
    try {
      await this.pageHeader(language).waitFor({ timeout: 1000 })
    } catch (error) {
      await this.page.goto(this.url[language])
    }
  }
}

export { VehicleReportPage }
