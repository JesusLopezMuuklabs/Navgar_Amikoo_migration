import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC_A83476 - Confirm Upcoming button prompts calendar widget
 * Original: muuk-tests/Tasks_Module/TestSteps_417cfac9.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task
 *   2. Click "Upcoming" button on the task card
 *   3. Assert date calendar widget appears
 *   4. Pick next day → confirm OK
 *   5. Assert "Assigned to Upcoming" toast visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A83476 - Confirm Upcoming button prompts calendar widget', async ({ page }) => {
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

  // Click Upcoming button → assert calendar widget
  await tasksPage.clickUpcomingButton();
  await tasksPage.assertDateCalendarVisible();
  await tasksPage.clickNextDayDatePicker();
  await tasksPage.clickDatePickerOk();
  await tasksPage.assertAssignedUpcomingToastVisible();
});
