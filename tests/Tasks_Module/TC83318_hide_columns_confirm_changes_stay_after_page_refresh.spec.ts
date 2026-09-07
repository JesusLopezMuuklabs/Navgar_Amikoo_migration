import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC83318 - Hide columns and confirm the changes stay after page refreshes
 * Original: muuk-tests/Tasks_Module/TestSteps_251a844e.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → click "Assigned by others" filter
 *   2. Click Columns button → assert columns panel visible
 *   3. Assert deadline column cell is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC83318 - Hide columns and confirm the changes stay after page refreshes', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickAssignedByOthersFilter();

  // Open Columns panel
  await tasksPage.clickColumnsButton();
  await tasksPage.assertDeadlineColumnVisible();
});
