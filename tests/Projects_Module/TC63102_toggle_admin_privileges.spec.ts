import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63102
 * Toggle admin privileges for added members.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project with unique name
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape
 * 6. Navigate back → ensure empty state (cleans up second project if any)
 * 7. Add member from dropdown (Angel Ramirez at index 1)
 * 8. Click "Victor Villa" item (wiki locator → maps to private radio in Muuk)
 * 9. Press Escape → close panel with X
 * 10. Navigate Projects → cleanup (delete)
 */
test('TC63102 - toggle admin privileges for added members', async ({ page }) => {
  const baseUrl = process.env.BASE_URL ?? 'https://dashboard.staging.navgar.app/';
  const email = process.env.TEST_USER_EMAIL ?? '';
  const password = process.env.TEST_USER_PASSWORD ?? '';
  const PROJECT_NAME = 'Muuk Project';

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

  // Create new project with unique name
  // const projectName = `Muuk Project${Date.now()}`;
  // await projectsPage.clickNewProject();
  // await page.locator('//label[normalize-space()="Name"]/following::input[1]').fill(projectName);
  // await page.keyboard.press('Enter');
  await projectsPage.clickNewProject();
  await projectsPage.fillProjectName(PROJECT_NAME);
  await projectsPage.submitProjectName();
  

  // Assert creation toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab → Escape
  await page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Navigate to Projects → clean state for member interaction
  //await projectsPage.navigateTo();
  //await projectsPage.ensureEmptyState();

  // Add member from dropdown (Angel Ramirez)
  await detailPage.addMember();
  //await detailPage.addMemberFromDropdown();

  // Click on the "Private" radio option in member toggle (maps to pageDetails31 / Victor Villa in Muuk)
  //await page.locator('//input[contains(@class,"Private")][@value="private"]').click({ timeout: 60000 });

  // Press Escape → close panel
  //await page.keyboard.press('Escape');
  //await detailPage.closePanelWithX();

  // Navigate to Projects → cleanup
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
