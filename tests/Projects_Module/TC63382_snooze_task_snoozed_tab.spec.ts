import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Projects_Module/LoginPage';
import { ProjectsPage } from '../../pages/Projects_Module/ProjectsPage';
import { ProjectDetailPage } from '../../pages/Projects_Module/ProjectDetailPage';

/**
 * TC63382
 * Snooze a project task and check the snoozed tab to confirm the task appears.
 *
 * Flow:
 * 1. Login → navigate to Projects
 * 2. Ensure empty state
 * 3. Create new project with unique name
 * 4. Assert creation toast
 * 5. Click Overview tab → Escape
 * 6. Navigate back → ensure empty state
 * 7. Click Private → Tasks tab → add task "Task" → assert task visible
 * 8. Click task "..." menu → Snooze → select tomorrow → confirm OK → Escape
 * 9. Click "+ Add description" on the task detail → Escape
 * 10. Click Private → click Tasks tab → assert "No rows" (task is snoozed) → Escape
 * 11. Expand accordion → click Snoozed Tasks tab → check checkbox → Done
 * 12. Assert "0 Open Tasks"
 * 13. Navigate Projects → cleanup (delete project)
 */
test('TC63382 - snooze task and verify it appears in Snoozed Tasks tab', async ({ page }) => {
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

  // Assert task visible
  await expect(page.locator('//div[@data-field="legend"]/descendant::span[normalize-space() = "Task"]')).toBeVisible({ timeout: 60000 });

  // Snooze the task: open task "..." → Snooze
  await detailPage.clickTaskMoreMenu();
  await detailPage.clickSnoozeMenuItem();

  // Select tomorrow in date picker → confirm OK → Escape
  await detailPage.selectTomorrowInDatePicker();
  await detailPage.confirmDatePicker();
  await page.keyboard.press('Escape');

  // Click "+ Add description" placeholder (assert it's visible, then Escape)
  await expect(page.locator('//span[contains(text(), "+ Add description")]').first()).toBeVisible({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Re-enter edit: Private → Tasks tab → assert "No rows" (task is snoozed)
  await detailPage.clickPrivateButton();
  await page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Tasks"]').click({ timeout: 60000 });
  await expect(page.locator('//DIV[contains(text(),"No rows")]')).toBeVisible({ timeout: 60000 });
  await page.keyboard.press('Escape');

  // Expand accordion → click Snoozed Tasks tab
  await detailPage.expandTasksAccordion();
  await detailPage.clickSnoozedTasksTab();

  // Check the task checkbox in snoozed tab → Done
  await detailPage.clickTaskCheckbox();
  await detailPage.clickDone();

  // Assert "0 Open Tasks"
  await expect(page.locator('//DIV[normalize-space() = "0 Open Tasks"]')).toBeVisible({ timeout: 60000 });

  // Navigate Projects → cleanup
  await projectsPage.navigateTo();
  await projectsPage.openProjectContextMenu(1);
  await projectsPage.clickDeleteProject();
  await expect(page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')).toBeVisible({ timeout: 60000 });
  await projectsPage.confirmDeleteProject();

  // Assert project is gone
  await expect(page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
});
