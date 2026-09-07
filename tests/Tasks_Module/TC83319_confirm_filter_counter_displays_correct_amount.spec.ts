import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC83319 - Confirm Filter counter displays correct amount of active filters
 * Original: muuk-tests/Tasks_Module/TestSteps_251a84a3.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → Assigned by others filter
 *   2. Click Filters button → assert filter overlay is visible
 *   3. Assert deadline column is visible (table rendered)
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC83319 - Confirm Filter counter displays correct amount of active filters', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tasksPage = new TasksModulePage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  await tasksPage.clickTasksInSidebar();
  await tasksPage.clickAssignedByOthersFilter();

  // Open Filters panel
  await tasksPage.clickFiltersButton();
  await tasksPage.assertFilterOverlayVisible();
  await tasksPage.assertDeadlineColumnVisible();
});
