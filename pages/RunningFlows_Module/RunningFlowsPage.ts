import { Page, expect } from '@playwright/test';

/**
 * RunningFlowsPage
 * Page Object for the Running Flows module.
 * Migrated from: muuk-tests/RunningFlows_Module/PageDetails.ts
 *
 * Covers:
 *  - Login (snippet-based robust login reused in most tests)
 *  - Sidebar navigation to Running Flows
 *  - Running Flows list / table (columns, filters, sort, search)
 *  - Running Flow Group management (edit name, cancel flow, alerts)
 *  - Flow Templates sidebar navigation (used in group-management tests)
 *  - Flow Group creation / deletion (used in TC_A742xx group)
 *  - Flow Group member management (add, remove, change role)
 *  - Running Flow instance detail (tasks, chat, variables tabs)
 *  - Flow Template detail (breadcrumb navigation)
 */
export class RunningFlowsPage {
  constructor(private readonly page: Page) {}

  // ─── Login ────────────────────────────────────────────────────────────────

  /**
   * Robust login used by most Running Flows tests (snippet-based).
   * Handles a possible failed first attempt and validates sidebar items.
   */
  async login(email: string, password: string) {
    await this.page.locator("//a[@href='/users/sign_in']").click();
    await this.page.locator("//input[@id='user_email']").fill(email);
    await this.page.locator("//input[@id='user_password']").fill(password);
    await this.page.locator("//input[@type='submit'][@name='commit']").click();

    // Retry if login failed
    const invalidCredentials = this.page.locator(
      "//p[normalize-space(text())='Invalid email or password.']"
    );
    if (await invalidCredentials.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.page.locator("//input[@id='user_email']").fill(email);
      await this.page.locator("//input[@id='user_password']").fill(password);
      await this.page.locator("//input[@type='submit'][@name='commit']").click();
    }

    // Validate successful login
    await expect(this.page.locator("//span[normalize-space(text())='Applications']")).toBeVisible();
    await expect(this.page.locator("//span[normalize-space(text())='Messages']")).toBeVisible();
    await expect(this.page.locator("//span[normalize-space(text())='Tasks']")).toBeVisible();
    await expect(this.page.locator("//span[normalize-space(text())='Flow Templates']")).toBeVisible();
    await expect(this.page.locator("//span[normalize-space(text())='Entities']")).toBeVisible();
  }

  /**
   * Legacy step-by-step login used by some older TC_A742xx group tests.
   * Clicks "Log In" link, fills email + password, submits.
   */
  async loginLegacy(email: string, password: string) {
    await this.page.locator('//a[contains(text(),"Log In")]').click({ timeout: 60000 });
    await this.page.locator(`INPUT[placeholder='you@example.com'][type='email'][name='user[email]'][id='user_email']`).fill(email, { timeout: 60000 });
    await this.page.locator(`INPUT[placeholder='password'][type='password'][name='user[password]'][id='user_password']`).fill(password, { timeout: 60000 });
    await this.page.locator(`INPUT[type='submit'][name='commit']`).click({ timeout: 60000 });
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  /** Navigate to the Running Flows module via sidebar. */
  async navigateToRunningFlows() {
    await this.page.locator('//SPAN[normalize-space() = "Running Flows"]').click({ timeout: 60000 });
  }

  /** Navigate to Flow Templates via sidebar (used in group-management tests). */
  async navigateToFlowTemplates() {
    await this.page.locator('//span[contains(text(), "Flow Templates")]').click({ timeout: 60000 });
  }

  /** Hover over the Running Flows page header (assert landing). */
  async hoverRunningFlowsHeader() {
    await this.page.locator(`//h6[normalize-space() = 'Running Flows']`).hover({ timeout: 60000 });
  }

  /** Assert the Running Flows page header is visible. */
  async assertRunningFlowsHeaderVisible() {
    await expect(this.page.locator(`//h6[normalize-space() = 'Running Flows']`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Running Flow Group (sidebar list) ────────────────────────────────────

  /** Click a Running Flow Group in the sidebar by name. */
  async clickRunningFlowGroup(name: string) {
    await this.page.locator(`//DIV[@role='button'][normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Click the edit (pencil) button for a specific Running Flow Group. */
  async clickRunningFlowGroupEditButton(groupName: string) {
    await this.page.locator(
      `//p[contains(text(), "${groupName}")]/ancestor::div[contains(@class,"MuiButtonBase-root")][@role="button"]//button[not(@disabled)][not(@aria-label)]`
    ).click({ timeout: 60000 });
  }

  /** Click the "Edit group" header inside the edit panel. */
  async clickEditGroupHeader() {
    await this.page.locator(`//H6[normalize-space() = 'Edit group']`).click({ timeout: 60000 });
  }

  /** Fill the group name input inside the edit panel. */
  async fillGroupName(name: string) {
    await this.page.locator(`INPUT[name='name'][type='string']`).fill(name, { timeout: 60000 });
  }

  /** Save the group name form (Save button inside edit panel). */
  async saveGroupName() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  /** Close the edit group panel (X button). */
  async closeEditGroupPanel() {
    await this.page.locator(`//h6[normalize-space()="Edit group"]/parent::div/following-sibling::button`).click({ timeout: 60000 });
  }

  /** Assert the "Group updated successfully" toast is visible. */
  async assertGroupUpdatedSuccessfully() {
    await expect(
      this.page.locator(`//DIV[normalize-space() = "Group updated successfully"]`).nth(2)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert the updated group name is visible in the sidebar. */
  async assertUpdatedGroupNameVisible(name: string) {
    await expect(this.page.locator(`//P[normalize-space() = "${name}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the updated group name is NOT visible in the sidebar. */
  async assertUpdatedGroupNameNotVisible(name: string) {
    await expect(this.page.locator(`//P[normalize-space() = "${name}"]`)).not.toBeVisible({ timeout: 60000 });
  }

  // ─── Cancel Flow ──────────────────────────────────────────────────────────

  /** Click "Cancel flow" button inside the Running Flows page. */
  async clickCancelFlow() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Cancel flow"]`).click({ timeout: 60000 });
  }

  /** Assert the "Are you sure you want to stop" confirmation heading is visible. */
  async assertCancelConfirmationVisible() {
    await expect(
      this.page.locator(`//h6[contains(text(), 'Are you sure you want to stop')]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Flow Alerts ──────────────────────────────────────────────────────────

  /** Click the flow alerts button (top-right area). */
  async clickFlowAlertsButton() {
    await this.page.locator(
      `//h6[contains(text(), 'Running Flows')]/ancestor::div[contains(@class,'MuiBox-root')][1]/following-sibling::div//button`
    ).click({ timeout: 60000 });
  }

  /** Assert the "Flow alerts" panel heading is visible. */
  async assertFlowAlertsPanelVisible() {
    await expect(this.page.locator(`//h6[normalize-space() = 'Flow alerts']`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "1–1 of 1" pagination is visible. */
  async assertPaginationOneOfOne() {
    await expect(this.page.locator(`//P[normalize-space() = "1–1 of 1"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Running Flows Table / Data Grid ──────────────────────────────────────

  /** Assert the "Running" status chip is visible (status filter). */
  async assertRunningStatusVisible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "Running"]`).nth(1)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Running+1" button (overdue filter chip) is visible. */
  async assertOverdueFilterVisible() {
    await expect(this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Running+1"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the "Due Date" button to open date picker. */
  async clickDueDateButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Due Date"]`).click({ timeout: 60000 });
  }

  /** Click the first month calendar (MuiDayCalendar). */
  async clickFirstMonthCalendar() {
    await this.page.locator(`//div[contains(@class, "MuiDayCalendar-root")]`).first().click({ timeout: 60000 });
  }

  /** Click the second month calendar (MuiDayCalendar). */
  async clickSecondMonthCalendar() {
    await this.page.locator(`//div[contains(@class, "MuiDayCalendar-root")]`).nth(1).click({ timeout: 60000 });
  }

  /** Click "Flow Templates" filter button (inside Running Flows toolbar). */
  async clickFlowTemplatesFilterButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Flow Templates"]`).click({ timeout: 60000 });
  }

  /** Assert the flow template filter panel is visible. */
  async assertFlowTemplatesFilterPanelVisible() {
    await expect(
      this.page.locator(`//div[contains(@class, "MuiPaper-root MuiPaper-elevation MuiPaper-rounded")]`).nth(1)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Click the "Columns" button to open column management. */
  async clickColumnsButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Columns"]`).click({ timeout: 60000 });
  }

  /** Click the "Manage columns" button. */
  async clickManageColumnsButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Manage columns"]`).click({ timeout: 60000 });
  }

  /** Assert column management panel is visible. */
  async assertColumnManagementPanelVisible() {
    await expect(this.page.locator(`//div[contains(@class, 'MuiDataGrid-panelWrapper')]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click "Show/Hide All" toggle in column management. */
  async clickShowHideAll() {
    await this.page.locator(`//SPAN[normalize-space() = "Show/Hide All"]`).click({ timeout: 60000 });
  }

  /** Click "Reset" inside column management panel. */
  async clickColumnsReset() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Reset"]`).click({ timeout: 60000 });
  }

  /** Click "1 Hidden columns" button. */
  async clickHiddenColumnsButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`).click({ timeout: 60000 });
  }

  /** Click "11 Hidden columns" button. */
  async clickElevenHiddenColumnsButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "11 Hidden columns"]`).click({ timeout: 60000 });
  }

  /** Click a column header by column name (presentation div). */
  async clickColumnHeader(columnName: string, index = 1) {
    await this.page.locator(`//DIV[@role='presentation'][normalize-space() = "${columnName}"]`).nth(index).click({ timeout: 60000 });
  }

  /** Click the column menu button for a specific column. */
  async clickColumnMenuButton(ariaLabel: string) {
    await this.page.locator(`//button[@aria-label="${ariaLabel} column menu"]`).click({ timeout: 60000 });
  }

  /** Click the "Halt" column menu button (dynamic open state). */
  async clickHaltColumnMenu() {
    await this.page.locator(`//button[@aria-label=" column menu"]`).click({ timeout: 60000 });
  }

  /** Hover the currently active (open) column header. */
  async hoverActiveColumnHeader() {
    await this.page.locator(
      `//div[contains(@class, "MuiDataGrid-menuIcon") and contains(@class, "MuiDataGrid-menuOpen")]/parent::div[@role="presentation"]`
    ).hover({ timeout: 60000 });
  }

  /** Assert the currently active (open) column header is NOT visible. */
  async assertActiveColumnHeaderNotVisible() {
    await expect(
      this.page.locator(
        `//div[contains(@class, "MuiDataGrid-menuIcon") and contains(@class, "MuiDataGrid-menuOpen")]/parent::div[@role="presentation"]`
      )
    ).not.toBeVisible({ timeout: 60000 });
  }

  /** Click "Hide column" in the column context menu. */
  async clickHideColumn() {
    await this.page.locator(`//SPAN[normalize-space() = "Hide column"]`).click({ timeout: 60000 });
  }

  /** Click "Pin to" in the column context menu (first "Pin to" item). */
  async clickPinToMenuItem() {
    await this.page.locator(`//li[@role="menuitem"][contains(., 'Pin to')]`).click({ timeout: 60000 });
  }

  /** Click "Pin to left" submenu item. */
  async clickPinToLeft() {
    await this.page.locator(`//SPAN[normalize-space() = "Pin to left"]`).click({ timeout: 60000 });
  }

  /** Click "Manage columns" link in the column context menu. */
  async clickManageColumnsLink() {
    await this.page.locator(`//SPAN[normalize-space() = "Manage columns"]`).click({ timeout: 60000 });
  }

  /** Click "Sort" button in the column context menu. */
  async clickSortButton() {
    await this.page.locator(`//button[@aria-label="Sort"]`).click({ timeout: 60000 });
  }

  /** Assert a column toggle checkbox is visible by name (column management panel). */
  async assertColumnToggleVisible(columnName: string) {
    await expect(this.page.locator(`//SPAN[normalize-space() = "${columnName}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Scroll the data grid horizontally. */
  async scrollGridHorizontally(deltaX: number) {
    const grid = this.page.locator('.MuiDataGrid-virtualScroller');
    await grid.hover();
    await this.page.mouse.wheel(deltaX, 0);
  }

  // ─── Search / Filter Row ──────────────────────────────────────────────────

  /** Fill the search box. */
  async fillSearch(query: string) {
    await this.page.locator(`INPUT[placeholder='Search'][type='search']`).fill(query, { timeout: 60000 });
  }

  // ─── Running Flow Instance (table row) ───────────────────────────────────

  /** Click the TestRunningFlowTemplate link in the table. */
  async clickTestRunningFlowTemplateLink() {
    await this.page.locator(`//A[normalize-space() = "TestRunningFlowTemplate"]`).click({ timeout: 60000 });
  }

  /** Assert the "TestRunningFlowTemplate" grid cell is visible. */
  async assertTestRunningFlowTemplateCellVisible() {
    await expect(
      this.page.locator(`//DIV[@role='gridcell'][normalize-space() = "TestRunningFlowTemplate"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert "0/1 Completed" task completion cell is visible. */
  async assertTaskCompletionCellVisible() {
    await expect(
      this.page.locator(`//DIV[normalize-space() = "0/1 Completed"]`).nth(1)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Flow Instance Name" column header is visible in grid. */
  async assertFlowInstanceNameColumnVisible() {
    await expect(
      this.page.locator(`//DIV[normalize-space() = "Flow Instance Name"]`).nth(4)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Running Flow Instance Detail ─────────────────────────────────────────

  /** Click the Tasks tab in the flow instance detail. */
  async clickTasksTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Tasks"]`).click({ timeout: 60000 });
  }

  /** Click the Chat tab in the flow instance detail. */
  async clickChatTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Chat"]`).click({ timeout: 60000 });
  }

  /** Click the Variables tab in the flow instance detail. */
  async clickVariablesTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Variables"]`).click({ timeout: 60000 });
  }

  /** Click the options button in the chat panel (last button after "Unread" div). */
  async clickChatOptionsButton() {
    await this.page.locator(`//div[@aria-label="Unread"]/following-sibling::button[last()]`).click({ timeout: 60000 });
  }

  /** Click "Manage participants" in the chat options menu. */
  async clickManageParticipants() {
    await this.page.locator(`//SPAN[normalize-space() = "Manage participants"]`).click({ timeout: 60000 });
  }

  /** Assert "Task participants" overlay heading is visible. */
  async assertTaskParticipantsVisible() {
    await expect(this.page.locator(`//h6[normalize-space() = 'Task participants']`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "First Task" task item is visible in the Tasks tab. */
  async assertFirstTaskVisible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "First Task"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Flow Instance Name *" variable label visible. */
  async assertFlowInstanceNameVariableVisible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "Flow Instance Name *"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Flow Instance Name *Required" variable row is visible. */
  async assertFlowInstanceNameRequiredVisible() {
    await expect(
      this.page.locator(`//DIV[normalize-space() = "Flow Instance Name *Required"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Click the "Copy information" button for a variable. */
  async clickCopyInformation() {
    await this.page.locator(`//button[@aria-label="Copy information"]`).click({ timeout: 60000 });
  }

  /** Click the edit flow instance name button. */
  async clickEditFlowInstanceName() {
    await this.page.locator(`//button[@aria-label="Edit flow instance name"]`).click({ timeout: 60000 });
  }

  /** Assert progress percentage "0%" is visible. */
  async assertProgressZeroPercent() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "0%"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the close panel icon button at the top of the detail pane (nth=3). */
  async clickClosePanelButton() {
    await this.page.locator(
      `//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-mfslm7"]`
    ).nth(3).click({ timeout: 60000 });
  }

  // ─── Flow Template breadcrumb navigation ─────────────────────────────────

  /** Click "_Running Flow Template" link (e.g., from Running Flows list). */
  async clickRunningFlowTemplateBreadcrumb() {
    await this.page.locator(`//A[normalize-space() = "_Running Flow Template"]`).click({ timeout: 60000 });
  }

  /** Assert "_Running Flow Template" span is visible (in flow template list). */
  async assertRunningFlowTemplateSpanVisible() {
    await expect(this.page.locator(`//SPAN[normalize-space() = "_Running Flow Template"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "TestRunningFlowTemplate" span visible (breadcrumb / header). */
  async assertTestRunningFlowTemplateSpanVisible(index = 0) {
    await expect(this.page.locator(`//SPAN[normalize-space() = "TestRunningFlowTemplate"]`).nth(index)).toBeVisible({ timeout: 60000 });
  }

  /** Click "TestRunningFlowTemplate" span (breadcrumb / link). */
  async clickTestRunningFlowTemplateSpan(index = 0) {
    await this.page.locator(`//SPAN[normalize-space() = "TestRunningFlowTemplate"]`).nth(index).click({ timeout: 60000 });
  }

  /** Assert "TestRunningFlowTemplate" link visible in template list. */
  async assertTestRunningFlowTemplateLinkVisible() {
    await expect(this.page.locator(`//A[normalize-space() = "TestRunningFlowTemplate"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click "_Running Flow Template" link from the flow template listing. */
  async clickRunningFlowTemplateLink() {
    await this.page.locator(`//A[normalize-space() = "_Running Flow Template"]`).click({ timeout: 60000 });
  }

  /** Assert "Flow template name" column header is visible. */
  async assertFlowTemplateNameColumnVisible() {
    await expect(
      this.page.locator(`//DIV[@role='presentation'][normalize-space() = "Flow template name"]`).nth(1)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert "_Running Flow Group" appears in Template group column. */
  async assertRunningFlowGroupTemplateGroupVisible() {
    await expect(
      this.page.locator(`//div[@role='gridcell'][contains(., '_Running Flow Group')]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Flow Group Management (from Flow Templates sidebar) ──────────────────
  // Used in TC_A742xx group (group creation/membership/deletion from Flow Templates)

  /** Click "+ New Flow Group" button. */
  async clickNewFlowGroup() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "+ New Flow Group"]`).click({ timeout: 60000 });
  }

  /** Click the delete icon for a flow group (second icon button in items bar). */
  async clickGroupDeleteIcon() {
    await this.page.locator(
      `//div[contains(@class,'flex items-center')]//div[contains(@class,'relative')][2]/button[1]`
    ).click({ timeout: 60000 });
  }

  /** Confirm group deletion ("Yes, delete it"). */
  async confirmGroupDeletion() {
    await this.page.locator(
      `//h6[normalize-space() = "Delete group"]/following::BUTTON[@type='button'][normalize-space() = "Yes, delete it"][1]`
    ).click({ timeout: 60000 });
  }

  /** Assert "Private" label visible on new group. */
  async assertPrivateLabelVisible() {
    await expect(this.page.locator(`//P[contains(text(),"Private")]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the hover edit (pencil) button for the highlighted group row. */
  async clickGroupHoverEditButton() {
    await this.page.locator(
      `//div[contains(@class,'flex w-full justify-between')]//div[contains(@class,'flex items-center')]//button[1]`
    ).click({ timeout: 60000 });
  }

  // ─── Group Members ────────────────────────────────────────────────────────

  /** Click "Save" to save the group (member wizard step). */
  async clickSaveGroup() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  /** Hover "Angel Ramirez" in the member list. */
  async hoverAngelRamirez() {
    await this.page.locator(`//P[normalize-space() = "Angel Ramirez"]`).hover({ timeout: 60000 });
  }

  /** Click the "Add members" combobox. */
  async clickAddMembersInput() {
    await this.page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`).click({ timeout: 60000 });
  }

  /** Click "Victor Villa" in the member suggestions dropdown. */
  async clickVictorVilla() {
    await this.page.locator(`//P[normalize-space() = "Victor Villa"]`).click({ timeout: 60000 });
  }

  /** Click the close icon (X) on Victor Villa's member chip. */
  async clickVictorVillaChipClose() {
    await this.page.locator(`svg[data-testid="CloseOutlinedIcon"]`).click({ timeout: 60000 });
  }

  /** Assert "Shared" label visible. */
  async assertSharedLabelVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Shared"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click the shared icon toggle (preceding sibling of "Shared" paragraph, nth 3). */
  async clickSharedIconToggle() {
    await this.page.locator(`//p[contains(text(), "Shared")]/parent::div/following-sibling::div/span`).click({ timeout: 60000 });
  }

  /** Click "Next" button in wizard. */
  async clickNext() {
    await this.page.locator(`//BUTTON[normalize-space() = "Next"]`).click({ timeout: 60000 });
  }

  /** Click "Next" submit button. */
  async clickNextSubmit() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Next"]`).click({ timeout: 60000 });
  }

  /** Click "Done" button. */
  async clickDone() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).click({ timeout: 60000 });
  }

  /** Click second "Done" submit button (confirmation step). */
  async clickDoneConfirm() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).click({ timeout: 60000 });
  }

  /** Click "Add" button. */
  async clickAdd() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Add"]`).click({ timeout: 60000 });
  }

  /** Click "Remove" button (second one, for Victor Villa). */
  async clickRemoveMember() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove"]`).nth(1).click({ timeout: 60000 });
  }

  /** Click "Remove" button for a member (Launcher role removal). */
  async clickRemoveMemberLauncher() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove"]`).click({ timeout: 60000 });
  }

  /** Click "Make group editor" option in the dropdown for Victor Villa. */
  async clickMakeGroupEditor() {
    await this.page.locator(`//P[normalize-space() = "Make group editor"]`).click({ timeout: 60000 });
  }

  /** Click "Editor" button for Victor Villa (to hover its role badge). */
  async hoverEditorBadge() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Editor"]`).hover({ timeout: 60000 });
  }

  /** Assert Victor Villa's "Admin" role badge visible. */
  async assertVictorVillaAdminVisible() {
    await expect(
      this.page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Admin")]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert Victor Villa's "Launcher" role badge visible. */
  async assertVictorVillaLauncherVisible() {
    await expect(
      this.page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Launcher")]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert Victor Villa's "Launcher" role badge NOT visible. */
  async assertVictorVillaLauncherNotVisible() {
    await expect(
      this.page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Launcher")]`)
    ).not.toBeVisible({ timeout: 60000 });
  }

  /** Assert "Admin" label is visible. */
  async assertAdminLabelVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Admin"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "VV" avatar div visible (Victor Villa). */
  async assertVictorVillaAvatarVisible() {
    await expect(this.page.locator(`//div[normalize-space(.) = 'VV']`)).toBeVisible({ timeout: 60000 });
  }

  /** Click "Launcher" button for Victor Villa. */
  async clickLauncherButton() {
    await this.page.locator(
      `//p[contains(text(), "Victor Villa")]/ancestor::div/descendant::button[contains(text(), "Launcher")]`
    ).click({ timeout: 60000 });
  }

  /** Click "Editor" button for Victor Villa (from member list). */
  async clickEditorButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Editor"]`).click({ timeout: 60000 });
  }

  /** Hover the "Editor" button for Victor Villa (second open edit context). */
  async hoverEditorButtonOnReopen() {
    await this.page.locator(
      `//p[contains(text(), "Victor Villa")]/ancestor::div/descendant::button[contains(text(), "Editor")]`
    ).hover({ timeout: 60000 });
  }

  /** Fill the "Add a new member" combobox. */
  async fillAddNewMemberInput(name: string) {
    await this.page.locator(`INPUT[placeholder='Add a new member here'][type='text'][role='combobox']`).pressSequentially(name, { timeout: 60000 });
  }

  // ─── Search (group list) ──────────────────────────────────────────────────

  /**
   * Search for a group in the template groups list, hover the first match.
   * Used by the snippet-based search-and-hover pattern in several tests.
   */
  async searchAndHoverGroup(randNum: string) {
    const searchInput = this.page.locator('input[placeholder="Search"]');
    await searchInput.fill(`Test${randNum}`);
    await this.page.waitForTimeout(300);

    const container = this.page.locator('#template-groups-desktop-list');
    await expect(
      container.locator(`p.MuiTypography-body1:text-is("Test${randNum}")`)
    ).toHaveCount(1, { timeout: 10_000 });

    const row = container.locator(`(//div[@class="flex w-full overflow-hidden gap-2"])[4]`);
    await row.scrollIntoViewIfNeeded();
    await row.hover();
  }

  /** Hover the shared icon (PeopleAltOutlinedIcon, nth 3). */
  async hoverSharedIcon() {
    await this.page.locator(`//p[contains(@class,'MuiTypography-root')]/preceding-sibling::*`).nth(3).hover({ timeout: 60000 });
  }
}
