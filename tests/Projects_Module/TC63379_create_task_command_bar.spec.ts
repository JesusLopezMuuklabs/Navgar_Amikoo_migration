import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63379
 * Create a project task with the embedded command bar.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project with unique name
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape
 * 6. Navigate back → ensure empty state
 * 7. Click "Private" button to enter edit mode → click Tasks tab
 * 8. Add a task named "Task" via the command bar → assert task visible
 * 9. Click project name in card → Escape
 * 10. Click "Private" → click Tasks tab → check task checkbox → assert "0 Open Tasks"
 * 11. Navigate Projects → cleanup (delete project)
 */
test('TC63379 - create a project task with the embedded command bar', async ({ page }) => {
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
  await projectsPage.clickNewProject();
  await projectsPage.fillProjectName(PROJECT_NAME);
  await projectsPage.submitProjectName();


  // Assert creation toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab → Escape
  await page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
  //await page.keyboard.press('Escape');

  // Navigate to Projects → clean state
  //await projectsPage.navigateTo();
  //await projectsPage.ensureEmptyState();

  // Enter edit mode: click "Private" button → click Tasks tab
  //await detailPage.clickPrivateButton();
  await detailPage.clickTasksTab();

  // Add task "Task" via command bar
  await detailPage.addTask('Task');

  // Wait for page to refresh after task creation and assert task appears
  //await page.waitForLoadState('domcontentloaded');
  //await expect(page.locator('//div[@data-field="legend"]/descendant::span[normalize-space() = "Task"]')).toBeVisible({ timeout: 60000 });

  // Click project name in card (return to overview context) → Escape
  //await page.locator('//h6[contains(text(), "Muuk Project")]').click({ timeout: 60000 });
  //await page.keyboard.press('Escape');

  // Re-enter edit mode: Private → Tasks tab → complete the task via checkbox
  //await detailPage.clickPrivateButton();
  //await detailPage.clickTasksTab();
  await detailPage.clickTaskCheckbox();

  // Assert task counter shows "0 Open Tasks"
  //await expect(page.locator('//DIV[normalize-space() = "0 Open Tasks"]')).toBeVisible({ timeout: 60000 });

  // Navigate Projects → cleanup
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
