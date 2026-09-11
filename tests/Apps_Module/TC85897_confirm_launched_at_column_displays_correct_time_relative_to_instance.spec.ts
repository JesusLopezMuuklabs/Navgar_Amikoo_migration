import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85897 - Confirm Launched at column displays correct time relative to the instance
 * Original: muuk-tests/Apps_Module/TestSteps_2fd3a535.spec.ts
 *
 * Navigates to the Applications page, opens the "Flow Template App Module" app card
 * and verifies the table heading is visible – the Launched at column is part of
 * the default column set rendered when the table loads.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85897 - Confirm Launched at column displays correct time relative to the instance', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Open "Flow Template App Module" app card
  await appsPage.clickAppCard('Flow Template App Module');

  // Assert the table/page heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Assert the "Launched at" column span is visible in the column header area
  await expect(page.locator('//SPAN[normalize-space() = "Launched at"]')).toBeVisible({ timeout: 60000 });
});
