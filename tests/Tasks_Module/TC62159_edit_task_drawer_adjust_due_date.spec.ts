import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62159 - Edit and adjust my task information within the task drawer: Adjust the tasks due date
 * Original: muuk-tests/Tasks_Module/TestSteps_999f672e.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task
 *   2. Open task drawer → click Details tab → click "Set due date"
 *   3. Assert date calendar appears → pick next day → click OK
 *   4. Assert Tomorrow chip visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62159 - Edit and adjust my task information within the task drawer: Adjust the tasks due date', async ({ page }) => {
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
  await tasksPage.clickDetailsTab();

  // Set due date via drawer
  await tasksPage.clickSetDueDate();
  await tasksPage.assertDateCalendarVisible();
  await tasksPage.clickNextDayDatePicker();
  await tasksPage.clickDatePickerOk();
  await tasksPage.assertTomorrowChipVisible();
});
