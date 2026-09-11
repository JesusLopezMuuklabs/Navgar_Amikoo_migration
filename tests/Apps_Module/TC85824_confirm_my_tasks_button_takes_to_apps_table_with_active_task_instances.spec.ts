import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85824 - Confirm My tasks button takes you to the apps table displaying all flow instances you currently have an active task in
 * Original: muuk-tests/Apps_Module/TestSteps_e548107d.spec.ts
 *
 * Clicks the "My tasks" chip on the "Flow Template App Module" card and verifies
 * the instances table opens. Expands tasks to confirm "Task Name" column is visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85824 - Confirm My tasks button takes you to apps table with active task instances', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Launch an instance so there is at least one active task
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Click the "My tasks" counter chip
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "My tasks")]`).first()).toBeVisible({ timeout: 60000 });
  await page.locator(`//DIV[@role='button'][contains(normalize-space(), "My tasks")]`).first().click({ timeout: 60000 });

  // Assert the instance table heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Expand tasks and assert the Task Name column is visible
  await appsPage.clickExpandTasks();
  await appsPage.assertTaskNameColumnVisible();
});
