import { test, expect } from "@playwright/test";
import { QuillEditorPage } from "../pages/richTextPages/quillPage";

test.describe("QuillJS Playground - Rich Text Editor Validation", () => {
  test("Validate heading, bold, italic, and underline formatting", async ({
    page,
  }) => {
    const quill = new QuillEditorPage(page);
    await test.step("Launch Quill Playground", async () => {
      await page.goto("https://quilljs.com/playground/snow");
      const frame = page.frameLocator('iframe[title="Sandpack Preview"]');
      await expect(frame.locator(".ql-editor")).toBeVisible({ timeout: 30000 });
    });
    await test.step("Select Heading 1 style", async () => {
      await quill.selectHeading("1");
    });
    await test.step("Type formatted text", async () => {
      await quill.typeText("This is a heading");
      await quill.applyBoldItalicUnderline("Formatted Text");
    });
    await test.step("Validate editor text content", async () => {
      const textContent = await quill.getEditorText();
      expect(textContent).toContain("This is a heading");
      expect(textContent).toContain("Formatted Text");
    });
    await test.step("Validate heading tag exists", async () => {
      const headingLocator = await quill.getHeadingElements("h1");
      await expect(headingLocator.first()).toBeVisible();
    });
  });
});
