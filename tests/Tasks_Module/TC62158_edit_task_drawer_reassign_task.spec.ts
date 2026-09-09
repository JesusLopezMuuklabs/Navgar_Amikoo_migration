import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62158 - Edit and adjust my task information within the task drawer: Reassign the task
 * Original: muuk-tests/Tasks_Module/TestSteps_999e4fad.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Open task drawer → click Reassign
 *   3. Type "Victor" in search → press Enter
 *   4. Navigate to "Assigned by others" filter
 *   5. Assert task checkbox is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62158 - Edit and adjust my task information within the task drawer: Reassign the task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();
  await tasksPage.deleteAllExistingTasks();
  await tasksPage.clickNewTask();
  await tasksPage.fillNewTaskName('Task');
  await tasksPage.clickCreate();
  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickTaskRow('Task');
  await tasksPage.assertValueDropdownRowVisible();

  // Reassign via drawer
  await tasksPage.clickReassign();
  await tasksPage.fillReassignSearch('Victor');
  await page.keyboard.press('Enter');

  // Navigate to Assigned by others
  await tasksPage.clickAssignedByOthersFilter();
  await expect(page.locator('INPUT[type=\'checkbox\']').first()).toBeVisible({ timeout: 60000 });
});
