import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/*
 * TC63035 - Confirm the privacy button reflects the current privacy setting of the project (Shared)
 * Original: muuk-tests/Projects/test1/TestSteps_783c9c9c.spec.ts
 */

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';
const PROJECT_NAME = 'Muuk Project';

test('TC63035 - Privacy button reflects the current privacy setting (Shared)', async ({ page }) => {
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
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab
  await detailPage.clickOverviewTab();

  // Add new member to project
  await detailPage.addMember();

  // Return to Projects page
  await projectsPage.navigateTo();

  // Assert 'Shared' tag in project's information
  await expect(page.getByRole('gridcell', { name: 'Shared' })).toBeVisible({ timeout: 60000 });

  

  // Click the "Add members" autocomplete option (member selection step)
  //await page.locator('ul[role="listbox"] li').nth(1).click({ timeout: 60000 });

  // Click Private radio option
  //await detailPage.clickPrivateVisibility();

  // Dismiss with Escape
  //await page.keyboard.press('Escape');

  // Close the panel with the X button
  //await detailPage.closePanelWithX();

  // Assert the "Shared" visibility button is visible (reflects current setting)
  //await expect(page.locator('//input[contains(@class,"Private")][@value="shared"]')).toBeVisible({ timeout: 60000 });

  // Cleanup: delete the project
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await projectsPage.confirmDeleteProject();

  // Assert removed
  await expect(page.locator(`//SPAN[contains(text(),"${PROJECT_NAME}")]`)).not.toBeVisible({ timeout: 60000 });
});
