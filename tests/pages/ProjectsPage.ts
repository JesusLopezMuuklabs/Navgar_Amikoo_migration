import { Page, expect } from '@playwright/test';

/**
 * ProjectsPage — interactions on the /projects list view.
 * Covers: creating, deleting, archiving, unarchiving, and navigating projects.
 */
export class ProjectsPage {
  constructor(private readonly page: Page) {}

  // ─── Navigation ────────────────────────────────────────────────────────────

  /** Click the "Projects" item in the sidebar. */
  async navigateTo() {
    await this.page.locator('//SPAN[contains(text(),"Projects")]').click({ timeout: 60000 });
  }

  // ─── State guard ───────────────────────────────────────────────────────────

  /**
   * Ensure the project list is empty before a test starts.
   * If a project already exists it is deleted so each test begins from a clean slate.
   */
  async ensureEmptyState() {
    const emptyState = this.page.locator('//div[normalize-space(text())="No rows"]');
    try {
      await emptyState.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // A project is present — delete it to reset state
      await this.page.locator('(//button[@aria-label="more"])[1]').click({ timeout: 10000 });
      await this.page.locator('//SPAN[contains(text(),"Delete Project")]').click({ timeout: 10000 });
      await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, delete it"]').click({ timeout: 10000 });
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
      await emptyState.waitFor({ state: 'visible', timeout: 50000 });
    }
  }

  // ─── Create ────────────────────────────────────────────────────────────────

  /** Click "New Project" to open the creation dialog. */
  async clickNewProject() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "New Project"]').click({ timeout: 60000 });
  }

  /** Type the project name and submit with Enter. */
  async fillProjectName(name: string) {
    await this.page.locator('//label[normalize-space()="Name"]/following::input[1]').fill(name);
    await this.page.keyboard.press('Enter');
  }

  /** Assert the success toast appears after creating a project. */
  async expectCreationSuccess() {
    await expect(
      this.page.locator('//DIV[contains(text(),"Your new project has been created succes")]')
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Delete ────────────────────────────────────────────────────────────────

  /** Open the kebab (⋯) menu for the first project in the list. */
  async openFirstProjectMenu() {
    await this.page.locator('(//button[@aria-label="more"])[1]').click({ timeout: 60000 });
  }

  /** Click "Delete Project" in the kebab menu. */
  async clickDeleteProject() {
    await this.page.locator('//SPAN[contains(text(),"Delete Project")]').click({ timeout: 60000 });
  }

  /** Confirm the delete dialog and wait for it to disappear. */
  async confirmDelete() {
    await expect(
      this.page.locator('//p[contains(text(), "Are you sure you want to delete the project")]')
    ).toBeVisible({ timeout: 60000 });
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, delete it"]').click({ timeout: 60000 });
  }

  /** Assert the project list shows the empty state after deletion. */
  async expectProjectDeleted() {
    await expect(this.page.locator('//div[normalize-space(text())="No rows"]')).toBeVisible({ timeout: 60000 });
  }

  // ─── Archive / Unarchive ───────────────────────────────────────────────────

  /** Click "Archive project" in the kebab menu. */
  async clickArchiveProject() {
    await this.page.locator('//SPAN[contains(text(),"Archive project")]').click({ timeout: 60000 });
  }

  /** Confirm the archive dialog. */
  async confirmArchive() {
    await expect(
      this.page.locator('//DIV[normalize-space() = "Archiving the project will move this project and its tasks to the project archive. Remember that tasks in Archived Projects cannot be edited. If you want to edit a task please unarchive the project first."]')
    ).toBeVisible({ timeout: 60000 });
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, archive"]').click({ timeout: 60000 });
  }

  /** Switch to the "Archived" tab. */
  async goToArchivedTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Archived"]').click({ timeout: 60000 });
  }

  /** Switch to the "My projects" tab. */
  async goToMyProjectsTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "My projects"]').click({ timeout: 60000 });
  }

  /** Click "Unarchive project" in the kebab menu. */
  async clickUnarchiveProject() {
    await this.page.locator('//SPAN[contains(text(),"Unarchive project")]').click({ timeout: 60000 });
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  /** Assert a project with the given name is visible in the list. */
  async expectProjectVisible(projectName: string) {
    await expect(
      this.page.locator(`//SPAN[contains(text(),"${projectName}")]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert the project is no longer visible (e.g. after delete/archive). */
  async expectProjectNotVisible(projectName: string) {
    await expect(
      this.page.locator(`//SPAN[contains(text(),"${projectName}")]`)
    ).not.toBeVisible({ timeout: 60000 });
  }
}
