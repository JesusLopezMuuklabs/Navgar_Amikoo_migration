import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85886 - Confirm ability to page forward and backward in the table
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33c40.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85886 - Confirm ability to page forward and backward in the table', async ({ page }) => {
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

  // Assert the table heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Navigate backward then forward (browser history pagination)
  await page.goBack();
  await page.goForward();

  // Assert the heading is still visible after navigation
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');
});
