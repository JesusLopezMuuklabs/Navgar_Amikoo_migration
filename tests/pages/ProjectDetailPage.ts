import { Page, expect } from '@playwright/test';

/**
 * ProjectDetailPage — interactions inside an open project drawer/detail view.
 * Covers: tabs (Overview, Tasks, History), task management, visibility, members.
 */
export class ProjectDetailPage {
  constructor(private readonly page: Page) {}

  // ─── Open project ──────────────────────────────────────────────────────────

  /** Click the project name link in the list to open the detail drawer. */
  async openProject(projectName: string) {
    await this.page.locator(`//h6[contains(text(), "${projectName}")]`).click({ timeout: 60000 });
  }

  // ─── Tab navigation ────────────────────────────────────────────────────────

  /** Click the "Overview" tab. */
  async goToOverviewTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
    await this.page.keyboard.press('Escape');
  }

  /** Click the "Tasks" tab. */
  async goToTasksTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Tasks"]').click({ timeout: 60000 });
  }

  /** Click the "History" button/tab. */
  async goToHistoryTab() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "History"]').click({ timeout: 60000 });
  }

  /** Click the "Completed Tasks" tab inside the Tasks view. */
  async goToCompletedTasksTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Completed Tasks"]').click({ timeout: 60000 });
  }

  /** Click the "Snoozed Tasks" tab inside the Tasks view. */
  async goToSnoozedTasksTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Snoozed Tasks"]').click({ timeout: 60000 });
  }

  // ─── Task column assertions ────────────────────────────────────────────────

  /** Assert a task grid column header is visible. */
  async expectColumnVisible(columnName: string) {
    await expect(
      this.page.locator(`//DIV[@role="presentation"][normalize-space() = "${columnName}"]`).first()
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Add task ──────────────────────────────────────────────────────────────

  /**
   * Expand the task section accordion (if collapsed) then type a task name
   * in the "+ Add Task" input and press Enter.
   */
  async addTask(taskName: string) {
    // Expand accordion if needed
    const accordion = this.page.locator('//span[contains(@class,"MuiAccordionSummary-expandIconWrapper")]');
    if (await accordion.isVisible()) {
      await accordion.click();
    }
    await this.page.locator('//input[@name="legend" and @placeholder="+ Add Task"]').fill(taskName);
    await this.page.keyboard.press('Enter');
  }

  /** Click the task name link to open the task detail panel. */
  async openTask(taskName: string) {
    await this.page.locator(`//a//span[contains(text(),"${taskName}")]`).click({ timeout: 60000 });
  }

  /** Assert the open task count badge is visible. */
  async expectOpenTaskCount(count: number) {
    await expect(
      this.page.locator(`//DIV[normalize-space() = "${count} Open Tasks"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Complete a task ───────────────────────────────────────────────────────

  /** Check the first task checkbox to mark it complete. */
  async completeFirstTask() {
    await this.page.locator('INPUT[type="checkbox"]').first().click({ timeout: 60000 });
  }

  /** Click the "Done" button to close the task detail panel. */
  async clickDone() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Done"]').click({ timeout: 60000 });
  }

  // ─── Snooze a task ─────────────────────────────────────────────────────────

  /** Click the "More" button on the task detail panel. */
  async clickMoreOnTask(taskName: string) {
    await this.page.locator(
      `(//span[normalize-space()="${taskName}"]/ancestor::div[contains(@class,"MuiBox-root css-1hbau6j")]//button)[last()]`
    ).click({ timeout: 60000 });
  }

  /** Click "Snooze" in the More menu. */
  async clickSnooze() {
    await this.page.locator('//li[normalize-space() = "Snooze"]').click({ timeout: 60000 });
  }

  /** Select tomorrow in the date picker (first day after today) and confirm. */
  async selectTomorrowAndConfirm() {
    await this.page.locator('//button[contains(@class, "MuiPickersDay-today")]/following::button').first().click({ timeout: 60000 });
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "OK"]').click({ timeout: 60000 });
  }

  // ─── Edit project inline ───────────────────────────────────────────────────

  /** Click the project name in the detail header to make it editable. */
  async clickProjectNameToEdit(projectName: string) {
    await this.page.locator(`//h6[contains(text(),"${projectName}")]`).click({ timeout: 60000 });
  }

  /** Fill the inline description textarea. */
  async fillDescription(description: string) {
    await this.page.locator('//textarea[@name="description"]').fill(description);
  }

  // ─── Visibility ────────────────────────────────────────────────────────────

  /** Click the Private radio option. */
  async setVisibilityPrivate() {
    await this.page.locator('//input[@value="private"]').click({ timeout: 60000 });
  }

  /** Assert the project shows "Shared" visibility button. */
  async expectSharedVisibility() {
    await expect(
      this.page.locator('//input[contains(@class, "Private")][@value="shared"]')
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Members ───────────────────────────────────────────────────────────────

  /** Click the "Add members" input to open the member search. */
  async clickAddMembers() {
    await this.page.locator('input[placeholder="Add members"]').click({ timeout: 60000 });
  }

  // ─── Close drawer ──────────────────────────────────────────────────────────

  /** Click the close (X) button on the project drawer. */
  async closeDrawer() {
    await this.page.locator('//div[@role="separator"]/following-sibling::button[1]').click({ timeout: 60000 });
  }

  // ─── History ───────────────────────────────────────────────────────────────

  /** Assert history entry containing `text` is visible. */
  async expectHistoryEntry(text: string) {
    await expect(
      this.page.locator(`//p[contains(text(), "${text}")]`)
    ).toBeVisible({ timeout: 60000 });
  }
}
