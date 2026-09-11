import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85812 - Confirm updates made to the flow template name are displayed in the card app name
 * Original: muuk-tests/Apps_Module/TestSteps_e547b88f.spec.ts
 *
 * Renames an app template ("Name Changing App Module") and verifies the new name
 * appears in the Applications card list.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85812 - Confirm updates to flow template name are displayed in card app name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Flow Templates
  await appsPage.navigateToFlowTemplates();

  // Open "Name Changing App Module" template via View details
  await appsPage.clickViewDetailsByAppName('Name Changing App Module');

  // Rename the app template
  await appsPage.fillAppName('Test App Module');
  await appsPage.clickSave();

  // Navigate to Applications and verify updated name appears
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();
  await expect(page.locator(`//P[normalize-space() = "Test App Module"]`)).toBeVisible({ timeout: 60000 });

  // ── Cleanup: rename back ────────────────────────────────────────────────────
  await appsPage.navigateToFlowTemplates();
  await appsPage.clickViewDetailsByAppName('Test App Module');
  await appsPage.fillAppName('Name Changing App Module');
  await appsPage.clickSave();
});
