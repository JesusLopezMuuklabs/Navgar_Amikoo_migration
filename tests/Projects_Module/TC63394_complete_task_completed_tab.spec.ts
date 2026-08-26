import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63394
 * Complete a project task and check the completed tasks tab to confirm
 * the task appears in the list.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project with unique name
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape
 * 6. Navigate back → ensure empty state
 * 7. Click Private → Tasks tab → add task "Task" → assert task visible
 * 8. Check the task checkbox (marks task complete)
 * 9. Expand accordion → click Completed Tasks tab
 * 10. Assert the completed task "Task" appears (strikethrough style)
 * 11. Navigate Projects → cleanup (delete project)
 */
test('TC63394 - complete a task and verify it appears in Completed Tasks tab', async ({ page }) => {
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

  // Create new project with unique name
  const projectName = `Muuk Project${Date.now()}`;
  await projectsPage.clickNewProject();
  await page.locator('//label[normalize-space()="Name"]/following::input[1]').fill(projectName);
  await page.keyboard.press('Enter');

  // Assert creation toast
  await expect(page.locator('//DIV[contains(text(),"Your new project has been created succes")]')).toBeVisible({ timeout: 60000 });

  // Click Overview tab → Escape
  await page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Navigate to Projects → clean state
  await projectsPage.navigateTo();
  await projectsPage.ensureEmptyState();

  // Enter edit mode: Private → Tasks tab
  await detailPage.clickPrivateButton();
  await detailPage.clickTasksTab();

  // Add task
  await detailPage.addTask('Task');

  // Assert task appears
  await expect(page.locator('//div[@data-field="legend"]/descendant::span[normalize-space() = "Task"]')).toBeVisible({ timeout: 60000 });

  // Check the task checkbox to complete it
  await detailPage.clickTaskCheckbox();

  // Expand accordion → click Completed Tasks tab
  await detailPage.expandTasksAccordion();
  await detailPage.clickCompletedTasksTab();

  // Assert completed task "Task" visible (strikethrough element)
  await expect(page.locator('//a[contains(text(), "Task")]')).toBeVisible({ timeout: 60000 });

  // Navigate Projects → cleanup
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
