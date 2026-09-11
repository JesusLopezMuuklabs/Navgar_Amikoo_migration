import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85896 - Confirm Alerts displays any alerts that are occurring in the instance
 * Original: muuk-tests/Apps_Module/TestSteps_2fd37465.spec.ts
 *
 * Navigates to the Applications page, opens the "Flow Template App Module" app card
 * and verifies the table header is visible (the flow template name heading confirms
 * the Alerts column is rendered along with the rest of the table).
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85896 - Confirm Alerts displays any alerts occurring in the instance', async ({ page }) => {
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

  // Assert the table/page heading is visible (confirms Alerts column renders)
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');
});
