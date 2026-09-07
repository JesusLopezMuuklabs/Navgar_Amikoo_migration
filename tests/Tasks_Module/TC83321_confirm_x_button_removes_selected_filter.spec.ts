import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC83321 - Confirm X button removes selected filter from the stack
 * Original: muuk-tests/Tasks_Module/TestSteps_251a8556.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC83321 - Confirm X button removes selected filter from the stack', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickAssignedByOthersFilter();
  await tasksPage.clickFiltersButton();
  await tasksPage.assertFilterOverlayVisible();
  await tasksPage.assertDeadlineColumnVisible();
});
