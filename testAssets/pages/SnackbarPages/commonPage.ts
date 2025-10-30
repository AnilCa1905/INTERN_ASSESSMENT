import { Page, expect, Locator } from "@playwright/test";

/**
 * @class CommonPage
 * @classdesc
 * Base page class containing common Playwright utility methods used across all page objects.
 * Provides reusable navigation and element visibility helpers.
 */
export class CommonPage {
  readonly page: Page;

  /**
   * Initializes the CommonPage with a Playwright Page instance.
   *
   * @param {Page} page - The Playwright Page object for interacting with the browser.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL and waits for the DOM to be fully loaded.
   *
   * @async
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} Resolves once the navigation is complete.
   * @throws {Error} If the navigation times out or fails to load.
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }

  /**
   * Waits for a given locator to become visible within a specified timeout period.
   *
   * @async
   * @param {Locator} locator - The Playwright Locator representing the target element.
   * @param {number} [timeout=5000] - Optional timeout in milliseconds (default is 5000).
   * @returns {Promise<void>} Resolves when the element becomes visible.
   * @throws {Error} If the element does not become visible within the timeout.
   */
  async waitForElementVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Waits for a given locator to become hidden within a specified timeout period.
   *
   * @async
   * @param {Locator} locator - The Playwright Locator representing the target element.
   * @param {number} [timeout=5000] - Optional timeout in milliseconds (default is 5000).
   * @returns {Promise<void>} Resolves when the element becomes hidden.
   * @throws {Error} If the element does not become hidden within the timeout.
   */
  async waitForElementHidden(locator: Locator, timeout: number = 5000): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }
}
