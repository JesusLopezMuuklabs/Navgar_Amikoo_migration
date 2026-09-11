import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85888 - Apps Table action bar - Filters
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33d2d.spec.ts
 *
 * Verifies adding filters increments the badge count, Remove all resets to 0,
 * and individual filter delete buttons decrement the count.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85888 - Apps Table action bar - Filters', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to app instances table
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();
  await appsPage.clickAppCard('Flow Template App Module');
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Open Filters panel
  await appsPage.clickFiltersButton();

  // Add filter 1 → badge shows 2
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(2);

  // Add filter 2 → badge shows 3
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(3);

  // Add filter 3 → badge shows 4
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(4);

  // Remove all filters → badge shows 0
  await appsPage.clickRemoveAllFilters();
  await appsPage.assertFilterBadgeCount(0);

  // Add filter again → 2, then delete one → 1 remains
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(2);
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(3);
  await appsPage.clickAddFilter();
  await appsPage.assertFilterBadgeCount(4);

  // Delete filter at index 3 (last) → 3 remain
  await appsPage.clickDeleteFilterAtIndex(3);
  await appsPage.assertFilterBadgeCount(3);

  // Delete filter at index 2 → 2 remain
  await appsPage.clickDeleteFilterAtIndex(2);
  await appsPage.assertFilterBadgeCount(2);

  // Delete filter at index 1 → 1 remains, badge shows "1" with special style
  await appsPage.clickDeleteFilterAtIndex(1);
  await appsPage.assertFilterBadgeCount(1);

  // Delete last filter at index 0 → 0
  await appsPage.clickDeleteFilterAtIndex(0);
  await appsPage.assertFilterBadgeCount(0);
});
