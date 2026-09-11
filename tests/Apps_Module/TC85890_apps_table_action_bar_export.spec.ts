import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85890 - Apps Table action bar - Export
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33e15.spec.ts
 *
 * Verifies the Export button and "Download as CSV" option are functional, and
 * that resetting columns after export restores all default column spans.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85890 - Apps Table action bar - Export', async ({ page }) => {
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

  // Assert Export button is visible in the toolbar
  await appsPage.assertExportButtonVisible();

  // Open Export menu and click "Download as CSV"
  await appsPage.clickExportButton();
  await appsPage.clickDownloadAsCsv();

  // After export, verify the Columns panel still lists all expected columns
  // by opening and checking the reset state
  await appsPage.clickColumnsButton();
  await appsPage.clickResetColumns();
  await appsPage.clickColumnsButton();
  await appsPage.assertExportColumnListVisible();
});
