import { Page } from '@playwright/test';

/**
 * ProjectsPage
 * Represents the Projects list view (sidebar nav + project cards/rows).
 */
export class ProjectsPage {
  constructor(private readonly page: Page) {}

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateTo() {
    await this.page.locator('//SPAN[contains(text(),"Projects")]').click({ timeout: 60000 });
  }

  // ─── State guard ──────────────────────────────────────────────────────────

  /**
   * If a project already exists (leftover from a previous run), delete it
   * so each test starts from an empty state.
   */
  async ensureEmptyState() {
    const emptyState = this.page.locator('//div[normalize-space(text())="No rows"]');
    try {
      await emptyState.waitFor({ state: 'visible', timeout: 5000 });
      // Already empty — nothing to do
    } catch {
      // A project exists — delete it
      await this.page.locator('(//button[@aria-label="more"])[1]').click({ timeout: 10000 });
      await this.page.locator('//SPAN[contains(text(),"Delete Project")]').click({ timeout: 10000 });
      await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, delete it"]').click({ timeout: 10000 });
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
      await emptyState.waitFor({ state: 'visible', timeout: 50000 });
    }
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async clickNewProject() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "New Project"]').click({ timeout: 60000 });
  }

  async fillProjectName(name: string) {
    await this.page.locator('//label[normalize-space()="Name"]/following::input[1]').fill(name);
    //await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
  }

  async submitProjectName() {
    await this.page.keyboard.press('Enter');
  }

  // ─── Context menu ─────────────────────────────────────────────────────────

  async openProjectContextMenu(index: number = 1) {
    await this.page.locator(`(//button[@aria-label="more"])[${index}]`).click({ timeout: 60000 });
  }

  async clickDeleteProject() {
    await this.page.locator('//SPAN[contains(text(),"Delete Project")]').click({ timeout: 60000 });
  }

  async confirmDeleteProject() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, delete it"]').click({ timeout: 60000 });
  }

  async clickArchiveProject() {
    await this.page.locator('//SPAN[contains(text(),"Archive project")]').click({ timeout: 60000 });
  }

  async confirmArchiveProject() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Yes, archive"]').click({ timeout: 60000 });
  }

  async clickUnarchiveProject() {
    await this.page.locator('//SPAN[contains(text(),"Unarchive project")]').click({ timeout: 60000 });
  }

   /** Click "Edit Project" from the context menu. */
  async clickEditProject() {
    await this.page.locator('//SPAN[contains(text(),"Edit Project")]').click({ timeout: 60000 });
  }

  // ─── Tabs ─────────────────────────────────────────────────────────────────

  async clickArchivedTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Archived"]').click({ timeout: 60000 });
  }

  async clickMyProjectsTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "My projects"]').click({ timeout: 60000 });
  }

  // ─── Project card actions ─────────────────────────────────────────────────

  async clickProjectName(name: string) {
    await this.page.locator(`//h6[contains(text(),"${name}")]`).click({ timeout: 60000 });
  }

  async clickHistoryButton() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "History"]').click({ timeout: 60000 });
  }
}
