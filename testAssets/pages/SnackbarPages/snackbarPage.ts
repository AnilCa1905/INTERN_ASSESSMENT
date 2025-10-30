
 import { Page, Locator } from '@playwright/test';
import { CommonPage } from './commonPage';

/**
 * Page Object representing the W3Schools Snackbar demo page.
 * Contains only reusable actions and element getters — 
 * no direct test assertions.
 */
export class SnackbarPage extends CommonPage {
  readonly showButton: Locator;
  readonly snackbar: Locator;

  constructor(page: Page) {
    super(page);
    this.showButton = page.locator('//button[text()="Show Snackbar"]');
    this.snackbar = page.locator('//div[@class="showsnack"]');
  }

  /**
   * Navigates to the W3Schools Snackbar demo page.
   * @returns {Promise<void>} Resolves after page load completes.
   */
  async navigate(): Promise<void> {
    await this.navigateTo('https://www.w3schools.com/howto/howto_js_snackbar.asp');
  }

  /**
   * Clicks the "Show Snackbar" button.
   * @returns {Promise<void>} Resolves after click completes.
   */
  async clickShowSnackbar(): Promise<void> {
    await this.showButton.click();
  }

  /**
   * Waits for the snackbar to appear (become visible).
   * @param timeout Optional timeout in ms. Default: 5000
   * @returns {Promise<void>} Resolves once visible.
   */
  async waitForSnackbarVisible(timeout: number = 5000): Promise<void> {
    await this.snackbar.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits for the snackbar to disappear (become hidden).
   * @param timeout Optional timeout in ms. Default: 7000
   * @returns {Promise<void>} Resolves once hidden.
   */
  async waitForSnackbarHidden(timeout: number = 7000): Promise<void> {
    await this.snackbar.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Checks if the snackbar is currently visible.
   * @returns {Promise<boolean>} True if visible, else false.
   */
  async isSnackbarVisible(): Promise<boolean> {
    return await this.snackbar.isVisible();
  }
}
