import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85825 - Confirm Unread chats button takes you to the apps table displaying all the flow instances you have unread messages in
 * Original: muuk-tests/Apps_Module/TestSteps_e54810f1.spec.ts
 *
 * Clicks the "Unread chats" chip on the "Flow Template App Module" card and verifies
 * the instances table opens with the Task Name column visible after expanding tasks.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85825 - Confirm Unread chats button takes you to apps table with unread message instances', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Launch an instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Click the "Unread chats" counter chip
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Unread chats")]`).first()).toBeVisible({ timeout: 60000 });
  await page.locator(`//DIV[@role='button'][contains(normalize-space(), "Unread chats")]`).first().click({ timeout: 60000 });

  // Assert the instance table heading is visible
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // Expand tasks and verify Task Name column
  await appsPage.clickExpandTasks();
  await appsPage.assertTaskNameColumnVisible();
});
