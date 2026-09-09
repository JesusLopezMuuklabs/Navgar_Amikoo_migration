import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62129 - Confirm hotlinks in task drawer task names are clickable
 * Original: muuk-tests/Tasks_Module/TestSteps_9958f611.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Open task drawer → click Details tab
 *   3. Assert task name column header, due date, owner, created by headers are visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62129 - Confirm hotlinks in task drawer task names are clickable', async ({ page }) => {
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

  // Assert task detail column headers
  await tasksPage.assertTaskNameColumnHeaderVisible();
  await tasksPage.assertDueDateColumnHeaderVisible();
  await tasksPage.assertOwnerColumnHeaderVisible();
  await tasksPage.assertCreatedByColumnHeaderVisible();
});
