import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85884 - Confirm app name is displayed in page header with breadcrumbs
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33a90.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85884 - Confirm app name is displayed in page header with breadcrumbs', async ({ page }) => {
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

  // Assert the flow template name heading is visible (breadcrumb/header)
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Assert the app name header subtitle is visible
  await expect(page.locator(`div.MuiBox-root>h6.MuiTypography-root.MuiTypography-subtitle1`).first()).toBeVisible({ timeout: 60000 });
});
