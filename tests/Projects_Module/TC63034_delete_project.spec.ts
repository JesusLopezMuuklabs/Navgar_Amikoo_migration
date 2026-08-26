import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC63034 - Delete a project and confirm it is removed from the project list
 * Original: muuk-tests/Projects/test1/TestSteps_783b1cf5.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC63034 - Delete a project and confirm it is removed from the project list', async ({ page }) => {
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

  // Go back to projects list
  await projectsPage.navigateTo();

  // Delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();

  // Assert the delete confirmation dialog appears
  await expect(page.locator('//p[contains(text(),"Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });

  await projectsPage.confirmDeleteProject();

  // Assert the project is removed from the list
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
