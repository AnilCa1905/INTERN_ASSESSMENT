import { Page } from "@playwright/test";

/**
 * BasePage class for QA Playground.
 * Handles navigation using the BASE_URL.
 */
export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path within the QA Playground application.
   * @param {string} [path=""] - Optional path to append to the BASE_URL.
   */
  async navigate(path: string = ""): Promise<void> {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL is not defined in the .env file");
    }
    await this.page.goto(`${baseUrl}${path}`);
  }

  /** Check if an element is visible on the page. */
  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }
}
