import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85822 - Confirm app list repopulates when deleting search terms
 * Original: muuk-tests/Apps_Module/TestSteps_e5480f95.spec.ts
 *
 * Types a search term that filters the list to one result, then clears it
 * and verifies the full list repopulates (both instances visible again).
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85822 - Confirm app list repopulates when deleting search terms', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Search for "Muuk instance 1" – filters list
  await appsPage.searchApps('Muuk instance 1');
  await appsPage.assertMuukInstance1Visible();

  // Clear search – both instances should reappear
  await appsPage.searchApps('');
  await appsPage.assertMuukInstance1Visible();
  await appsPage.assertMuukInstance2Visible();
});
