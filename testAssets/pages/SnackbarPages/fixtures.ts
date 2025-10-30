import { test as base } from "@playwright/test";
import { SnackbarPage } from "./snackbarPage";
import { CommonPage } from "./commonPage";

/**
 * Extend Playwright test fixture to include reusable page objects
 * Each page object is initialized here and can be accessed in tests
 * using destructuring (e.g., { snackbarPage }).
 */

type Pages = {
  snackbarPage: SnackbarPage;
  commonPage: CommonPage;

};

export const test = base.extend<Pages>({
  snackbarPage: async ({ page }, use) => {
    const snackbarPage = new SnackbarPage(page);
    await use(snackbarPage);
  },
    commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
    },
});

export { expect } from "@playwright/test";
