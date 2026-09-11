import { Page, expect } from '@playwright/test';

/**
 * AppsPage
 * Page Object for the Applications module (sidebar nav, app card list,
 * favorites, app-instances table, and table toolbar).
 * Migrated from: muuk-tests/Apps_Module/PageDetails.ts
 */
export class AppsPage {
  constructor(private readonly page: Page) {}

  // ─── Sidebar / Navigation ────────────────────────────────────────────────

  /** Click "Applications" in the sidebar. */
  async navigateToApplications() {
    await this.page.locator('//SPAN[normalize-space() = "Applications"]').click({ timeout: 60000 });
  }

  /** Click "Flow Templates" in the sidebar. */
  async navigateToFlowTemplates() {
    await this.page.locator('//SPAN[normalize-space() = "Flow Templates"]').click({ timeout: 60000 });
  }

  // ─── Login ────────────────────────────────────────────────────────────────

  /** Click the "Log In" link on the landing page. */
  async clickLogIn() {
    await this.page.locator('//a[contains(text(),"Log In")]').click({ timeout: 60000 });
  }

  /** Fill the email field. */
  async fillEmail(email: string) {
    await this.page.locator(`INPUT[type='email'][name='user[email]'][id='user_email']`).fill(email, { timeout: 60000 });
  }

  /** Fill the password field. */
  async fillPassword(password: string) {
    await this.page.locator(`INPUT[type='password'][name='user[password]'][id='user_password']`).fill(password, { timeout: 60000 });
  }

  /** Click the submit/login button. */
  async clickSubmit() {
    await this.page.locator(`INPUT[type='submit'][name='commit']`).click({ timeout: 60000 });
  }

  // ─── App Cards List ───────────────────────────────────────────────────────

  /** Assert "Applications" heading is visible. */
  async assertApplicationsHeadingVisible() {
    await expect(this.page.locator('//h6[normalize-space() = "Applications"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click an app card by its name. */
  async clickAppCard(name: string) {
    await this.page.locator(`//P[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Click "View details" on an app card by its name. */
  async clickViewDetailsByAppName(name: string) {
    await this.page
      .locator(`//p[contains(@class, "MuiTypography-root") and contains(text(), "${name}")]/ancestor::div[contains(@class, "group") and contains(@class, "justify-between")][1]//button[contains(., "View details")]`)
      .click({ timeout: 60000 });
  }

  /** Click "View details" button (generic – first match). */
  async clickViewDetails() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "View details"]`).click({ timeout: 60000 });
  }

  // ─── Favorites ────────────────────────────────────────────────────────────

  /** Click "Add to favorites" button on a specific app card. */
  async clickAddToFavorites(appName: string) {
    await this.page
      .locator(`(//p[text()='${appName}']/ancestor::div[contains(@class,'MuiBox-root')]//button[.//*[@aria-label='Add to favorites']])[last()]`)
      .click({ timeout: 60000 });
  }

  /** Click "Remove from favorites" button on a specific app card. */
  async clickRemoveFromFavorites(appName: string) {
    await this.page
      .locator(`(//p[text()='${appName}']/ancestor::div[contains(@class,'MuiBox-root')]//button[.//*[@aria-label='Remove from favorites']])[last()]`)
      .click({ timeout: 60000 });
  }

  /** Assert "Added to favorites successfully" toast is visible. */
  async assertAddedToFavoritesToastVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Added to favorites successfully"]').nth(2)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Removed from favorites successfully" toast is visible. */
  async assertRemovedFromFavoritesToastVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Removed from favorites successfully"]').nth(2)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the favorites section card for a given app name is visible. */
  async assertAppInFavoritesSection(appName: string) {
    await expect(
      this.page.locator(`//h6[text()='Favorites']/following-sibling::div//p[text()='${appName}']/ancestor::div[contains(@class,'MuiBox-root')][1]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── App Card Actions ─────────────────────────────────────────────────────

  /** Click the info (i) icon on the first card. */
  async clickInfoIcon() {
    await this.page.locator(`//div[contains(@class,"MuiCard-root")]//div[1]/button[3]`).click({ timeout: 60000 });
  }

  /** Assert the app description popup text is visible. */
  async assertAppDescriptionVisible(description: string) {
    await expect(this.page.locator(`//DIV[normalize-space() = "${description}"]`).nth(2)).toBeVisible({ timeout: 60000 });
  }

  // ─── App Launch (from card) ───────────────────────────────────────────────

  /** Click "Launch" button on the app card. */
  async clickLaunch() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Launch"]`).click({ timeout: 60000 });
  }

  /** Assert the "Executing <flow>" heading is visible. */
  async assertExecutingHeadingVisible(flowName: string) {
    await expect(this.page.locator(`//h6[contains(text(), 'Executing')]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click "Execute" in the launch overlay. */
  async clickExecute() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Execute"]`).click({ timeout: 60000 });
  }

  /** Fill the "Flow Instance Name" field in the launch overlay. */
  async fillFlowInstanceName(name: string) {
    await this.page.locator(`INPUT[name='Flow Instance Name'][type='text']`).fill(name, { timeout: 60000 });
  }

  // ─── App Card Counters ────────────────────────────────────────────────────

  /** Assert a "Running" counter chip with the given count is visible. */
  async assertRunningCounterVisible(count: number) {
    await expect(this.page.locator(`//DIV[@role='button'][normalize-space() = "Running${count}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert a "My tasks" chip with the given count is visible. */
  async assertMyTasksCounterVisible(label: string) {
    await expect(this.page.locator(`//DIV[@role='button'][normalize-space() = "${label}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert an "Unread chats" chip with the given count is visible. */
  async assertUnreadChatsCounterVisible(label: string) {
    await expect(this.page.locator(`//DIV[@role='button'][normalize-space() = "${label}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the "Running" counter chip (navigates to instances table). */
  async clickRunningCounter(count: number) {
    await this.page.locator(`//DIV[@role='button'][normalize-space() = "Running${count}"]`).click({ timeout: 60000 });
  }

  /** Click "My tasks" chip (navigates to instances table). */
  async clickMyTasksCounter(label: string) {
    await this.page.locator(`//DIV[@role='button'][normalize-space() = "${label}"]`).click({ timeout: 60000 });
  }

  /** Click "Unread chats" chip (navigates to instances table). */
  async clickUnreadChatsCounter(label: string) {
    await this.page.locator(`//DIV[@role='button'][normalize-space() = "${label}"]`).click({ timeout: 60000 });
  }

  // ─── Search (apps list) ───────────────────────────────────────────────────

  /** Fill the search input on the Applications page. */
  async searchApps(query: string) {
    await this.page.locator(`INPUT[placeholder='Search'][type='text']`).fill(query, { timeout: 60000 });
  }

  // ─── App Instances Table (header) ─────────────────────────────────────────

  /** Assert the flow template name heading is visible in the table view. */
  async assertFlowTemplateHeadingVisible(name: string) {
    await expect(this.page.locator(`//h6[normalize-space() = "${name}"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Table Toolbar: Columns ───────────────────────────────────────────────

  /** Click "Columns" button in the toolbar. */
  async clickColumnsButton() {
    await this.page.locator(`//BUTTON[@type='button'][contains(text(), "olumns")]`).click({ timeout: 60000 });
  }

  /** Assert Reset button is disabled (before any column change). */
  async assertResetButtonDisabled() {
    await expect(this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Reset"]`)).toBeDisabled({ timeout: 60000 });
  }

  /** Assert Reset button is enabled (after column change). */
  async assertResetButtonEnabled() {
    await expect(this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Reset"]`)).toBeEnabled({ timeout: 60000 });
  }

  /** Fill the column search input in the Columns panel. */
  async searchColumn(term: string) {
    await this.page.locator(`INPUT[placeholder='Search'][type='search']`).fill(term, { timeout: 60000 });
  }

  /** Click the Clear (X) button inside the Columns search. */
  async clickColumnSearchClear() {
    await this.page.locator(`//button[@aria-label="Clear"]`).click({ timeout: 60000 });
  }

  /** Assert a label is visible inside the Columns panel (checkbox label). */
  async assertColumnLabelVisible(label: string) {
    await expect(this.page.locator(`//LABEL[normalize-space() = "${label}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click a column span label to toggle it. */
  async clickColumnSpanLabel(label: string) {
    await this.page.locator(`//SPAN[normalize-space() = "${label}"]`).click({ timeout: 60000 });
  }

  /** Assert a column header presentation div is NOT visible (column hidden). */
  async assertColumnHidden(columnName: string) {
    await expect(
      this.page.locator(`//DIV[@role='presentation'][normalize-space() = "${columnName}"]`).nth(1)
    ).not.toBeVisible({ timeout: 60000 });
  }

  /** Assert a column header presentation div IS visible (column shown). */
  async assertColumnVisible(columnName: string) {
    await expect(
      this.page.locator(`//DIV[@role='presentation'][normalize-space() = "${columnName}"]`).nth(1)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Click the detail panel toggle aria-label cell. */
  async assertDetailPanelToggleHidden() {
    await expect(this.page.locator(`DIV[aria-label="Detail panel toggle"]`)).not.toBeVisible({ timeout: 60000 });
  }

  /** Click Reset inside the Columns panel. */
  async clickResetColumns() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Reset"]`).click({ timeout: 60000 });
  }

  // ─── Table Toolbar: Filters ───────────────────────────────────────────────

  /** Click the "Filters" button in the toolbar. */
  async clickFiltersButton() {
    await this.page.locator(`//BUTTON[@type='button'][contains(text(), "Filters")]`).click({ timeout: 60000 });
  }

  /** Click "Add filter" in the filter panel. */
  async clickAddFilter() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Add filter"]`).click({ timeout: 60000 });
  }

  /** Click "Remove all" filters. */
  async clickRemoveAllFilters() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove all"]`).click({ timeout: 60000 });
  }

  /** Assert the filter badge count is visible. */
  async assertFilterBadgeCount(count: number) {
    await expect(
      this.page.locator(`//button[contains(., "Filters")]//span[contains(@class, "MuiBadge-badge") and normalize-space(text())="${count}"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Click a delete filter button by index (0-based). */
  async clickDeleteFilterAtIndex(index: number) {
    await this.page.locator(`//button[@title="Delete"]`).nth(index).click({ timeout: 60000 });
  }

  // ─── Table Toolbar: Density ───────────────────────────────────────────────

  /** Click "Density" button in the toolbar. */
  async clickDensityButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Density"]`).click({ timeout: 60000 });
  }

  /** Click a density option (Compact | Standard | Comfortable). */
  async clickDensityOption(option: 'Compact' | 'Standard' | 'Comfortable') {
    await this.page.locator(`//SPAN[normalize-space() = "${option}"]`).click({ timeout: 60000 });
  }

  /** Assert a row height div is visible (e.g. 36px for Compact). */
  async assertRowHeightVisible(heightPx: number) {
    await expect(
      this.page.locator(`//div[@style="max-height: ${heightPx}px; min-height: ${heightPx}px; --height: ${heightPx}px;"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert a row height div is NOT visible. */
  async assertRowHeightNotVisible(heightPx: number) {
    await expect(
      this.page.locator(`//div[@style="max-height: ${heightPx}px; min-height: ${heightPx}px; --height: ${heightPx}px;"]`)
    ).not.toBeVisible({ timeout: 60000 });
  }

  // ─── Table Toolbar: Export ────────────────────────────────────────────────

  /** Click "Export" button in the toolbar. */
  async clickExportButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Export"]`).click({ timeout: 60000 });
  }

  /** Click "Download as CSV" from the export menu. */
  async clickDownloadAsCsv() {
    await this.page.locator(`//A[@role='menuitem'][normalize-space() = "Download as CSV"]`).click({ timeout: 60000 });
  }

  // ─── Table Toolbar: Expand Tasks ─────────────────────────────────────────

  /** Click "Expand tasks" toggle button. */
  async clickExpandTasks() {
    await this.page.locator(`//button[contains(., 'Expand tasks')]`).click({ timeout: 60000 });
  }

  /** Assert table rows (tbody/tr) are visible. */
  async assertTableRowsVisible() {
    await expect(this.page.locator(`//tbody/tr`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert table rows are NOT visible. */
  async assertTableRowsNotVisible() {
    await expect(this.page.locator(`//tbody/tr`)).not.toBeVisible({ timeout: 60000 });
  }

  // ─── Table Toolbar: Filters by Column (inside running instances) ──────────

  /** Click the column filter combobox showing "Chat". */
  async clickFilterColumnComboboxChat() {
    await this.page.locator(`//DIV[@role='combobox'][normalize-space() = "Chat"]`).click({ timeout: 60000 });
  }

  /** Select a filter option by index in the dropdown (0-based). */
  async selectFilterOptionAtIndex(index: number) {
    await this.page.locator(`LI[role='option']`).nth(index).click({ timeout: 60000 });
  }

  /** Click the value combobox (zero-width space, initial value). */
  async clickFilterValueCombobox() {
    await this.page.locator(`//DIV[@role='combobox'][normalize-space() = "​"]`).click({ timeout: 60000 });
  }

  // ─── Instance Table – Chat column ────────────────────────────────────────

  /** Click the chat icon link in the first table row. */
  async clickChatIconLink() {
    await this.page
      .locator(`div.MuiDataGrid-cell.MuiDataGrid-cell--textCenter>a.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-mfslm7`)
      .click({ timeout: 60000 });
  }

  /** Hover over the Chat column header (presentation div). */
  async hoverChatColumnHeader() {
    await this.page.locator(`//DIV[@role='presentation'][normalize-space() = "Chat"]`).nth(1).hover({ timeout: 60000 });
  }

  // ─── Instance Detail (task pane) ─────────────────────────────────────────

  /** Hover over "First Task" task div. */
  async hoverFirstTask() {
    await this.page.locator(`//DIV[normalize-space() = "First Task"]`).hover({ timeout: 60000 });
  }

  /** Hover over "Form submitted" label. */
  async hoverFormSubmitted() {
    await this.page.locator(`//P[normalize-space() = "Form submitted"]`).hover({ timeout: 60000 });
  }

  /** Click the close button (24th BUTTON[type='button'] used for closing instance detail). */
  async clickCloseInstanceDetail() {
    await this.page.locator(`BUTTON[type='button']`).nth(24).click({ timeout: 60000 });
  }

  /** Click the task completion checkbox (1-indexed). */
  async clickTaskCheckbox() {
    await this.page.locator(`INPUT[type='checkbox']`).nth(1).click({ timeout: 60000 });
  }

  /** Assert "Task completed successfully" toast is visible. */
  async assertTaskCompletedToastVisible() {
    await expect(this.page.locator(`//DIV[normalize-space() = "Task completed successfully"]`).nth(2)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "0%" progress label is visible. */
  async assertZeroPercentProgressVisible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "0%"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Flow Group Management (from Flow Templates flow) ─────────────────────

  /** Click the "Flow Templates" span in the sidebar breadcrumb. */
  async clickFlowTemplatesSpan() {
    await this.page.locator(`//SPAN[normalize-space() = "Flow Templates"]`).click({ timeout: 60000 });
  }

  /** Click "+ New Flow Group" button. */
  async clickNewFlowGroup() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "+ New Flow Group"]`).click({ timeout: 60000 });
  }

  /** Click the flow group edit icon. */
  async clickFlowGroupEditIcon() {
    await this.page
      .locator(`//div[contains(@class,'flex items-center')]//div[contains(@class,'relative')][2]/button[1]`)
      .click({ timeout: 60000 });
  }

  /** Confirm group deletion. */
  async confirmGroupDeletion() {
    await this.page
      .locator(`//h6[normalize-space() = "Delete group"]/following::BUTTON[@type='button'][normalize-space() = "Yes, delete it"][1]`)
      .click({ timeout: 60000 });
  }

  /** Fill the group/flow name input. */
  async fillGroupName(name: string) {
    await this.page.locator(`INPUT[name='name'][type='string']`).fill(name, { timeout: 60000 });
  }

  // ─── App Settings / Member Management ────────────────────────────────────

  /** Click "Save" button (submit type). */
  async clickSave() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  /** Click "Remove" button (second occurrence – for member removal). */
  async clickRemoveMember() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove"]`).nth(1).click({ timeout: 60000 });
  }

  /** Assert "App Module Flow Group" label is visible. */
  async assertAppModuleFlowGroupVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "App Module Flow Group"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the close icon on a member chip. */
  async clickMemberCloseIcon() {
    await this.page.locator(`svg[data-testid="CloseOutlinedIcon"]`).click({ timeout: 60000 });
  }

  /** Type in the "Add members" combobox. */
  async typeMemberSearch(name: string) {
    await this.page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`).pressSequentially(name, { timeout: 60000 });
  }

  /** Assert member name label is visible (for Angel Ramirez). */
  async assertMemberAngelRamirezVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Angel Ramirez"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert member name label is visible (for Victor Villa). */
  async assertMemberVictorVillaVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Victor Villa"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── App Template Settings (Application? toggle) ──────────────────────────

  /** Click the App template span heading. */
  async clickAppTemplateSpan(name: string) {
    await this.page.locator(`//SPAN[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Assert "Application?" label is visible. */
  async assertApplicationLabelVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Application?"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the last cancel/close button on the settings panel. */
  async clickCloseSettings() {
    await this.page.locator(`(//div[@class="flex items-center justify-end gap-4"]//button)[last()]`).click({ timeout: 60000 });
  }

  /** Click the Application toggle switch (second checkbox/switch). */
  async clickApplicationToggle() {
    await this.page.locator(`INPUT[type='checkbox'][role='switch']`).nth(1).click({ timeout: 60000 });
  }

  // ─── App Instance Name field ──────────────────────────────────────────────

  /** Fill the app name text field. */
  async fillAppName(name: string) {
    await this.page.locator(`INPUT[name='name'][type='text']`).fill(name, { timeout: 60000 });
  }

  // ─── Flow Template search ─────────────────────────────────────────────────

  /** Type in the search input (placeholder "test", combobox) for instance filter. */
  async typeInFlowTemplateSearch(value: string) {
    await this.page.locator(`INPUT[placeholder='test'][type='text'][role='combobox']`).pressSequentially(value, { timeout: 60000 });
  }

  /** Select the 3rd item in a dropdown list (option index 2). */
  async selectThirdListOption() {
    await this.page.locator(`//li[@data-option-index="2"]`).click({ timeout: 60000 });
  }

  // ─── Instance column – Task Name table header ─────────────────────────────

  /** Assert "Task Name" column header is visible (first). */
  async assertTaskNameColumnVisible() {
    await expect(this.page.locator(`//th[normalize-space() = 'Task Name']`).nth(0)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Task Name" column header is visible (second occurrence). */
  async assertTaskNameSecondColumnVisible() {
    await expect(this.page.locator(`//th[normalize-space() = 'Task Name']`).nth(1)).toBeVisible({ timeout: 60000 });
  }

  // ─── App instance detail (form submitted) ────────────────────────────────

  /** Assert "Form submitted" label is visible. */
  async assertFormSubmittedVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Form submitted"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the chat link icon in the second table row. */
  async clickSecondChatIconLink() {
    await this.page
      .locator(`div.MuiDataGrid-cell.MuiDataGrid-cell--textCenter>a.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-mfslm7`)
      .nth(1)
      .click({ timeout: 60000 });
  }

  // ─── App name instance label (breadcrumb) ────────────────────────────────

  /** Assert "Muuk instance 1" span is visible. */
  async assertMuukInstance1Visible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "Muuk instance 1"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Muuk instance 2" span is visible. */
  async assertMuukInstance2Visible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "Muuk instance 2"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Table: Export column list ────────────────────────────────────────────

  /** Assert all expected column spans are visible after Export reset. */
  async assertExportColumnListVisible() {
    const columns = [
      'Detail panel toggle', 'Flow Instance Name', 'Progress', 'Chat',
      'Status', 'Alerts', 'Launched at', 'Concluded at', 'Current owners', 'Task completion',
    ];
    for (const col of columns) {
      await expect(this.page.locator(`//SPAN[normalize-space() = "${col}"]`)).toBeVisible({ timeout: 60000 });
    }
  }

  /** Assert Export button is visible. */
  async assertExportButtonVisible() {
    await expect(this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Export"]`)).toBeVisible({ timeout: 60000 });
  }
}
