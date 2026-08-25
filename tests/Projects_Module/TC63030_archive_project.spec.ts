import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC63030 - Archive a project and confirm it appears in the Archived tab
 * Original: muuk-tests/Projects/test1/TestSteps_78341992.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? 'https://dashboard.staging.navgar.app/';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC63030 - Archive a project and confirm it appears in the Archived tab', async ({ page }) => {
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

  // Click the project name in the list to navigate to its card
  await page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`).click({ timeout: 60000 });

  // Go back to Projects list
  await projectsPage.navigateTo();

  // Archive the project
  await projectsPage.openProjectContextMenu();
  await projectsPage.clickArchiveProject();

  // Assert archive confirmation dialog
  await expect(page.locator('//DIV[normalize-space() = "Archiving the project will move this project and its tasks to the project archive. Remember that tasks in Archived Projects cannot be edited. If you want to edit a task please unarchive the project first."]')).toBeVisible({ timeout: 60000 });

  await projectsPage.confirmArchiveProject();

  // Click Archived tab
  await projectsPage.clickArchivedTab();

  // Assert the project appears in the Archived tab
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Cleanup: delete from the Archived tab
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is gone
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
