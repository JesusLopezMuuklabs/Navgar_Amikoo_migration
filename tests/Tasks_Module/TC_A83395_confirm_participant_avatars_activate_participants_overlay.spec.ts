import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { TasksModulePage } from '../../pages/Tasks_Module/TasksModulePage';

/**
 * TC_A83395 - Confirm clicking on participant avatars activate participants overlay
 * Original: muuk-tests/Tasks_Module/TestSteps_d9238436.spec.ts
 *
 * Flow:
 *   1. Login → Tasks → clean up → Create task
 *   2. Open task drawer → Assign to a project
 *   3. Assert Task Assigner visible → Click Members
 *   4. Assert Tanner Dawson member entry is visible in the overlay
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A83395 - Confirm clicking on participant avatars activate participants overlay', async ({ page }) => {
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
  await tasksPage.clickAssignToProject();
  await tasksPage.assertTaskAssignerVisible();

  // Click Members to open participants overlay
  await tasksPage.clickMembers();
  await tasksPage.assertTannerDawsonVisible();
});
