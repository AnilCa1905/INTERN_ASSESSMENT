import { Page, expect } from "@playwright/test";

/**
 * CommonPage provides reusable helper methods for all page objects.
 */
export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a given URL and verifies page load.
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>}
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    await expect(this.page).toHaveURL(url);
  }

  /**
   * Waits for the page’s main content to load.
   * @param {string} selector - CSS or XPath selector for a key element.
   * @returns {Promise<void>}
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: "visible" });
  }

  /**
   * Captures a screenshot for debugging or reports.
   * @param {string} name - Screenshot filename.
   * @returns {Promise<void>}
   */
  async captureScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./artifacts/screenshots/${name}.png`, fullPage: true });
  }
}
