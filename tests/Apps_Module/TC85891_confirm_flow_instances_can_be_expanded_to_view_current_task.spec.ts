import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85891 - Confirm flow instances can be expanded to view the current task
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33e89.spec.ts
 *
 * Verifies the "Expand tasks" toggle shows/hides the tbody rows repeatedly.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85891 - Confirm flow instances can be expanded to view the current task', async ({ page }) => {
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

  // Toggle 1: Expand → rows visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTableRowsVisible();

  // Toggle 2: Collapse → rows not visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTableRowsNotVisible();

  // Toggle 3: Expand again → rows visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTableRowsVisible();

  // Toggle 4: Collapse again → rows not visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTableRowsNotVisible();
});
