// testAssets/fixtures/fixtures.ts
import { test as base, expect, Page } from "@playwright/test";
import { CommonPage } from "../../pages/ApiValidationPages/commonPage";
import { AutoApiUiPage } from "../../pages/ApiValidationPages/autoApiUiPage";
import { APIRequestContext } from "@playwright/test";
type Fixtures = {
  commonPage: CommonPage;
  autoApiUiPage: AutoApiUiPage;
    apiContext: APIRequestContext;

};
export const test = base.extend<Fixtures>({
  commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },
  autoApiUiPage: async ({ page }, use) => {
    const autoApiUiPage = new AutoApiUiPage(page);
    await use(autoApiUiPage);
  },
   apiContext: async ({ playwright }, use) => {
    // Create a new API request context
    const apiContext = await playwright.request.newContext({
      baseURL: "https://automationexercise.com",
    });
    
    await use(apiContext);
    
    // Clean up
    await apiContext.dispose();
  },
});

export { expect };
