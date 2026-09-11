import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85817 - Confirm flow instances can be launched from the app card launch button
 * Original: muuk-tests/Apps_Module/TestSteps_e547bc8a.spec.ts
 *
 * Clicks the Launch button on the "Flow Template App Module" card, confirms the
 * execution overlay appears with the "Executing" heading.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85817 - Confirm flow instances can be launched from the app card launch button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Click the Launch button on the app card
  await appsPage.clickLaunch();

  // Assert the "Executing" heading is visible (overlay opened)
  await appsPage.assertExecutingHeadingVisible('Flow Template App Module');

  // Click Execute to dismiss overlay
  await appsPage.clickExecute();
});
