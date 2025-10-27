import { Page } from "@playwright/test";

/**
 * BasePage class for the Demo Automation Testing site.
 * Handles navigation using the SECONDARY_BASE_URL.
 */
export default class SecondaryBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path within the Demo Automation site.
   * @param {string} [path=""] - Relative path to append to SECONDARY_BASE_URL.
   */
  async navigate(path: string = ""): Promise<void> {
    const baseUrl = process.env.SECONDARY_BASE_URL;
    if (!baseUrl) {
      throw new Error("SECONDARY_BASE_URL is not defined in the .env file");
    }
    await this.page.goto(`${baseUrl}${path}`);
  }

  /** Check if an element is visible on the page. */
  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }
}

