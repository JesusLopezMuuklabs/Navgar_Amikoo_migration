import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85883 - Confirm Launch button launches flow instance
 * Original: muuk-tests/Apps_Module/TestSteps_2fd337c5.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85883 - Confirm Launch button launches flow instance', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Validate successful login
  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Open "Flow Template App Module" app card
  await appsPage.clickAppCard('Flow Template App Module');

  // Assert the app instance table heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Click Launch button
  await appsPage.clickLaunch();

  // Assert the "Executing" heading is visible (overlay opened)
  await expect(page.locator("//h6[contains(text(), 'Executing')]")).toBeVisible({ timeout: 60000 });

  // Click Execute to confirm launch
  await appsPage.clickExecute();
});
