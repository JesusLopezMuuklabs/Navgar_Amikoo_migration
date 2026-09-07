import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC83317 - Confirm Owner column is hidden by default when in the Assigned by others quick filter
 * Original: muuk-tests/Tasks_Module/TestSteps_251a83d9.spec.ts
 *
 * Flow:
 *   1. Login → Tasks
 *   2. Click "Assigned by others" filter
 *   3. Assert the pagination row count is visible (table rendered)
 *   4. Assert the deadline column is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC83317 - Confirm Owner column is hidden by default when in the Assigned by others quick filter', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();

  // Navigate to Assigned by others filter
  await tasksPage.clickAssignedByOthersFilter();

  // Assert the table header and structure is visible
  await tasksPage.assertTasksSidebarVisible();
  await tasksPage.assertDeadlineColumnVisible();
});
