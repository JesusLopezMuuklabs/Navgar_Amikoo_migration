import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC84305 - Confirm entity types can be searched
 * Original: muuk-tests/Tasks_Module/TestSteps_03829fc0.spec.ts
 *
 * Flow:
 *   1. Login → Navigate to Tasks
 *   2. Clean up pre-existing Task rows
 *   3. Create a new task "Task"
 *   4. Navigate back to Tasks, open task drawer
 *   5. Click More → Assign to entity
 *   6. Assert "Select Entity Type" heading and overlay panel are visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC84305 - Confirm entity types can be searched', async ({ page }) => {
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
  await tasksPage.clickMoreButton();
  await tasksPage.clickAssignToEntity();
  await tasksPage.assertSelectEntityTypeVisible();
  await tasksPage.assertEntityTypePanelVisible();
});
