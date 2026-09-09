import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62116 - Edit and adjust my task information within the task drawer: Change the task name
 * Original: muuk-tests/Tasks_Module/TestSteps_9955b1e6.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Open task drawer → click Details tab
 *   3. Click edit task name button → fill "Task_edited" → confirm
 *   4. Assert "Task_edited" span is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62116 - Edit and adjust my task information within the task drawer: Change the task name', async ({ page }) => {
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

  // Edit the task name
  await tasksPage.clickEditTaskName();
  await tasksPage.fillInlineTaskNameInput('Task_edited');
  await page.keyboard.press('Enter');

  // Assert the new name is visible
  await tasksPage.assertEditedTaskNameVisible('Task_edited');
});
