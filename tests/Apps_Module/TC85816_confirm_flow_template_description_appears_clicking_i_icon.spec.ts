import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85816 - Confirm flow template description appears when clicking on the i icon next to the app name
 * Original: muuk-tests/Apps_Module/TestSteps_e547baec.spec.ts
 *
 * Clicks the info (i) icon on the "Flow Template App Module" card and verifies
 * the description text "App Module description" is visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85816 - Confirm flow template description appears when clicking i icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Click the info (i) icon on the first app card
  await appsPage.clickInfoIcon();

  // Assert the description text is visible
  await appsPage.assertAppDescriptionVisible('App Module description');
});
