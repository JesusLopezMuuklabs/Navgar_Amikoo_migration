import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC62137 - Edit and adjust my task information within the task drawer: Change the task description in the details tab
 * Original: muuk-tests/Tasks_Module/TestSteps_995bf353.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task "Task"
 *   2. Open task drawer → click Details tab
 *   3. Click "+ Add description" → type in the editor → click Save
 *   4. Assert "New description" text is visible in the details
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC62137 - Edit and adjust my task information within the task drawer: Change the task description in the details tab', async ({ page }) => {
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

  // Add description
  await tasksPage.clickAddDescription();
  await tasksPage.clickDescriptionEditor();
  await page.keyboard.type('New description');
  await tasksPage.clickSaveDescription();

  // Assert saved description is visible
  await tasksPage.assertDescriptionVisible('New description');
});
