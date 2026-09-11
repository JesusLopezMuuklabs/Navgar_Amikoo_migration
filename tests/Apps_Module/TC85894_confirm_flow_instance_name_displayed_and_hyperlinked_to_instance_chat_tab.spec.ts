import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85894 - Confirm Flow Instance Name is displayed and hyperlinked to the instance chat tab
 * Original: muuk-tests/Apps_Module/TestSteps_2fd3737d.spec.ts
 *
 * Launches a flow instance, filters by Status=Running, clicks the chat icon link,
 * then verifies instance detail content (task name, form submitted),
 * closes it, expands tasks and completes tasks twice via checkbox.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85894 - Confirm Flow Instance Name is displayed and hyperlinked to the instance chat tab', async ({ page }) => {
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

  // Hover the Chat column header and click the chat icon link
  await appsPage.hoverChatColumnHeader();
  await appsPage.clickChatIconLink();

  // Verify instance detail shows task and form content
  await appsPage.hoverFirstTask();
  await appsPage.hoverFormSubmitted();

  // Close the instance detail panel
  await appsPage.clickCloseInstanceDetail();

  // Expand tasks and complete task checkbox (2 iterations)
  await appsPage.clickExpandTasks();
  await appsPage.clickTaskCheckbox();
  await appsPage.assertTaskCompletedToastVisible();

  await appsPage.clickTaskCheckbox();
  await appsPage.assertTaskCompletedToastVisible();
});
