import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62031 - Edit and adjust my task information: Adjust the tasks due date one day in the future
 * Original: muuk-tests/Tasks_Module/TestSteps_150e7337.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Hover task row → click actions button → click "Add date"
 *   3. Click next day in date picker → click OK
 *   4. Assert "Tomorrow" chip is visible in the deadline column
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62031 - Edit and adjust my task information: Adjust the tasks due date one day in the future', async ({ page }) => {
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

  // Open the date picker via "Add date" in the deadline column
  await tasksPage.clickAddDate();
  await tasksPage.clickNextDayDatePicker();
  await tasksPage.clickDatePickerOk();

  // Assert the "Tomorrow" chip is visible in the deadline cell
  await tasksPage.assertTomorrowChipVisible();
});
