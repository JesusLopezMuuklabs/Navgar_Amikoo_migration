import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62112 - Edit and adjust my task information: Delete Task
 * Original: muuk-tests/Tasks_Module/TestSteps_55b05f7b.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Hover task row → click task row to open drawer
 *   3. Click More menu → click Delete → confirm "Yes, delete this task"
 *   4. Assert "No rows" empty grid message is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62112 - Edit and adjust my task information: Delete Task', async ({ page }) => {
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

  // Delete via More menu
  await tasksPage.clickMoreButton();
  await tasksPage.clickDeleteInMoreMenu();
  await tasksPage.assertDeleteTasksDialogVisible();
  await tasksPage.clickConfirmDeleteTask();

  // Assert grid is now empty
  await tasksPage.assertNoRowsVisible();
});
