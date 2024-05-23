class RekkariPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    if (this.constructor === RekkariPage) {
      throw new Error("Class is of abstract type and can't be instantiated")
    };

    this.page = page
    this.lang = 'fi'
    this.headerText = { fi: '', sv: '', en: '' }
    // Define locators for elements on the page
    this.pageHeader = (language = this.lang) => page.locator('#page-header').getByText(this.headerText[language])
    this.languageSelector = (lang) => page.locator(`#lang-switcher-${lang}`)
    this.mainNavigationHeader = page.locator('#main-navigation-header')
    this.activeLanguageButton = this.mainNavigationHeader.locator('div.MuiBox-root > div[role="group"] > button.Mui-selected')
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler')
  }

  // Define methods to interact with the elements on the page
  async acceptCookies() {
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 })
    } catch (error) {
      console.log('No cookies to accept')
    }
  }

  async selectLanguage(lang) {
    await this.languageSelector(lang).click()
    this.lang = lang
  }

  async activeLanguage() {
    return (await this.activeLanguageButton.getAttribute('id')).replace('lang-switcher-', '')
  }

  async isOpen({
    timeout = 10000
  } = {}) {
    try {
      await this.pageHeader().waitFor({ timeout })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export { RekkariPage }
