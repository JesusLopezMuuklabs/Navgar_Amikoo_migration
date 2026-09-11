import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85811 - Confirm flow templates with their app toggle activated appear in the apps card list
 * Original: muuk-tests/Apps_Module/TestSteps_e547b502.spec.ts
 *
 * Full flow: navigates through Flow Templates, enables the Application toggle on a template,
 * verifies it appears in the Applications card list, then cleans up.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85811 - Confirm flow templates with app toggle activated appear in apps card list', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Flow Templates via sidebar
  await appsPage.navigateToFlowTemplates();

  // Open "Accounting Template Module" app template
  await page.locator(`//SPAN[normalize-space() = "Accounting Template Module"]`).click({ timeout: 60000 });

  // Assert "Application?" label is present in settings
  await appsPage.assertApplicationLabelVisible();

  // Enable the Application toggle (switch to on)
  await appsPage.clickApplicationToggle();

  // Save settings
  await appsPage.clickSave();

  // Close settings panel
  await appsPage.clickCloseSettings();

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Verify the template appears as an app card
  await expect(page.locator(`//P[normalize-space() = "Accounting Template Module"]`)).toBeVisible({ timeout: 60000 });

  // ── Cleanup: turn the toggle back off ──────────────────────────────────────
  await appsPage.navigateToFlowTemplates();
  await page.locator(`//SPAN[normalize-space() = "Accounting Template Module"]`).click({ timeout: 60000 });
  await appsPage.clickApplicationToggle();
  await appsPage.clickSave();
  await appsPage.clickCloseSettings();
});
