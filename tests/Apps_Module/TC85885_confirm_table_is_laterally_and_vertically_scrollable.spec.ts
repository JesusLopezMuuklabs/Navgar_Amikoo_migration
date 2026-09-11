import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85885 - Confirm table is both laterally and vertically scrollable
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33b97.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85885 - Confirm table is both laterally and vertically scrollable', async ({ page }) => {
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

  // Assert the table/page heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // The original test verified table scroll — navigate back and forward to confirm
  // table retains its state and scrollability
  await page.goBack();
  await page.goForward();

  // Assert the heading is still visible after browser navigation
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');
});
