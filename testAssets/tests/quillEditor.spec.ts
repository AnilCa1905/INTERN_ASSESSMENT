 
import { test, expect } from "@playwright/test";
import { QuillEditorPage } from "../pages/richTextPages/quillPage";
 
test.describe("QuillJS HTML Injection", () => {
  test("Extract local HTML and enter it into Quill editor", async ({ page }) => {
    const quill = new QuillEditorPage(page);
    await test.step("Launch Quill Playground", async () => {
      await page.goto("https://quilljs.com/playground/snow");
      const frame = page.frameLocator('iframe[title="Sandpack Preview"]');
      await expect(frame.locator(".ql-editor")).toBeVisible({ timeout: 30000 });
    });
 
    await test.step("Inject HTML file into Quill", async () => {
      await quill.clearEditor();
      await quill.typeFromHTMLFile("testAssets/test-data/sample1.html");
      await page.waitForTimeout(1000);
    });
 
    await test.step("Validate injected content", async () => {
      await page.waitForTimeout(1000);
      const text = await quill.getEditorText();
      console.log("Extracted Editor Text:\n", text);
      expect(text.length).toBeGreaterThan(0);
    });
 
    await test.step("Show rendered HTML inside Quill", async () => {
      const html = await quill.getEditorHTML();
      console.log("Rendered Quill HTML:\n", html);
      expect(html).toContain("Rich Text Formatting Example");
    });
  });
});