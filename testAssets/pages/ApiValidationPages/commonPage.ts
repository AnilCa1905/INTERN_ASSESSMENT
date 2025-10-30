// testAssets/pages/commonPage.ts

import { Page, Locator } from '@playwright/test';

/**
 * Represents the common elements and actions available across multiple pages
 * of the Automation Exercise website.
 */
export class CommonPage {
  /** Playwright Page instance used for browser interactions */
  readonly page: Page;

  /** Locator for the website logo element */
  readonly logo: Locator;

  /** Locator for the "Products" link in the navigation bar */
  readonly productsUiLink: Locator;

  /**
   * Initializes the CommonPage with commonly used locators.
   * @param {Page} page - The Playwright Page instance.
   */
  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('//div[@class="logo pull-left"]');
    this.productsUiLink = page.locator('//a[@href="/products"]');
  }

  /**
   * Navigates to the homepage of the Automation Exercise website.
   * @async
   * @returns {Promise<void>} A promise that resolves when navigation is complete.
   */
  async GoToHomeUrl(): Promise<void> {
    await this.page.goto('https://automationexercise.com/');
  }
}
