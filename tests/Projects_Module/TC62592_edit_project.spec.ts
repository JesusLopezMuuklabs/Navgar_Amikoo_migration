import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC62592 - Click on project name and description to edit the field
 * Original: muuk-tests/Projects/test1/TestSteps_1ff315d7.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC62592 - Click on project name and description to edit the field', async ({ page }) => {
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

  // Assert project name visible in card
  await expect(page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Click on the project name to open inline editor
  await detailPage.clickProjectNameInCard(PROJECT_NAME);

  // Edit the description field
  await detailPage.fillDescription('Test Description');

  // Go back to projects list
  await projectsPage.navigateTo();

  // Cleanup: delete the created project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is gone
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
