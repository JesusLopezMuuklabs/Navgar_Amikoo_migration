import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85815 - Confirm favorite apps appear in favorites section
 * Original: muuk-tests/Apps_Module/TestSteps_e547b9ed.spec.ts
 *
 * Adds "Flow Template App Module" to favorites and verifies it appears in
 * the Favorites section, then removes it.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85815 - Confirm favorite apps appear in favorites section', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Add to favorites
  await appsPage.clickAddToFavorites('Flow Template App Module');
  await appsPage.assertAddedToFavoritesToastVisible();

  // Verify the app appears in the Favorites section
  await appsPage.assertAppInFavoritesSection('Flow Template App Module');

  // Remove from favorites (cleanup)
  await appsPage.clickRemoveFromFavorites('Flow Template App Module');
  await appsPage.assertRemovedFromFavoritesToastVisible();
});
