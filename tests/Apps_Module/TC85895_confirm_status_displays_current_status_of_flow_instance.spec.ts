import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85895 - Confirm Status displays current status of a flow instance
 * Original: muuk-tests/Apps_Module/TestSteps_2fd373f1.spec.ts
 *
 * Launches a flow instance, filters by Status=Running, expands tasks,
 * verifies 0% progress, and completes a task to validate status update.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85895 - Confirm Status displays current status of a flow instance', async ({ page }) => {
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

  // Launch a new flow instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Filter by Status = Running
  await appsPage.clickFiltersButton();
  await appsPage.clickAddFilter();
  await appsPage.clickFilterColumnComboboxChat();
  await appsPage.selectFilterOptionAtIndex(1); // Status
  await appsPage.clickFilterValueCombobox();
  await appsPage.selectFilterOptionAtIndex(1); // Running

  // Expand tasks and verify progress is at 0%
  await appsPage.clickExpandTasks();
  await appsPage.assertZeroPercentProgressVisible();

  // Complete the task via checkbox
  await appsPage.clickTaskCheckbox();
  await appsPage.assertTaskCompletedToastVisible();
});
