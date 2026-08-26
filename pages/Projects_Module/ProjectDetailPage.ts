import { Page } from '@playwright/test';

/**
 * ProjectDetailPage
 * Represents the project drawer/detail panel that opens when a project is selected.
 */
export class ProjectDetailPage {
  constructor(private readonly page: Page) {}

  // ─── Drawer tabs ──────────────────────────────────────────────────────────

  async clickOverviewTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Overview"]').click({ timeout: 60000 });
    await this.page.keyboard.press('Escape');
  }

  async clickTasksTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Tasks"]').click({ timeout: 60000 });
  }

  async clickHistoryTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "History"]').click({ timeout: 60000 });
  }

  async clickCompletedTasksTab() {
    await this.page.getByRole('button', { name: 'Show filters' }).click();
    await this.page.getByRole('combobox', { name: 'Value Open' }).click();
    await this.page.getByRole('option', { name: 'Completed' }).click();
    await this.page.getByRole('button', { name: 'Show filters' }).click();
  }

  // ─── Tasks accordion ──────────────────────────────────────────────────────

  async expandTasksAccordion() {
    //await this.page.click('//span[contains(@class,"MuiAccordionSummary-expandIconWrapper")]');
    await this.page.getByRole('tab', { name: 'Tasks' }).click();
  }

  // ─── Task actions ─────────────────────────────────────────────────────────

  async addTask(taskName: string) {
    // Fill the "+ Add Task" input
    await this.page.locator('//input[@name="legend" and @placeholder="+ Add Task"]').fill(taskName);
    await this.page.keyboard.press('Enter');
  }

  async clickTaskMoreMenu(taskName: string) {
    // Click the "More" button on the task row
    await this.page.locator(`(//span[normalize-space()="${taskName}"]/ancestor::div[contains(@class,"MuiBox-root css-1hbau6j")]//button)[last()]`).click({ timeout: 60000 });
  }

  async clickSnoozeMenuItem() {
    await this.page.locator('//li[normalize-space() = "Snooze"]').click({ timeout: 60000 });
  }

  async selectTomorrowInDatePicker() {
    // Select the day after today in the MUI date picker
    await this.page.locator('//button[contains(@class,"MuiPickersDay-today")]/following::button').first().click({ timeout: 60000 });
  }

  async confirmDatePicker() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "OK"]').click({ timeout: 60000 });
  }

  async clickTaskCheckbox() {
    await this.page.locator('INPUT[type="checkbox"]').first().click({ timeout: 60000 });
  }

  // ─── Project name inline edit ─────────────────────────────────────────────

  async clickProjectNameInCard(name: string) {
    await this.page.locator(`//h6[contains(text(),"${name}")]`).click({ timeout: 60000 });
  }

  async fillDescription(description: string) {
    await this.page.locator('//textarea[@name="description"]').fill(description);
  }

  // ─── Visibility ───────────────────────────────────────────────────────────

  async clickPrivateVisibility() {
    await this.page.locator('//input[@value="private"]').click({ timeout: 60000 });
  }

  async closePanelWithX() {
    await this.page.locator('//div[@role="separator"]/following-sibling::button[1]').click({ timeout: 60000 });
  }

  // ─── Done button (Completed Tasks tab) ───────────────────────────────────

  async clickDone() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Done"]').click({ timeout: 60000 });
  }

  // ─── Add member button (Overview tab) ───────────────────────────────────
  async addMember() {
    await this.page.getByRole('combobox', { name: 'Search members to add' }).click({ timeout: 60000 });
    await this.page.getByRole('option', { name: 'Victor Villa Victor Villa' }).click({ timeout: 60000 });
    await this.page.keyboard.press('Escape');
  }
}
