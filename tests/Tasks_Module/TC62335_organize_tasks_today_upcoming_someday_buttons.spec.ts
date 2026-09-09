import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62335 - Organize tasks using the Today, Upcoming and Someday buttons in the task card
 * Original: muuk-tests/Tasks_Module/TestSteps_fba9522b.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Click Today button → Assert "Assigned to Today" toast
 *   3. Reload Tasks → Click Upcoming button → Assert "Assigned to Upcoming" toast
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62335 - Organize tasks using the Today, Upcoming and Someday buttons in the task card', async ({ page }) => {
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

  // Assign to Today
  await tasksPage.clickTodayButton();
  await tasksPage.assertAssignedTodayToastVisible();
  await tasksPage.assertTodayTabVisible();

  // Navigate back and assign to Upcoming
  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickUpcomingButton();
  await tasksPage.assertAssignedUpcomingToastVisible();
  await tasksPage.assertUpcomingTabVisible();
});
