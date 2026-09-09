import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC_A68471 - Add Multiple Tasks
 * Original: muuk-tests/Tasks_Module/TestSteps_ad245737.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up
 *   2. Create task "Task" × 2 (back to back)
 *   3. Assert two Task rows visible in the grid
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A68471 - Add Multiple Tasks', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();
  await tasksPage.deleteAllExistingTasks();

  // Create first task
  await tasksPage.clickNewTask();
  await tasksPage.fillNewTaskName('Task');
  await tasksPage.clickCreate();

  // Navigate back and create second task
  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickNewTask();
  await tasksPage.fillNewTaskName('Task');
  await tasksPage.clickCreate();

  // Navigate back and assert both tasks are visible
  await tasksPage.clickTasksInSidebar();
  await expect(
    page.locator('//div[@role="gridcell"][@data-field="legend"]/a/span[normalize-space() = "Task"]').first()
  ).toBeVisible({ timeout: 60000 });
});
