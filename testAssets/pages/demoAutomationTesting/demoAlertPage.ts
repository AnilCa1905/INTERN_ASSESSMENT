import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../qaPlayGround/basePage";

/**
 * Page Object for handling different types of alerts:
 * - Simple alert (OK)
 * - Confirm alert (OK / Cancel)
 * - Prompt alert (Type text / cancel)
 */
export default class DemoAlertPage extends BasePage {
  readonly switchToLink: Locator;
  readonly alertsLink: Locator;
  readonly okTabButton: Locator;
  readonly confirmAlertLink: Locator;
  readonly confirmAlertButton: Locator;
  readonly promptAlertLink: Locator;
  readonly promptAlertButton: Locator;
  readonly promptMessage: (text: string) => Locator;
  readonly defaultPromptMessage: Locator;
  readonly messagePressedOk: Locator;
  readonly messagePressedCancel: Locator;
  /**
   * Initializes all locators required for handling alerts
   * @param {Page} page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.switchToLink = page.locator('//a[text()="SwitchTo"]');
    this.alertsLink = page.locator('//a[text()="Alerts"]');
    this.okTabButton = page.locator('//div[@id="OKTab"]//button');
    this.messagePressedOk = page.locator('//p[text()="You pressed Ok"]');
    this.messagePressedCancel = page.locator(
      '//p[text()="You Pressed Cancel"]'
    );
    this.confirmAlertLink = page.locator(
      '//a[text()="Alert with OK & Cancel "]'
    );
    this.confirmAlertButton = page.locator(
      '//button[text()="click the button to display a confirm box "]'
    );
    this.promptAlertLink = page.locator('//a[text()="Alert with Textbox "]');
    this.promptAlertButton = page.locator(
      '//button[text()="click the button to demonstrate the prompt box "]'
    );
    this.promptMessage = (text: string) =>
      page.locator(`//p[text()="Hello ${text} How are you today"]`);
    this.defaultPromptMessage = page.locator(
      '//p[text()="Hello prompt How are you today"]'
    );
  }
  /**
   * Handles a simple alert by clicking OK
   * @returns {Promise<boolean>} True if alert was handled
   */
  async handleAlertFlow(): Promise<boolean> {
    await this.switchToLink.click();
    await this.alertsLink.click();

    // Handle the alert and click simultaneously
    await Promise.all([
      this.page.waitForEvent("dialog").then((dialog) => dialog.accept()),
      this.okTabButton.click(),
    ]);

    // Verify that the button is visible again after the alert is handled
    await expect(this.okTabButton).toBeVisible();

    return true;
  }

  /**
   * Handles confirm alert and clicks OK
   * @returns {Promise<boolean>} True if alert was handled
   */
  async handleConfirmAlertOk(): Promise<boolean> {
    await this.switchToLink.click();
    await this.alertsLink.click();
    await this.confirmAlertLink.click();

    // Set up listener for confirm alert
    this.page.once("dialog", async (dialog) => {
      await dialog.accept(); // click OK on alert
    });

    // Trigger the confirm alert
    await this.confirmAlertButton.click();

    // After alert is handled, ensure the button is visible again
    await expect(this.messagePressedOk).toBeVisible();

    return true;
  }

  /**
   * Handles confirm alert and clicks Cancel
   * @returns {Promise<boolean>} True if alert was dismissed
   */
  async handleConfirmAlertCancel(): Promise<boolean> {
    await this.switchToLink.click();
    await this.alertsLink.click();
    await this.confirmAlertLink.click();
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    await this.confirmAlertButton.click();
    await expect(this.messagePressedCancel).toBeVisible();
    return true;
  }

  /**
   * Handles prompt alert, enters text, clicks OK, and verifies message
   * @param {string} promptText - Text to enter in prompt
   * @returns {Promise<boolean>} True if message is visible
   */
  async handlePromptAlertOk(promptText: string): Promise<boolean> {
    await this.switchToLink.click();
    await this.alertsLink.click();
    await this.promptAlertLink.click();

    this.page.once("dialog", async (dialog) => {
      await dialog.accept(promptText);
    });

    await this.promptAlertButton.click();
    return await this.promptMessage(promptText).isVisible();
  }

  /**
   * Handles prompt alert and clicks Cancel, verifies no message is displayed
   * @returns {Promise<boolean>} True if message is not visible
   */
  async handlePromptAlertCancel(): Promise<boolean> {
    await this.switchToLink.click();
    await this.alertsLink.click();
    await this.promptAlertLink.click();

    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });

    await this.promptAlertButton.click();
    await expect(this.defaultPromptMessage).not.toBeVisible();
    return true;
  }
}
