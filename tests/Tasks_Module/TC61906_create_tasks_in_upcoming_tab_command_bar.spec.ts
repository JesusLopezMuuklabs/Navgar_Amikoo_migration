import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC61906 - Create tasks in the Upcoming tab embedded command bar
 * Original: muuk-tests/Tasks_Module/TestSteps_322af8eb.spec.ts
 *
 * Flow:
 *   1. Login → Navigate to Tasks
 *   2. Clean up existing tasks
 *   3. Create task "Task", navigate back
 *   4. Click Upcoming quick-action on the task card
 *   5. Assert "Task has been assigned to work on Upcoming." toast is visible
 *   6. Assert Upcoming tab is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC61906 - Create tasks in the Upcoming tab embedded command bar', async ({ page }) => {
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

  // Assign to Upcoming
  await tasksPage.clickUpcomingButton();
  await tasksPage.assertAssignedUpcomingToastVisible();
  await tasksPage.assertUpcomingTabVisible();
});
