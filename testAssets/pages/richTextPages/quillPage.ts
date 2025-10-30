import { Page, Locator, FrameLocator  } from "@playwright/test";

import * as fs from "fs";
 
export class QuillEditorPage {
   page: Page;
   frameLocator:FrameLocator ;
   //codeEditor:Locator;
   editor: Locator;
   boldButton: Locator;
   italicButton: Locator;
   underlineButton: Locator;
   headerDropdown: Locator;
   headerDropdownOption:Locator;
 
  constructor(page: Page) {
  this.page = page;
  this.frameLocator = page.frameLocator('iframe[title="Sandpack Preview"]'); // Adjust if iframe has unique selector
  this.editor = this.frameLocator.locator('//div[contains(@class,"ql-editor")]');
  this.boldButton = this.frameLocator.locator('//button[@aria-label="bold"]');
  this.italicButton = this.frameLocator.locator('//button[@aria-label="italic"]');
  this.underlineButton = this.frameLocator.locator('//button[@aria-label="underline"]');
  this.headerDropdown = this.frameLocator.locator('//span[@class="ql-picker-label"]');//span[contains(@class,"ql-header")]
  this.headerDropdownOption = this.frameLocator.locator('//select[@class="ql-header"]');
}
 
//   async openSite() {
//     await this.page.goto(env.quillUrl);
//     await expect(this.editor).toBeVisible();
//   }
 
 
  async clearEditor() {
    await this.page.evaluate(() => {
      const el = document.querySelector('.ql-editor');
      if (el) el.innerHTML = ''; // Clear all content
    });
  }
 
  async typeText(text: string) {
  await this.editor.waitFor({ state: 'visible' });
  await this.editor.click(); // Focus the editor
  await this.page.keyboard.type(text);// Type the text
  await this.page.keyboard.press('Enter');
}
 
 
//  async selectHeading(level: string) {
//     await this.headerDropdown.click();
//     await this.headerDropdownOption.selectOption(level); // '1' for H1, '2' for H2, '' for Normal
//   }
 
async selectHeading(level: string) {
  await this.headerDropdown.click();
  const optionsContainer = this.frameLocator.locator('//span[contains(@class,"ql-picker-options")]');
  await optionsContainer.waitFor({ state: 'visible' ,timeout: 30000 });
  const optionLocator = this.frameLocator.locator(`//span[@data-value="${level}"]`);
  await optionLocator.click({ force: true, timeout: 60000 });
  // const dropDownOptionLocator = this.frameLocator.locator(`//select[@class="ql-header"]/option[@value="${level}"]`);
  // await dropDownOptionLocator.click({ force: true, timeout: 60000 });
 
}
 
 
  async applyBoldItalicUnderline(text: string) {
    await this.editor.click(); // Focus the editor
    await this.boldButton.click();
    await this.page.keyboard.type(text);
    await this.boldButton.click();
    await this.page.keyboard.press('Enter');
    await this.italicButton.click();
    await this.editor.type(text);
    await this.italicButton.click();
    await this.page.keyboard.press('Enter');
    await this.underlineButton.click();
    await this.editor.type(text);
    await this.underlineButton.click();
    await this.page.keyboard.press('Enter');
  }
 
  async typeFromFile(filePath: string) {
    const fileText = fs.readFileSync(filePath, "utf-8");
    //await this.editor.fill("");
    await this.editor.type(fileText);
  }
 
  async getEditorText(): Promise<string> {
    return (await this.editor.innerText()).trim();
  }
 
 async getHeadingElements(tag: string) {
  return this.frameLocator.locator(`//div[contains(@class,"ql-editor")]//${tag}`);
}
 
}
 