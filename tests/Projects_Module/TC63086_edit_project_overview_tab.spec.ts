import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63086
 * Confirm edit project button links to the overview tab of the project drawer.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project "Muuk Project"
 * 4. Assert creation toast → close toast
 * 5. Click project name → press Escape
 * 6. Open context menu → click "Edit Project"
 * 7. Assert "Muuk Project" appears in the drawer header (Overview tab is open)
 * 8. Close panel with X → Escape → cleanup (delete project)
 */
test('TC63086 - edit project button opens the overview tab of the project drawer', async ({ page }) => {
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

  // Open context menu → Edit Project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickEditProject();

  // Assert project name visible in the drawer (Overview tab opened)
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').nth(1)).toBeVisible({ timeout: 60000 });

  // Close the panel
  await detailPage.closePanelWithX();
  await page.keyboard.press('Escape');

  // Cleanup: Delete the project
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').first()).not.toBeVisible({ timeout: 60000 });
});
