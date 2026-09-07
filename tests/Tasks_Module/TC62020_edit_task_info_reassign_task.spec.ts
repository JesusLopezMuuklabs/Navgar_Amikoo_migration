import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62020 - Edit and adjust my task information: Reassign the task
 * Original: muuk-tests/Tasks_Module/TestSteps_150b0bc4.spec.ts
 *
 * Flow:
 *   1. Login → Navigate to Tasks
 *   2. Clean up → Create task "Task"
 *   3. Hover task row, click open task details (actions column button)
 *   4. Click Reassign, type "Victor" in search, press Enter
 *   5. Navigate to "Assigned by others" filter, click the checkbox on the task
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62020 - Edit and adjust my task information: Reassign the task', async ({ page }) => {
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

  // Hover task row and open its detail actions
  await page.locator('//div[@role="gridcell"][@data-field="legend"]/a/span[contains(text(), "Task")]').first().hover();
  await tasksPage.clickOpenTaskDetails();

  // Reassign the task
  await tasksPage.clickReassign();
  await tasksPage.fillReassignSearch('Victor');
  await page.keyboard.press('Enter');

  // Navigate to Assigned by others filter
  await tasksPage.clickAssignedByOthersFilter();

  // Assert task checkbox is visible
  await expect(page.locator('INPUT[type=\'checkbox\']').first()).toBeVisible({ timeout: 60000 });
});
