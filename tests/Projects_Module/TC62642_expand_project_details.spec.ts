import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC62642 - Expand and contract a project's details
 * Original: muuk-tests/Projects/test1/TestSteps_111c1e5f.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC62642 - Expand and contract a project\'s details', async ({ page }) => {
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

  // Create a new project
  await projectsPage.clickNewProject();
  await projectsPage.fillProjectName(PROJECT_NAME);
  await projectsPage.submitProjectName();

  // Assert success toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab
  await detailPage.clickOverviewTab();

  // Assert project name appears in the card
  await expect(page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Click Tasks tab
  await detailPage.clickTasksTab();

  // Assert task columns are visible
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Task Name"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//div[contains(text(),"Code")]').first()).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Due Date"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Owner"]').nth(1)).toBeVisible({ timeout: 60000 });
  await expect(page.locator('//DIV[@role="presentation"][normalize-space() = "Alerts"]').nth(1)).toBeVisible({ timeout: 60000 });

  // Go back to projects list
  await projectsPage.navigateTo();

  // Cleanup: delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is removed
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
