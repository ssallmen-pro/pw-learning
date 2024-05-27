class AlkoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    if (this.constructor === AlkoPage) {
      throw new Error("Class is of abstract type and can't be instantiated")
    };

    this.page = page
    this.lang = 'fi'
    this.translations = new Translations()
    // Define locators for elements on the page
    this.pageMain = page.getByRole('main')
    this.pageHeader = () => this.pageMain.locator('h2').first().getByText(this.translation('mainHeader'))
    this.cookieAlert = page.getByRole('alertdialog', { name: 'Better services with cookies' })
    this.acceptNecessaryCookiesButton = this.cookieAlert.getByRole('button', { name: 'Only Strictly Necessary Cookies' })
    this.acceptAllCookiesButton = this.cookieAlert.getByRole('button', { name: 'Accept All Cookies' })
    this.mainNavigationHeader = page.locator('#js-main-header >> nav.header-container')
    this.languageChanger = this.mainNavigationHeader.locator('li.change-locale')
    this.activeLanguage = async () => (await this.languageChanger.getAttribute('aria-label')).toLowerCase()
    this.languageSelector = (lang) => this.languageChanger.getByRole('link', { name: lang.toUpperCase() })
    this.navigationMenuItem = (menu) => this.mainNavigationHeader.locator(`li.menu-item[data-page-id="${menu}"]`)
    this.shoppingCart = this.mainNavigationHeader.getByLabel('Shopping cart Menu Icon')
  }

  // Define methods to interact with the elements on the page
  async acceptCookies(all = false) {
    try {
      if (all) {
        await this.acceptAllCookiesButton.click({ timeout: 3000 })
      } else {
        await this.acceptNecessaryCookiesButton.click({ timeout: 3000 })
      }
    } catch (error) {
      console.log('No cookies to accept')
    }
  }

  translation(field) {
    return this.translations.get(this.lang, field)
  }

  async selectLanguage(lang) {
    if (lang !== await this.activeLanguage()) {
      await this.languageChanger.hover()
      await this.languageSelector(lang).click()
    }
    this.lang = lang
  }

  async goToMenuItem(item) {
    const allowedMenuItems = ['products', 'stores', 'food-and-drinks', 'services-shopping', 'responsibly', 'business-customer']
    if (!allowedMenuItems.includes(item)) {
      throw new Error(
        `Invalid menu item: ${item}. Allowed menu items are: ${allowedMenuItems.join(
          ', '
        )}`
      )
    }
    await this.navigationMenuItem(item).click()
  }

  async isOpen({
    timeout = 10000
  } = {}) {
    try {
      await this.pageHeader().waitFor({ timeout })
      return true
    } catch (error) {
      console.log(`Expected page is not open: ${error}`)
      return false
    }
  }
}

class Translations {
  #translations

  constructor(translations = { fi: { mainHeader: '' }, sv: { mainHeader: '' }, en: { mainHeader: '' } }) {
    this.#translations = translations
  }

  get(language, field) {
    return this.#translations[language][field]
  }
}

export { AlkoPage, Translations }
