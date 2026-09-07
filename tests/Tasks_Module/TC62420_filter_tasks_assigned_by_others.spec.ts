import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62420 - Filter my tasks: Tasks assigned by others
 * Original: muuk-tests/Tasks_Module/TestSteps_9f007872.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Reassign to "Victor" (press Enter)
 *   3. Navigate to "Assigned by others" filter
 *   4. Assert the "Assigned by others" heading/link is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62420 - Filter my tasks: Tasks assigned by others', async ({ page }) => {
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

  // Reassign task
  await tasksPage.clickReassign();
  await tasksPage.fillReassignSearch('Victor');
  await page.keyboard.press('Enter');

  // Navigate to Assigned by others filter
  await tasksPage.clickAssignedByOthersFilter();

  // Assert the "Assigned by others" filter link is visible
  await expect(page.locator('//a[@href="/104/tasks?filter=me-to-others"]')).toBeVisible({ timeout: 60000 });
});
