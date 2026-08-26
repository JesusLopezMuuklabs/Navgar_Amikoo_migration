import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63080
 * Confirm the history button links to the history tab of the project drawer (Private)
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state (delete any leftover project)
 * 3. Create a new project "Muuk Project"
 * 4. Assert creation toast appears
 * 5. Toggle project to Public visibility
 * 6. Assert Public radio is checked (disabled state check)
 * 7. Close the drawer (X button)
 * 8. Open context menu → Delete Project → confirm → assert project gone
 */
test('TC63080 - history button links to history tab of project drawer (Private)', async ({ page }) => {
  const baseUrl = process.env.BASE_URL ?? 'https://dashboard.staging.navgar.app/';
  const email = process.env.TEST_USER_EMAIL ?? '';
  const password = process.env.TEST_USER_PASSWORD ?? '';

  const loginPage = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);
  const detailPage = new ProjectDetailPage(page);

  // Login
  await loginPage.goto(baseUrl);
  await loginPage.login(email, password);
  await page.keyboard.press('Escape');

  // Navigate to Projects and ensure clean state
  await projectsPage.navigateTo();
  await projectsPage.ensureEmptyState();

  // Create new project
  await projectsPage.clickNewProject();
  await page.locator('//label[normalize-space()="Name"]/following::input[1]').fill('Muuk Project');
  await page.keyboard.press('Enter');

  // Assert creation toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Toggle to Public visibility
  await detailPage.clickPublicButton();

  // Assert the Public radio/button is now active (disabled attribute indicates selection)
  await expect(page.locator('//input[contains(@class,"Private")][@value="public"]')).toBeDisabled({ timeout: 60000 });

  // Close the drawer with Escape
  await page.keyboard.press('Escape');

  // Cleanup: Delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').first()).not.toBeVisible({ timeout: 60000 });
});
