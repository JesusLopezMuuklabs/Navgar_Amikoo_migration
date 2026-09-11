import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85821 - Confirm app list refines when using the search feature
 * Original: muuk-tests/Apps_Module/TestSteps_e5480f19.spec.ts
 *
 * Types a search term in the Applications search box and verifies the list
 * refines to show only matching apps.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85821 - Confirm app list refines when using the search feature', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Search for "Muuk instance 1"
  await appsPage.searchApps('Muuk instance 1');

  // Verify the matching instance name is visible
  await appsPage.assertMuukInstance1Visible();

  // Verify a non-matching name is NOT visible
  await expect(page.locator(`//SPAN[normalize-space() = "Muuk instance 2"]`)).not.toBeVisible({ timeout: 10000 });
});
