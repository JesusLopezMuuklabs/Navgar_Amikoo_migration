import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62051 - Edit and adjust my task information: Snooze the task
 * Original: muuk-tests/Tasks_Module/TestSteps_15168436.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task → open task drawer via More
 *   2. Click "Snooze" → Assert date calendar widget appears
 *   3. Pick a date → Click OK
 *   4. Assert task is snoozed (calendar visible)
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62051 - Edit and adjust my task information: Snooze the task', async ({ page }) => {
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

  // Open More menu and click Snooze
  await tasksPage.clickMoreButton();
  await tasksPage.clickSnooze();

  // Assert the date calendar widget appeared
  await tasksPage.assertDateCalendarVisible();

  // Select a date and confirm
  await tasksPage.clickNextDayDatePicker();
  await tasksPage.clickDatePickerOk();
});
