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

  async clickTaskMoreMenu(taskName?: string) {
  if (taskName) {
    await this.page
      .locator(
        `.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary`
      )
      .click({ timeout: 60000 });

    return;
  }

  await this.page
    .locator(
      '//div[@role="row"][.//a[normalize-space()="Task"]]//div[@data-field="actions"]//button[last()]'
    )
    .click({ timeout: 60000 });
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

  /**
   * Open task detail panel by clicking the expand icon on the task row.
   * Used in TC63402.
   */
  async openTaskDetails() {
    await this.page.locator('//span[normalize-space() = "Task"]').first().hover();
    // Click the open-details icon button that appears on hover
    await this.page.locator('//div[contains(@class,"visible")]//button[1]').click({ timeout: 60000 });
  }

  async clickTaskDetailsTab() {
    await this.page.locator('//BUTTON[@type="button"][@role="tab"][normalize-space() = "Details"]').click({ timeout: 60000 });
  }

  /**
   * Click the tiptap "+ Add description" placeholder and type the description.
   * Used in TC63402 for the task rich-text editor.
   */
  async fillTaskDescriptionTiptap(description: string) {
    // Click the "+ Add description" placeholder inside tiptap
    await this.page.locator('//div[contains(@class,"tiptap")]//span[contains(text(),"Add description")]').click({ timeout: 60000 });
    // Type the description into the contenteditable area
    await this.page.locator('//p[@data-placeholder="+ Add description"]').fill(description);
  }

  // ─── Project name inline edit ─────────────────────────────────────────────

  async clickProjectNameInCard(name: string) {
    await this.page.locator(`//h6[contains(text(),"${name}")]`).click({ timeout: 60000 });
  }

  async fillDescription(description: string) {
    await this.page.locator('//textarea[@name="description"]').fill(description);
  }

  // ─── Visibility ───────────────────────────────────────────────────────────
  /** Click the "Public" button to set project visibility to public. */
  async clickPublicButton() {
    await this.page.locator('//input[contains(@class,"Private")][@value="public"]').click({ timeout: 60000 });
  }

  /** Click the "Private" button to set project visibility to private. */
  async clickPrivateButton() {
    await this.page.locator('//BUTTON[@type="button"][normalize-space() = "Private"]').click({ timeout: 60000 });
  }

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

  // ─── Notification toast ───────────────────────────────────────────────────

  /**
   * Assert the "Your new project has been created successfully" toast is visible.
   */
  async assertProjectCreatedToast() {
    await this.page.locator('//DIV[contains(text(),"Your new project has been created succes")]').waitFor({ state: 'visible', timeout: 60000 });
  }

  /**
   * Close the success toast notification.
   */
  async closeToast() {
    await this.page.locator('//BUTTON[@type="button"][@title="Close"]').click({ timeout: 60000 });
  }

  // ─── Project name inline edit (Edit Project form) ─────────────────────────

  async editProjectName(newName: string) {
    // Fill the project name textarea (Edit Project form)
    const nameField = this.page.locator('//TEXTAREA[@name="name"]');
    await nameField.clear();
    await nameField.fill(newName);
  }

  async editProjectDescription(description: string) {
    // Fill the description textarea (Edit Project form)
    const descField = this.page.locator('//TEXTAREA[@name="description"]');
    await descField.clear();
    await descField.fill(description);
  }

  async closeEditPanelWithEscape() {
    await this.page.keyboard.press('Escape');
  }

  // ─── Members (Assign Members panel) ──────────────────────────────────────

  /**
   * Add a member using the "Add members" autocomplete input.
   * Clicks the second option in the list (index 1 = Angel Ramirez in test data).
   */
  async addMemberFromDropdown() {
    await this.page.locator('input[placeholder="Add members"]').nth(0).click({ timeout: 60000 });
    // Select the second option from the autocomplete list
    await this.page.locator('ul.MuiAutocomplete-listbox li.MuiAutocomplete-option').nth(1).click({ timeout: 60000 });
  }

  /**
   * Remove the second member chip (index 1 in the chip list) from the members field.
   * Used in TC63098 to remove a just-added member.
   */
  async removeMemberChip() {
    // Click the close icon on the member chip (second svg[data-testid="CloseOutlinedIcon"])
    //await this.page.locator('svg[data-testid="CloseOutlinedIcon"]').nth(0).click({ timeout: 60000 });
    await this.page.getByRole('button', { name: 'Remove' }).first().click({ timeout: 60000 });
  }

  /**
   * Assert a member chip is visible in the members field.
   */
  async assertMemberVisible(name: string) {
    await this.page.locator(`//div[contains(@class,"MuiChip")][contains(text(),"${name}")]`).waitFor({ state: 'visible', timeout: 60000 });
  }

}
