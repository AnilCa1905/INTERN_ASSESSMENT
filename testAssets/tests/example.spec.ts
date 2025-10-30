// testAssets/tests/homePage.spec.ts
import { test, expect } from "../pages/ApiValidationPages/fixtures";
test.describe("Home Page Tests", () => {
  test("Verify home page title, logo visibility, and navigation", async ({
    autoApiUiPage, apiContext,
  }) => {
    await test.step("Step 1: Launch the website", async () => {
      await autoApiUiPage.GoToHomeUrl();
      await autoApiUiPage.logo.waitFor({ state: "visible", timeout: 10000 });

      await expect(
        await autoApiUiPage.logo.isVisible(),
        "Logo not visible on homepage after waiting 10s"
      ).toBeTruthy();

      const title = await autoApiUiPage.page.title();
      await expect(
        title,
        `Unexpected page title: ${title}`
      ).toBe("Automation Exercise");
    });
    await test.step("Step 2: Verify Products link and navigation bar visibility", async () => {
      await expect(
        autoApiUiPage.productsUiLink,
        "Products link not visible in navigation bar"
      ).toBeVisible();

      const navText = await autoApiUiPage.productsUiLink.textContent();
      await expect(navText?.trim()).toContain("Products");
    });
    await test.step("Step 3: Navigate to Products page", async () => {
      await autoApiUiPage.productsUiLink.click();
      await expect(
        autoApiUiPage.page,
        "Did not navigate to the Products page"
      ).toHaveURL(/.*products/);

      const pageTitle = await autoApiUiPage.page.title();
      await expect(
        pageTitle,
        `Unexpected Products page title: ${pageTitle}`
      ).toBe("Automation Exercise - All Products");
    });
    await test.step("Step 4: Return to homepage and verify logo visibility", async () => {
      await autoApiUiPage.page.goBack();
      await expect(
        autoApiUiPage.logo,
        "Logo not visible after navigating back"
      ).toBeVisible();

      const currentUrl = autoApiUiPage.page.url();
      await expect(
        currentUrl,
        "Not redirected back to homepage"
      ).toBe("https://automationexercise.com/");
    });
  });
});
