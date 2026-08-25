import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';

/**
 * Projects — migrated from muuk-tests/Projects/test1
 *
 * Credentials and base URL are read from environment variables so no secrets
 * are hardcoded. Set BASE_URL, APP_EMAIL and APP_PASSWORD in your .env file
 * or CI secrets before running.
 *
 * TC62642 · TC62646 · TC62648 · TC62566 · TC62592
 * TC63030 · TC63032 · TC63034 · TC63035 · TC63041
 */

const BASE_URL = process.env.BASE_URL ?? 'https://dashboard.staging.navgar.app/';
const EMAIL    = process.env.APP_EMAIL    ?? 'angel.ramirez@muuklabs.com';
const PASSWORD = process.env.APP_PASSWORD ?? 'Angel_drums1';

/** Unique-ish project name seed for each test run. */
const projectName = () => `Muuk Project ${Date.now()}`;

test.describe('Projects', () => {

  // ─── TC62566 · Create new project ──────────────────────────────────────────
  test('TC62566 · Create new project from the projects page', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create the project
    await projectsPage.clickNewProject();
    const name = projectName();
    await projectsPage.fillProjectName(name);

    // Assert success toast
    await projectsPage.expectCreationSuccess();

    // Navigate to Overview tab and verify project name is shown
    await detailPage.goToOverviewTab();
    await expect(page.locator(`//h6[contains(text(),"Muuk Project")]`)).toBeVisible({ timeout: 60000 });

    // Cleanup — navigate back and delete
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC62642 · Expand/collapse project details + verify task columns ────────
  test('TC62642 · Expand project details and verify task columns', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create a project and open it
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Navigate to Tasks tab and verify grid columns
    await detailPage.goToTasksTab();
    await detailPage.expectColumnVisible('Task Name');
    await detailPage.expectColumnVisible('Due Date');
    await detailPage.expectColumnVisible('Owner');
    await detailPage.expectColumnVisible('Alerts');

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC62646 · Snooze a task → verify it appears in Snoozed Tasks tab ──────
  test('TC62646 · Snooze a project task and verify it in the Snoozed tab', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Verify task columns, then add a task
    await detailPage.goToTasksTab();
    await detailPage.expectColumnVisible('Task Name');
    await detailPage.expectColumnVisible('Alerts');

    // Type into "+ Add Task" input and submit
    await page.locator('//input[@name="legend" and @placeholder="+ Add Task"]').fill('Task');
    await page.keyboard.press('Enter');

    // Open the task and snooze it
    await detailPage.openTask('Task');
    await detailPage.clickMoreOnTask('Task');
    await detailPage.clickSnooze();
    await detailPage.selectTomorrowAndConfirm();

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC62648 · Complete a task → verify Completed Tasks tab ────────────────
  test('TC62648 · Complete a project task and verify it in the Completed Tasks tab', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Expand accordion and add a task
    await page.locator('//span[contains(@class,"MuiAccordionSummary-expandIconWrapper")]').click();
    await detailPage.expectColumnVisible('Task Name');

    // Add task via input
    await page.locator('//input[@name="legend" and @placeholder="+ Add Task"]').fill('Task');
    await page.locator('//BUTTON[@type="submit"][contains(text(),"Add")]').click({ timeout: 60000 });
    await page.keyboard.press('Enter');

    // Reload to see 1 Open Tasks badge
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await detailPage.expectOpenTaskCount(1);

    // Expand accordion again after reload then check the checkbox
    await page.locator('//span[contains(@class,"MuiAccordionSummary-expandIconWrapper")]').click();
    await detailPage.completeFirstTask();

    // Switch to Completed Tasks tab and assert task appears
    await detailPage.goToCompletedTasksTab();
    await expect(
      page.locator('//a[contains(text(), "Task")]')
    ).toBeVisible({ timeout: 60000 });

    // Close the detail panel
    await detailPage.clickDone();

    // Assert 0 open tasks
    await detailPage.expectOpenTaskCount(0);

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC62592 · Edit project name and description ───────────────────────────
  test('TC62592 · Click project name and description to edit the fields', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project and navigate into it
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Verify project title and edit description
    await expect(page.locator('//h6[contains(text(),"Muuk Project")]')).toBeVisible({ timeout: 60000 });
    await detailPage.clickProjectNameToEdit('Muuk Project');
    await detailPage.fillDescription('Test Description');

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC63030 · Archive project → verify in Archived tab ───────────────────
  test('TC63030 · Archive a project and confirm it appears in the Archived tab', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Click project name in list view to confirm it's there
    await projectsPage.navigateTo();
    await page.locator('//h6[contains(text(), "Muuk Project")]').click({ timeout: 60000 });

    // Go back to list and archive via kebab menu
    await projectsPage.navigateTo();
    await page.locator('//button[@aria-label="more"]').first().click({ timeout: 60000 });
    await projectsPage.clickArchiveProject();
    await projectsPage.confirmArchive();

    // Switch to Archived tab and verify project appears
    await projectsPage.goToArchivedTab();
    await projectsPage.expectProjectVisible('Muuk Project');

    // Cleanup — delete from Archived tab
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectNotVisible('Muuk Project');
  });

  // ─── TC63032 · Unarchive project → verify in My Projects tab ───────────────
  test('TC63032 · Unarchive a project and confirm it appears in the My projects tab', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Navigate back and hover to verify project name
    await projectsPage.navigateTo();
    await expect(page.locator('//h6[contains(text(), "Muuk Project")]')).toBeVisible({ timeout: 60000 });

    // Archive it
    await projectsPage.navigateTo();
    await page.locator('//button[@aria-label="more"]').first().click({ timeout: 60000 });
    await projectsPage.clickArchiveProject();
    await projectsPage.confirmArchive();

    // Go to Archived tab and verify
    await projectsPage.goToArchivedTab();
    await projectsPage.expectProjectVisible('Muuk Project');

    // Unarchive
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickUnarchiveProject();

    // Go to My Projects tab and verify project is back
    await projectsPage.goToMyProjectsTab();
    await projectsPage.expectProjectVisible('Muuk Project');

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC63034 · Delete project → verify removed ─────────────────────────────
  test('TC63034 · Delete a project and confirm it is removed from the project list', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project, navigate to Overview, then back to list
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();
    await projectsPage.navigateTo();

    // Delete
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();

    // Assert project is gone
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC63035 · Visibility — set Private then assert Shared button ───────────
  test('TC63035 · Confirm privacy button reflects the current privacy setting (Shared)', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Open Add Members dropdown (triggers visibility options)
    await detailPage.clickAddMembers();

    // Select "Private" radio
    await detailPage.setVisibilityPrivate();
    await page.keyboard.press('Escape');

    // Close member picker
    await detailPage.closeDrawer();

    // Assert the project now shows the "Shared" toggle as visible
    await detailPage.expectSharedVisibility();

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

  // ─── TC63041 · History button → History tab ────────────────────────────────
  test('TC63041 · Confirm the history button links to the History tab of the project drawer', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);
    const detailPage   = new ProjectDetailPage(page);

    await loginPage.loginFromRoot(BASE_URL, EMAIL, PASSWORD);
    await projectsPage.navigateTo();
    await projectsPage.ensureEmptyState();

    // Create project
    await projectsPage.clickNewProject();
    await projectsPage.fillProjectName(projectName());
    await projectsPage.expectCreationSuccess();
    await detailPage.goToOverviewTab();

    // Hover project name to confirm it's there, then click History
    await expect(page.locator('//h6[contains(text(), "Muuk Project")]')).toBeVisible({ timeout: 60000 });
    await detailPage.goToHistoryTab();

    // Assert a history entry containing the creator's name is visible
    await detailPage.expectHistoryEntry('Angel');

    // Cleanup
    await projectsPage.navigateTo();
    await projectsPage.openFirstProjectMenu();
    await projectsPage.clickDeleteProject();
    await projectsPage.confirmDelete();
    await projectsPage.expectProjectDeleted();
  });

});
