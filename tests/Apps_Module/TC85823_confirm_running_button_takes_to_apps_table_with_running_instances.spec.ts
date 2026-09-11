import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85823 - Confirm Running button takes you to the apps table displaying all running flow instances from that app
 * Original: muuk-tests/Apps_Module/TestSteps_e5481009.spec.ts
 *
 * Clicks the Running chip on the "Flow Template App Module" card and verifies
 * the instances table (with "Task Name" column) is visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85823 - Confirm Running button takes you to apps table with running flow instances', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Launch an instance so there is at least one running
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Click the Running counter chip
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Running")]`).first()).toBeVisible({ timeout: 60000 });
  await page.locator(`//DIV[@role='button'][contains(normalize-space(), "Running")]`).first().click({ timeout: 60000 });

  // Assert the instance table heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Expand tasks and assert the Task Name column is visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTaskNameColumnVisible();
});
