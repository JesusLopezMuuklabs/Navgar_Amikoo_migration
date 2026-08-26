import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63085
 * Confirm assign members option appears in the dropdown when a project's
 * privacy setting is not set to public.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project "Muuk Project"
 * 4. Assert creation toast → close toast
 * 5. Click project name to open drawer → press Escape to close overlay
 * 6. Open context menu → click "Assign Members"
 * 7. Assert the project name is still visible ("Muuk Project" appears in the members panel)
 * 8. Close the panel → cleanup (delete project)
 */
test('TC63085 - assign members option appears in dropdown for non-public project', async ({ page }) => {
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

  // Assert creation toast → close it
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });
  await detailPage.closeToast();

  // Click project name to open drawer
  await page.locator('//h6[contains(text(), "Muuk Project")]').click({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Open context menu → Assign Members
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickAssignMembers();

  // Assert "Muuk Project" title still visible in panel header
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').nth(1)).toBeVisible({ timeout: 60000 });

  // Close the panel with X
  await detailPage.closePanelWithX();

  // Dismiss any remaining overlay
  await page.keyboard.press('Escape');

  // Cleanup: Delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').first()).not.toBeVisible({ timeout: 60000 });
});
