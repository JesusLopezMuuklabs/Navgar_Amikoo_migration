import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC63041 - Confirm the history button links to the History tab of the project drawer
 * Original: muuk-tests/Projects/test1/TestSteps_784a39b3.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC63041 - History button links to the History tab of the project drawer', async ({ page }) => {
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

  // Click Overview tab (dismisses any overlays)
  await detailPage.clickOverviewTab();

  // Assert project card visible
  await expect(page.locator(`//h6[contains(text(),"${PROJECT_NAME}")]`)).toBeVisible({ timeout: 60000 });

  // Click the "History" button on the project card (opens History tab in drawer)
  await page.waitForTimeout(2000);
  await projectsPage.clickHistoryButton();

  // Assert the History tab content is visible (a paragraph mentioning the creator)
  //await expect(page.locator("//p[contains(normalize-space(.), 'Angel Ramirez')]")).toBeVisible({ timeout: 60000 });
  await expect(page.getByText('Angel Ramirez created Project')).toBeVisible({ timeout: 60000 });

  // Go back to projects list
  await projectsPage.navigateTo();

  // Cleanup: delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert the project is removed
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
