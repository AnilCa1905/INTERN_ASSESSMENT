import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
import { CommonPage } from "./commonPage";

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
   * Logs mismatches (if any) and asserts that all UI products match API data.
   *
   * @async
   * @param {{ name: string; price: string }[]} apiData - Product data from the API.
   * @param {{ name: string; price: string }[]} uiData - Product data from the UI.
   * @returns {Promise<void>} Resolves after comparison and validation.
   *
   * @example
   * await autoApiUiPage.compareApiAndUiData(apiProducts, uiProducts);
   */
  async compareApiAndUiData(
    apiData: { name: string; price: string }[],
    uiData: { name: string; price: string }[]
  ): Promise<void> {
    const mismatches: string[] = [];

    for (const uiItem of uiData) {
      const apiMatch = apiData.find(
        (apiItem) => apiItem.name === uiItem.name && apiItem.price === uiItem.price
      );

      if (!apiMatch) {
        mismatches.push(`Mismatch: ${uiItem.name} - ${uiItem.price} not found in API`);
      }
    }

    if (mismatches.length > 0) {
      console.log("API–UI Mismatches found:\n" + mismatches.join("\n"));
    } else {
      console.log("API–UI data consistency verified successfully!");
    }

    expect(mismatches, mismatches.join("\n")).toHaveLength(0);
  }
}
