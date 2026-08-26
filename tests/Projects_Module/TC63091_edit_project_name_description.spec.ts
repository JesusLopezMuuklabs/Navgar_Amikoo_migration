import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63091
 * Edit project name and description and confirm the changes appear in the header.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project "Muuk Project"
 * 4. Assert creation toast → close toast
 * 5. Click project name → Escape
 * 6. Click "Private" button to open the Edit Project form (Overview/edit mode)
 * 7. Fill new name "Muuk Project edit" and description "this is a description test from Muuk"
 * 8. Press Escape to save
 * 9. Assert "Muuk Project edit" appears in the header span
 * 10. Re-click "Private" button → assert description is visible → Escape
 * 11. Close panel with X → navigate Projects → cleanup (delete)
 */
test('TC63091 - edit project name and description appear in header', async ({ page }) => {
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

  // Click "Private" button to open the edit form
  await detailPage.clickPrivateButton();

  // Edit name and description
  await detailPage.editProjectName('Muuk Project edit');
  await detailPage.editProjectDescription('this is a description test from Muuk');

  // Press Escape to trigger save
  await page.keyboard.press('Escape');

  // Assert updated name appears in the header
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project edit")]')).toBeVisible({ timeout: 60000 });

  // Re-open edit form to verify description persisted
  await detailPage.clickPrivateButton();
  await expect(page.locator('//textarea[normalize-space() = "this is a description test from Muuk"]')).toBeVisible({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Close drawer
  await detailPage.closePanelWithX();

  // Navigate to Projects list
  await projectsPage.navigateTo();

  // Cleanup: Delete the project (now named "Muuk Project edit")
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//SPAN[contains(text(),"Muuk Project")]').first()).not.toBeVisible({ timeout: 60000 });
});
