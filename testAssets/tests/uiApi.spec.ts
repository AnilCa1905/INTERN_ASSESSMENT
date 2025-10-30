import { test, expect } from "../pages/ApiValidationPages/fixtures";

test.describe("API–UI Consistency Validation", () => {
  test("Validate that products displayed on UI match API data (Name & Price)", async ({
    autoApiUiPage,
    apiContext,
  }) => {

    await test.step("Navigate to Products page", async () => {
      await autoApiUiPage.GoToHomeUrl();
      await autoApiUiPage.logo.waitFor({ state: "visible", timeout: 10000 });

      await autoApiUiPage.navigateToProductsPage();
      await autoApiUiPage.page.waitForLoadState("networkidle");
      await expect(autoApiUiPage.page).toHaveURL(/.*products/);
      await autoApiUiPage.allProducts.first().waitFor({
        state: "visible",
        timeout: 15000,
      });
    });
    const uiData = await test.step("Extract product data from UI", async () => {
      const data = await autoApiUiPage.extractProductDataFromUI();
      console.log(`Extracted ${data.length} products from UI`);
      data
        .slice(0, 33)
        .forEach((p, i) =>
          console.log(`UI Product ${i + 1}: ${p.name} - ${p.price}`)
        );
      return data;
    });
    const apiData = await test.step("Fetch product data from API", async () => {
      const data = await autoApiUiPage.fetchProductDataFromAPI(apiContext);
      console.log(`Retrieved ${data.length} products from API`);
      data
        .slice(0, 33)
        .forEach((p, i) =>
          console.log(`API Product ${i + 1}: ${p.name} - ${p.price}`)
        );
      return data;
    });
    await test.step("Compare API and UI product data", async () => {
      await autoApiUiPage.compareApiAndUiData(apiData, uiData);
      console.log("API–UI data consistency verified successfully!");
    });
  });
});
