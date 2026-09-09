import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC_A83481 - Confirm Reassign button prompts assignee overlay
 * Original: muuk-tests/Tasks_Module/TestSteps_417d1c53.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task
 *   2. Open task drawer → More → Reassign
 *   3. Assert search input in overlay is visible
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A83481 - Confirm Reassign button prompts assignee overlay', async ({ page }) => {
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

  // Click Reassign in the More menu
  await tasksPage.clickReassign();

  // Assert the assignee search input is visible in the overlay
  await expect(page.locator('//input[@placeholder="Search"]').first()).toBeVisible({ timeout: 60000 });
});
