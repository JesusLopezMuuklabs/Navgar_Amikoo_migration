import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC63032 - Unarchive a project and confirm it appears in the My Projects tab
 * Original: muuk-tests/Projects/test1/TestSteps_78371806.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC63032 - Unarchive a project and confirm it appears in the My Projects tab', async ({ page }) => {
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

  // Click on the project name to navigate to the project list
  await page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`).click({ timeout: 60000 });

  // Go back to projects list
  await projectsPage.navigateTo();

  // Archive the project first (prerequisite for unarchiving)
  await projectsPage.openProjectContextMenu();
  await projectsPage.clickArchiveProject();

  // Assert archive dialog
  await expect(page.locator('//DIV[normalize-space() = "Archiving the project will move this project and its tasks to the project archive. Remember that tasks in Archived Projects cannot be edited. If you want to edit a task please unarchive the project first."]').nth(1)).toBeVisible({ timeout: 60000 });

  await projectsPage.confirmArchiveProject();

  // Click Archived tab
  await projectsPage.clickArchivedTab();

  // Assert project appears in Archived tab
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Unarchive the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickUnarchiveProject();

  // Click My Projects tab
  await projectsPage.clickMyProjectsTab();

  // Assert project appears in My Projects tab
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Cleanup: delete the project
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is removed
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
