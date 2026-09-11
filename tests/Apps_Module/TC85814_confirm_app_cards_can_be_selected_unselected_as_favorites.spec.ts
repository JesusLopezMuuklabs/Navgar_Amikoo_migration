import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85814 - Confirm app cards can be selected/unselected as favorites
 * Original: muuk-tests/Apps_Module/TestSteps_e547b979.spec.ts
 *
 * Adds "Flow Template App Module" to favorites and confirms the toast appears,
 * then removes it and confirms the removal toast.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85814 - Confirm app cards can be selected/unselected as favorites', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Add "Flow Template App Module" to favorites
  await appsPage.clickAddToFavorites('Flow Template App Module');
  await appsPage.assertAddedToFavoritesToastVisible();

  // Remove from favorites
  await appsPage.clickRemoveFromFavorites('Flow Template App Module');
  await appsPage.assertRemovedFromFavoritesToastVisible();
});
