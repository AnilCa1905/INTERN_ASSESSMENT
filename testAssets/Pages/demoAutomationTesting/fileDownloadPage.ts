import { Page, Locator } from "@playwright/test";
import path from "path";
import fs from "fs";
import BasePage from "../qaPlayGround/basePage";

/**
 * Page Object Model for the "File Download" component.
 * Extends BasePage and handles navigation, file creation, download, and verification.
 */
export class FileDownloadPage extends BasePage {
  readonly moreLink: Locator;
  readonly fileDownloadLink: Locator;
  readonly textBox: Locator;
  readonly createBtn: Locator;
  readonly downloadLink: Locator;

  constructor(page: Page) {
    super(page); // call BasePage constructor
    this.moreLink = page.locator('//a[text()="More"]');
    this.fileDownloadLink = page.locator('//a[text()="File Download"]');
    this.textBox = page.locator("#textbox");
    this.createBtn = page.locator("#createTxt");
    this.downloadLink = page.locator("#link-to-download");
  }

  /**
   * Navigates to the "File Download" section.
   */
  async navigateToFileDownload(): Promise<void> {
    await this.moreLink.click();
    await this.fileDownloadLink.click();
  }

  /**
   * Enters text into the input box.
   */
  async enterText(data: string): Promise<void> {
    await this.textBox.fill(data);
    await this.textBox.press("Enter");
  }

  /**
   * Clicks the "Create" button to generate a text file.
   */
  async clickCreateButton(): Promise<void> {
    await this.createBtn.waitFor({ state: "visible" });
    await this.createBtn.click();
  }

  /**
   * Downloads the created file and saves it to the ".artifacts/downloadFile" folder.
   */
  async downloadFile(): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadLink.click(),
    ]);

    // Ensure download folder exists in project root
    const downloadDir = path.resolve(process.cwd(), ".artifacts/downloadFile");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const filePath = path.resolve(downloadDir, await download.suggestedFilename());
    await download.saveAs(filePath);
    return filePath;
  }

  /**
   * Reads a file's contents.
   */
  readFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
  }

  /**
   * Checks if a file exists.
   */
  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
}
