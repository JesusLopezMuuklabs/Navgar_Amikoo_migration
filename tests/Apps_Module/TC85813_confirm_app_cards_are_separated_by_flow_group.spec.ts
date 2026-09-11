import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85813 - Confirm app cards are separated by flow group
 * Original: muuk-tests/Apps_Module/TestSteps_e547b903.spec.ts
 *
 * Verifies that multiple app cards from different flow groups are visible
 * in the Applications page (grouped by group name heading).
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85813 - Confirm app cards are separated by flow group', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Verify multiple app cards from different groups are visible
  await expect(page.locator(`//P[normalize-space() = "Flow Template App Module"]`)).toBeVisible({ timeout: 60000 });
  await expect(page.locator(`//P[normalize-space() = "Accounting Template Module"]`)).toBeVisible({ timeout: 60000 });
  await expect(page.locator(`//P[normalize-space() = "Name Changing App Module"]`)).toBeVisible({ timeout: 60000 });
  await expect(page.locator(`//P[normalize-space() = "Test App Module"]`)).toBeVisible({ timeout: 60000 });
});
