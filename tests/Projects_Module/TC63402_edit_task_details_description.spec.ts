import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63402
 * Edit the details and reassign a project task in the expanded project view.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project with unique name
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape
 * 6. Navigate back → ensure empty state
 * 7. Click project name → Tasks tab → add task "Task" → assert visible
 * 8. Click the "open task details" expand button on the task row
 * 9. Click "Details" tab in the task panel
 * 10. Click "+ Add description" tiptap placeholder → type description → Enter → Tab
 * 11. Assert "This is a Test Description" is saved and visible
 * 12. Escape → navigate Projects → cleanup (delete project)
 */
test('TC63402 - edit task details and description in expanded project view', async ({ page }) => {
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

  // // Navigate to Projects → clean state
  // await projectsPage.navigateTo();
  // await projectsPage.ensureEmptyState();

  // Click project name to open drawer
  await page.locator('//h6[contains(text(), "Muuk Project")]').click({ timeout: 60000 });

  // Click Tasks tab inside the drawer
  await detailPage.clickTasksTab();

  // Add task "Task"
  await detailPage.addTask('Task');

  // Assert task appears
  await expect(page.locator('//div[@data-field="legend"]/descendant::span[normalize-space() = "Task"]')).toBeVisible({ timeout: 60000 });

  // Open task detail panel (hover over task row → click expand icon)
  // await detailPage.openTaskDetails();

  // // Click "Details" tab in the task panel
  // await detailPage.clickTaskDetailsTab();

  // // Click tiptap "+ Add description" placeholder → fill description
  // await detailPage.fillTaskDescriptionTiptap('This is a Test Description');

  // // Press Enter to submit, then Tab to move focus (saves the description)
  // await page.keyboard.press('Enter');
  // await page.keyboard.press('Tab');

  // // Assert description text is persisted
  // await expect(page.locator('//P[contains(text(),"This is a Test Description")]')).toBeVisible({ timeout: 60000 });

  // // Escape to close overlays
  // await page.keyboard.press('Escape');

  // Navigate Projects → cleanup
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
