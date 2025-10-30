import { test, expect } from "../pages/SnackbarPages/fixtures";

test.describe("W3Schools Snackbar Validation", () => {
  test("Validate snackbar appears and disappears correctly", async ({ snackbarPage }) => {
    
    await test.step("Navigate to the Snackbar demo page", async () => {
      await snackbarPage.navigate();
      await expect(snackbarPage.page).toHaveURL(/howto_js_snackbar\.asp/);
    });

    await test.step("Click 'Show Snackbar' button", async () => {
      await snackbarPage.showButton.click();
      await expect(snackbarPage.showButton).toBeVisible();
    });

    await test.step("Verify snackbar becomes visible after clicking the button", async () => {
      await snackbarPage.snackbar.waitFor({ state: "visible", timeout: 5000 });
      await expect(snackbarPage.snackbar).toBeVisible();
    });

    await test.step("Validate snackbar auto-dismisses after timeout", async () => {
      await snackbarPage.snackbar.waitFor({ state: "hidden", timeout: 7000 });
      await expect(snackbarPage.snackbar).toBeHidden();
    });

    await test.step("Final check - Snackbar should remain hidden", async () => {
      const isVisible = await snackbarPage.snackbar.isVisible();
      expect(isVisible, "Snackbar should remain hidden after disappearing").toBe(false);
    });
  });
});
