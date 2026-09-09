import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC84304 - Confirm Value dropdown displays correct values
 * Original: muuk-tests/Tasks_Module/TestSteps_038284c2.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Navigate to Tasks
 *   3. Clean up any pre-existing "Task" rows
 *   4. Create a new task named "Task"
 *   5. Navigate back to Tasks, click the task row to open drawer
 *   6. Click "More" then "Assign to entity"
 *   7. Assert "Select Entity Type" heading and overlay panel are visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC84304 - Confirm Value dropdown displays correct values', async ({ page }) => {
  const loginPage  = new LoginPage(page);
  const tasksPage  = new TasksModulePage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  // Navigate to Tasks
  await tasksPage.clickTasksInSidebar();

  // Clean up pre-existing Task rows
  await tasksPage.deleteAllExistingTasks();

  // Create task
  await tasksPage.clickNewTask();
  await tasksPage.fillNewTaskName('Task');
  await tasksPage.clickCreate();

  // Navigate back to Tasks list and open task drawer
  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickTaskRow('Task');

  // Assert value subtitle row is visible (drawer loaded)
  await tasksPage.assertValueDropdownRowVisible();

  // Open More menu → Assign to entity
  await tasksPage.clickMoreButton();
  await tasksPage.clickAssignToEntity();

  // Assert entity type overlay appeared
  await tasksPage.assertSelectEntityTypeVisible();
  await tasksPage.assertEntityTypePanelVisible();
});
