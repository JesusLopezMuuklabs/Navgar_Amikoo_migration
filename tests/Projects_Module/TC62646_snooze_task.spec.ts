import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC62646 - Snooze a project task and check the snoozed tab to confirm the task appears
 * Original: muuk-tests/Projects/test1/TestSteps_111d0a58.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';
const TASK_NAME    = 'Task';

test('TC62646 - Snooze a project task and check the snoozed tab', async ({ page }) => {
  const loginPage    = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);
  const detailPage   = new ProjectDetailPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Navigate to Projects
  await projectsPage.navigateTo();

  // Ensure empty state
  await projectsPage.ensureEmptyState();

  // Create project
  await projectsPage.clickNewProject();
  await projectsPage.fillProjectName(PROJECT_NAME);
  await projectsPage.submitProjectName();

  // Assert success toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab
  await detailPage.clickOverviewTab();

  // Assert project card visible
  await expect(page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Go to Tasks tab
  await detailPage.clickTasksTab();

  // Assert task columns visible
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Task Name"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Alerts"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Due Date"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Owner"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//div[contains(text(),"Code")]').first()).toBeVisible({ timeout: 60000 });

  // Add a task via the "+ Add Task" input
  await detailPage.addTask(TASK_NAME);

  // Click on the task name link to open task actions
  await page.locator(`//a//span[contains(text(),"${TASK_NAME}")]`).first().click({ timeout: 60000 });

  // Click "More" menu on the task row
  await detailPage.clickTaskMoreMenu(TASK_NAME);

  // Click Snooze
  await detailPage.clickSnoozeMenuItem();

  // Select tomorrow in the date picker
  await detailPage.selectTomorrowInDatePicker();

  // Confirm date picker
  await detailPage.confirmDatePicker();

  // Go back to projects list
  await projectsPage.navigateTo();

  // Cleanup: delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is gone
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
