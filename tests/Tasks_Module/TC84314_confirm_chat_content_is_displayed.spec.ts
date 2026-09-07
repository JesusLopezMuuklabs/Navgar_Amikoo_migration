import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC84314 - Confirm chat content is displayed
 * Original: muuk-tests/Tasks_Module/TestSteps_0382a660.spec.ts
 *
 * Flow:
 *   1. Login → Navigate to Tasks
 *   2. Create task "Task", navigate back, open task drawer
 *   3. Assert task name column header (Task Name, Due Date, Owner, Created by) are visible in the list
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC84314 - Confirm chat content is displayed', async ({ page }) => {
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

  // Assert task detail column headers are visible in the task list/drawer
  await tasksPage.assertTaskNameColumnHeaderVisible();
  await tasksPage.assertDueDateColumnHeaderVisible();
  await tasksPage.assertOwnerColumnHeaderVisible();
  await tasksPage.assertCreatedByColumnHeaderVisible();
});
