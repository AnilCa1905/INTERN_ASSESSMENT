import { Page } from "@playwright/test";

/**
 * BasePage class for the Demo Automation Testing site.
 * Handles navigation using the SECONDARY_BASE_URL.
 */
export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }


}
