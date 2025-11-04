import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
import { CommonPage } from "./commonPage";
import fs from "fs";
import path from "path";


/**
 * Represents the "Products" page and provides methods
 * for validating consistency between UI and API product data.
 * 
 * Extends {@link CommonPage} to reuse common navigation and elements.
 */
export class AutoApiUiPage extends CommonPage {
  /** Playwright Page instance for browser interactions */
  readonly page: Page;

  /** Locator for all product cards displayed on the Products page */
  readonly allProducts: Locator;

  /**
   * Initializes the AutoApiUiPage with locators and inherits from CommonPage.
   * @param {Page} page - The Playwright Page instance.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.allProducts = page.locator('//div[@class="features_items"]/div[@class="col-sm-4"]');
  }

  /**
   * Navigates to the "Products" page using the link from CommonPage.
   * Waits for URL verification to ensure navigation succeeded.
   * @async
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToProductsPage(): Promise<void> {
    await this.productsUiLink.click();
    await expect(this.page).toHaveURL(/.*products/, { timeout: 10000 });
  }

  /**
   * Extracts all product names and prices displayed on the UI.
   * Waits for products to load, retrieves text content, and trims whitespace.
   *
   * @async
   * @returns {Promise<{ name: string; price: string }[]>} 
   * A list of product objects with name and price properties.
   *
   * @example
   * [
   *   { name: "Blue Top", price: "Rs. 500" },
   *   { name: "Men Tshirt", price: "Rs. 400" }
   * ]
   */
  async extractProductDataFromUI(): Promise<{ name: string; price: string }[]> {
    await this.page.waitForSelector('//div[@class="features_items"]/div[@class="col-sm-4"]', { timeout: 20000 });

    const productData: { name: string; price: string }[] = [];
    const productCount = await this.allProducts.count();

    for (let i = 0; i < productCount; i++) {
      const product = this.allProducts.nth(i);
      const name = await product.locator("p").first().textContent();
      const price = await product.locator("h2").first().textContent();

      if (name && price) {
        productData.push({
          name: name.trim(),
          price: price.trim(),
        });
      }
    }

    expect(productData.length).toBeGreaterThan(0);
    console.log(`Extracted ${productData.length} products from UI`);
    return productData;
  }

  /**
   * Fetches the products list from the API endpoint.
   * Verifies the response status and extracts product name–price pairs.
   *
   * @async
   * @param {APIRequestContext} apiContext - Playwright API request context.
   * @returns {Promise<{ name: string; price: string }[]>} 
   * A list of products retrieved from the API.
   *
   * @example
   * [
   *   { name: "Blue Top", price: "Rs. 500" },
   *   { name: "Men Tshirt", price: "Rs. 400" }
   * ]
   */
  async fetchProductDataFromAPI(apiContext: APIRequestContext): Promise<{ name: string; price: string }[]> {
    const response = await apiContext.get("https://automationexercise.com/api/productsList");
    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    const apiProducts = json.products.map((p: any) => ({
      name: p.name.trim(),
      price: p.price.trim(),
    }));

    expect(apiProducts.length).toBeGreaterThan(0);
    console.log(`Retrieved ${apiProducts.length} products from API`);
    return apiProducts;
  }

  /**
 * Compares product data retrieved from the API with data extracted from the UI.
 * Logs mismatches (if any), writes them to a JSON report file for traceability,
 * and asserts that all UI products are present and correctly matched in the API data.
 *
 * @async
 * @param {{ name: string; price: string }[]} apiData - Product data retrieved from the API.
 * @param {{ name: string; price: string }[]} uiData - Product data extracted from the UI.
 * @returns {Promise<void>} Resolves after comparison, logging, and report generation.
 *
 * @example
 * await autoApiUiPage.compareApiAndUiData(apiProducts, uiProducts);
 *
 * @remarks
 * - Mismatches (if any) are stored in `.artifacts/api_ui_mismatches.json`.
 * - The JSON file is removed automatically when all validations pass.
 * - Each mismatch entry includes the product name, price, and issue description.
 */
async compareApiAndUiData(
  apiData: { name: string; price: string }[],
  uiData: { name: string; price: string }[]
): Promise<void> {
  const mismatches: { name: string; price: string; issue: string }[] = [];

  // Identify mismatched or missing products between API and UI
  for (const uiItem of uiData) {
    const apiMatch = apiData.find(
      (apiItem) => apiItem.name === uiItem.name && apiItem.price === uiItem.price
    );

    if (!apiMatch) {
      mismatches.push({
        name: uiItem.name,
        price: uiItem.price,
        issue: "Not found or mismatched in API response",
      });
    }
  }

  // Ensure .artifacts directory exists
  const resultsDir = path.join(process.cwd(), ".artifacts");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const reportPath = path.join(resultsDir, "api_ui_mismatches.json");

  // Generate mismatch report or clean previous one
  if (mismatches.length > 0) {
    fs.writeFileSync(reportPath, JSON.stringify(mismatches, null, 2), "utf-8");
    console.log(`⚠️  API–UI mismatches found! Saved details to ${reportPath}\n`);
    mismatches.forEach((m, i) =>
      console.log(`${i + 1}. ${m.name} - ${m.price} (${m.issue})`)
    );
  } else {
    console.log("✅ API–UI data consistency verified successfully!");
    if (fs.existsSync(reportPath)) fs.unlinkSync(reportPath);
  }

  // Assert all items match; show mismatch file path on failure
  expect(mismatches, `See ${reportPath} for mismatch details`).toHaveLength(0);
}
}
