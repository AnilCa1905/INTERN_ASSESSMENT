import { Page, Locator, FrameLocator } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
 
export class QuillEditorPage {
  page: Page;
  frameLocator: FrameLocator;
  editor: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe[title="Sandpack Preview"]');
    this.editor = this.frameLocator.locator(
      '//div[contains(@class,"ql-editor")]'
    );
  }
 
  async clearEditor() {
    await this.frameLocator
      .locator(".ql-editor")
      .evaluate((el) => (el.innerHTML = ""));
  }
 
  /**
   * Reads a local HTML file and injects its contents into the Quill editor
   */
  async typeFromHTMLFile(filePath: string) {
    const absolutePath = path.resolve(filePath);
    const htmlContent = fs.readFileSync(absolutePath, "utf-8");
    await this.frameLocator.locator(".ql-editor").evaluate((el, html) => {
      el.innerHTML = html;
    }, htmlContent);
  }
 
  async getEditorText(): Promise<string> {
    return (await this.editor.innerText()).trim();
  }
 
  async getEditorHTML(): Promise<string> {
    return await this.frameLocator
      .locator(".ql-editor")
      .evaluate((el) => el.innerHTML);
  }
}
 