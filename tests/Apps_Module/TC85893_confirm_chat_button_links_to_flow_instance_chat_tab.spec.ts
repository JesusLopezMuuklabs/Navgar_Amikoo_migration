import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85893 - Confirm chat button links to the flow instance chat tab
 * Original: muuk-tests/Apps_Module/TestSteps_2fd37309.spec.ts
 *
 * Launches a flow instance, filters by Status=Running, clicks the chat icon
 * link in the table to navigate to the instance chat tab, and verifies
 * "First Task" and "Form submitted" labels are visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85893 - Confirm chat button links to the flow instance chat tab', async ({ page }) => {
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

  // Hover the Chat column header to reveal the icon link
  await appsPage.hoverChatColumnHeader();

  // Click the chat icon link (navigates to instance chat tab)
  await appsPage.clickChatIconLink();

  // Verify the instance detail is showing task and form info
  await appsPage.hoverFirstTask();
  await appsPage.hoverFormSubmitted();

  // Close the instance detail
  await appsPage.clickCloseInstanceDetail();

  // Expand tasks and complete a task
  await appsPage.clickExpandTasks();
  await appsPage.clickTaskCheckbox();
  await appsPage.assertTaskCompletedToastVisible();

  // Uncheck to restore
  await appsPage.clickTaskCheckbox();
});
