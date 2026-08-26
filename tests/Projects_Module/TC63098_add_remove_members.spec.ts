import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63098
 * Add and remove members from the project.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project (with random suffix to avoid collision)
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape to close overlay
 * 6. Navigate back to Projects
 * 7. Ensure empty state again (safety)
 * 8. Click "Add members" input → select Angel Ramirez (option at index 1)
 * 9. Click on "Victor Villa" item (from the wiki locator in original — this step
 *    maps to selecting the Private radio from the member list)
 * 10. Click the delete chip icon to remove the member
 * 11. Navigate Projects → cleanup (delete project)
 */
test('TC63098 - add and remove members from the project', async ({ page }) => {
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

  // Create new project with a unique name (uses timestamp suffix)
  const projectName = `Muuk Project${Date.now()}`;
  await projectsPage.clickNewProject();
  await page.locator('//label[normalize-space()="Name"]/following::input[1]').fill(projectName);
  await page.keyboard.press('Enter');

  // Assert creation toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab → Escape
  await page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Navigate back to Projects → ensure empty / find our project
  await projectsPage.navigateTo();
  await projectsPage.ensureEmptyState();

  // Add a member from the "Add members" dropdown
  await detailPage.addMemberFromDropdown();

  // Remove the added member chip
  await detailPage.removeMemberChip();

  // Navigate to Projects list
  await projectsPage.navigateTo();

  // Cleanup: Delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
