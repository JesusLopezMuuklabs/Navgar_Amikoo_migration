import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC61897 - Create tasks in the Today tab embedded command bar
 * Original: muuk-tests/Tasks_Module/TestSteps_32268bbe.spec.ts
 *
 * Flow:
 *   1. Login → Navigate to Tasks
 *   2. Clean up existing tasks
 *   3. Click New Task, fill name "Task", click Create
 *   4. Navigate back to Tasks, click Today quick-action on the task
 *   5. Assert "Task has been assigned to work on Today." toast is visible
 *   6. Assert the Today tab is available
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC61897 - Create tasks in the Today tab embedded command bar', async ({ page }) => {
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

  // Assign the new task to Today via the inline quick-action button
  await tasksPage.clickTodayButton();
  await tasksPage.assertAssignedTodayToastVisible();
  await tasksPage.assertTodayTabVisible();
});
