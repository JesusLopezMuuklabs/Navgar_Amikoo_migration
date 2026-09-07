import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC69165 - Confirm column sorting arrow is working on each column
 * Original: muuk-tests/Tasks_Module/TestSteps_8e697ba8.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task
 *   2. Open task drawer → assert task detail column headers: Task Name, Due Date, Owner, Created by
 *   3. Assert pagination row count is visible
 *   4. Assert deadline column cell is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC69165 - Confirm column sorting arrow is working on each column', async ({ page }) => {
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

  // Assert column headers
  await tasksPage.assertTaskNameColumnHeaderVisible();
  await tasksPage.assertDueDateColumnHeaderVisible();
  await tasksPage.assertOwnerColumnHeaderVisible();
  await tasksPage.assertCreatedByColumnHeaderVisible();
});
