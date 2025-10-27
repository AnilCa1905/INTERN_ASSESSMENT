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


}
