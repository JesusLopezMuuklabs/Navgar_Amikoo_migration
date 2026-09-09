import { Page, expect } from '@playwright/test';

/**
 * TasksModulePage
 * Migrated from muuk-tests/Tasks_Module/PageDetails.ts
 *
 * Covers all screens in the Tasks Module:
 *   - Tasks list (All / Today / Upcoming / Someday / Assigned by others)
 *   - Task creation (New Task command bar)
 *   - Task card quick-action buttons (Today / Upcoming / Someday / Snooze / More)
 *   - Task drawer (Details tab, Description, Reassign, Due date, Tags, Project, Entity, Delete)
 *   - Column / filter toolbar (Filters, Columns, Hide)
 *   - Task Assigner project overlay
 */
export class TasksModulePage {
  constructor(private readonly page: Page) {}

  // ─── Navigation ────────────────────────────────────────────────────────────

  /** Click the Tasks item in the left sidebar */
  async clickTasksInSidebar() {
    await this.page.locator('//SPAN[contains(text(),"Tasks")]').first().click();
  }

  // ─── Tasks List ────────────────────────────────────────────────────────────

  /** Assert the Tasks sidebar link is visible */
  async assertTasksSidebarVisible() {
    await expect(this.page.locator('//SPAN[contains(text(),"Tasks")]').first()).toBeVisible({ timeout: 60000 });
  }

  /** Click the "All" quick filter */
  async clickAllFilter() {
    await this.page.locator('//SPAN[contains(text(),"All")]').click();
  }

  /** Click the "Assigned by others" quick filter link */
  async clickAssignedByOthersFilter() {
    await this.page.locator('//a[@href="/104/tasks?filter=me-to-others"]').click();
  }

  /** Assert the "No rows" empty grid message is visible */
  async assertNoRowsVisible() {
    await expect(this.page.locator('//div[contains(text(),"No rows")]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the pagination row count label is visible */
  async assertPaginationVisible() {
    await expect(this.page.locator('//p[contains(@class,"MuiTablePagination-displayedRows")]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the deadline column cell is visible */
  async assertDeadlineColumnVisible() {
    await expect(this.page.locator('//div[@data-field="deadline_at"][@role="gridcell"]').first()).toBeVisible({ timeout: 60000 });
  }

  // ─── Task Grid Cleanup (test setup helper) ─────────────────────────────────

  /**
   * Cleanup helper: if any "Task" rows exist in the grid, select-all and delete them.
   * Used as a precondition in tests that need a clean slate.
   */
  async deleteAllExistingTasks() {
    const taskLocator = this.page.locator('//div[@role="gridcell"][@data-field="legend"]/a/span[normalize-space() = "Task"]');
    let taskCount = 0;
    try {
      await taskLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      taskCount = await taskLocator.count();
    } catch {
      taskCount = 0;
    }
    if (taskCount > 0) {
      await this.page.click('//button[contains(text(), "Select Tasks")]');
      await this.page.click('//input[@name="select_all_rows"]');
      await this.page.click('//button[@id="more-menu"]');
      await this.page.click('//span[contains(text(), "Delete")]');
      await this.page.keyboard.press('Enter');
      for (let i = 0; i < 3; i++) await this.page.keyboard.press('Tab');
      await this.page.keyboard.press('Enter');
    }
  }

  // ─── Task Creation ─────────────────────────────────────────────────────────

  /** Click "New Task" button */
  async clickNewTask() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "New Task"]').click();
  }

  /** Fill in the new task name field */
  async fillNewTaskName(name: string) {
    await this.page.locator('INPUT[name=\'legend\'][placeholder=\'Create new task\'][type=\'text\']').fill(name);
  }

  /** Click the Create (submit) button */
  async clickCreate() {
    await this.page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "Create"]').click();
  }

  /** Assert a task row link with given name is visible in the grid */
  async assertTaskRowVisible(name: string = 'Task') {
    await expect(
      this.page.locator(`//div[@role="gridcell"][@data-field="legend"]/a/span[normalize-space() = "${name}"]`).first()
    ).toBeVisible({ timeout: 60000 });
  }

  /** Click on a task row by name to open its drawer */
  async clickTaskRow(name: string = 'Task') {
    await this.page.locator(`//div[@role="gridcell"][@data-field="legend"]/a/span[normalize-space() = "${name}"]`).first().click();
  }

  // ─── Task Card Quick-Action Buttons ────────────────────────────────────────

  /** Click the "Today" quick-action button on the task card */
  async clickTodayButton() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Today"]').click();
  }

  /** Click the "Upcoming" quick-action button on the task card */
  async clickUpcomingButton() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Upcoming"]').click();
  }

  /** Click the "Someday" quick-action button on the task card */
  async clickSomedayButton() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Someday"]').click();
  }

  /** Click the "More" button (following after Someday aria-label button) */
  async clickMoreButton() {
    await this.page.locator('//button[@aria-label=\'Someday\']/following-sibling::button').click();
  }

  /** Assert the "Task has been assigned to work on Today." toast is visible */
  async assertAssignedTodayToastVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Task has been assigned to work on Today."]').nth(2)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Task has been assigned to work on Upcoming." toast is visible */
  async assertAssignedUpcomingToastVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Task has been assigned to work on Upcoming."]').nth(2)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Task has been assigned to work on Someday." toast is visible */
  async assertAssignedSomedayToastVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Task has been assigned to work on Someday."]').nth(2)).toBeVisible({ timeout: 60000 });
  }

  // ─── Tab filters (sidebar) ─────────────────────────────────────────────────

  /** Assert the Today tab link is visible */
  async assertTodayTabVisible() {
    await expect(this.page.locator('//SPAN[normalize-space() = "Today"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Upcoming tab link is visible */
  async assertUpcomingTabVisible() {
    await expect(this.page.locator('//SPAN[normalize-space() = "Upcoming"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Someday tab link is visible */
  async assertSomedayTabVisible() {
    await expect(this.page.locator('//SPAN[normalize-space() = "Someday"]')).toBeVisible({ timeout: 60000 });
  }

  // ─── Task Drawer Actions ───────────────────────────────────────────────────

  /** Open task drawer via the actions column button (hover then click edit icon) */
  async clickOpenTaskDetails() {
    await this.page.locator('//div[@data-field=\'actions\']//button').first().click();
  }

  /** Click the Details tab inside the task drawer */
  async clickDetailsTab() {
    await this.page.locator('//BUTTON[@type=\'button\'][@role=\'tab\'][normalize-space() = "Details"]').click();
  }

  /** Assert the task name column header is visible in the drawer */
  async assertTaskNameColumnHeaderVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Task Name"]').nth(4)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Due Date column header is visible */
  async assertDueDateColumnHeaderVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Due Date"]').nth(4)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Owner column header is visible */
  async assertOwnerColumnHeaderVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Owner"]').nth(4)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Created by column header is visible */
  async assertCreatedByColumnHeaderVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Created by"]').nth(4)).toBeVisible({ timeout: 60000 });
  }

  /** Click the Reassign button in the drawer */
  async clickReassign() {
    await this.page.locator('//SPAN[normalize-space() = "Reassign"]').first().click();
  }

  /** Fill the Reassign search input */
  async fillReassignSearch(query: string) {
    await this.page.locator('//input[@placeholder="Search"]').first().fill(query);
  }

  /** Click the "Add date" link in drawer */
  async clickAddDate() {
    await this.page.locator('//SPAN[contains(text(),"Add date")]').click();
  }

  /** Click the MUI today-day picker button */
  async clickTodayDatePicker() {
    await this.page.locator('//button[contains(@class,"MuiPickersDay-today")]').click();
  }

  /** Click the day after today in the date picker */
  async clickNextDayDatePicker() {
    await this.page.locator('//button[contains(@class,"MuiPickersDay-today")]/following::button').first().click();
  }

  /** Click OK in the date picker */
  async clickDatePickerOk() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "OK"]').click();
  }

  /** Assert the "Tomorrow" chip is visible in the deadline cell */
  async assertTomorrowChipVisible() {
    await expect(this.page.locator('//SPAN[contains(text(),"Tomorrow")]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Set due date" in the drawer More menu */
  async clickSetDueDate() {
    await this.page.locator('//SPAN[normalize-space() = "Set due date"]').click();
  }

  /** Assert the date calendar widget is visible */
  async assertDateCalendarVisible() {
    await expect(this.page.locator('//div[contains(@class,"MuiDateCalendar-root")]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Snooze" in the drawer More menu */
  async clickSnooze() {
    await this.page.locator('//SPAN[normalize-space() = "Snooze"]').click();
  }

  /** Click "Assign to a project" in the drawer More menu */
  async clickAssignToProject() {
    await this.page.locator('//SPAN[normalize-space() = "Assign to a project"]').click();
  }

  /** Assert the project search input overlay is visible */
  async assertProjectSearchVisible() {
    await expect(this.page.locator('//input[@placeholder="Search a project"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Tags" in the drawer More menu */
  async clickTags() {
    await this.page.locator('//SPAN[normalize-space() = "Tags"]').click();
  }

  /** Assert tag item Tag#1 is visible in tag selector */
  async assertTag1Visible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Tag#1"]').nth(3)).toBeVisible({ timeout: 60000 });
  }

  /** Assert tag item Tag#2 is visible */
  async assertTag2Visible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Tag#2"]').nth(3)).toBeVisible({ timeout: 60000 });
  }

  /** Click "Assign to entity" in the drawer More menu */
  async clickAssignToEntity() {
    await this.page.locator('//SPAN[normalize-space() = "Assign to entity"]').click();
  }

  /** Assert the "Select Entity Type" overlay heading is visible */
  async assertSelectEntityTypeVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Select Entity Type"]').first()).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Select Entity Type overlay panel is visible */
  async assertEntityTypePanelVisible() {
    await expect(this.page.locator('//p[normalize-space() = "Select Entity Type"]//ancestor::div[contains(@class,"MuiPaper-root")]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Help from Navgar AI" in the drawer More menu */
  async clickHelpFromNavgarAI() {
    await this.page.locator('//SPAN[normalize-space() = "Help from Navgar AI"]').click();
  }

  /** Assert the @NavgarAI prompted message is visible in the chat */
  async assertNavgarAIChatMessageVisible() {
    await expect(this.page.locator('//SPAN[normalize-space() = "@NavgarAI"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Value" dropdown / detail subtitle row is visible */
  async assertValueDropdownRowVisible() {
    await expect(
      this.page.locator('//div[contains(@class,\'MuiTypography-root MuiTypography-subtitle1\')]//span[contains(@class,\'MuiBox-root\')]')
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Task Drawer — Description ─────────────────────────────────────────────

  /** Click the "+ Add description" link in the Details tab */
  async clickAddDescription() {
    await this.page.locator('//SPAN[normalize-space() = "+ Add description"]').click();
  }

  /** Click the description text area */
  async clickDescriptionEditor() {
    await this.page.locator('//p[@data-placeholder="+ Add description"]').click();
  }

  /** Click Save in the description editor */
  async clickSaveDescription() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Save"]').click();
  }

  /** Assert saved description text is visible */
  async assertDescriptionVisible(text: string = 'New description') {
    await expect(this.page.locator(`//P[normalize-space() = "${text}"]`).nth(1)).toBeVisible({ timeout: 60000 });
  }

  // ─── Task Drawer — Edit Name ────────────────────────────────────────────────

  /** Click the edit task name button (pencil icon) in the drawer */
  async clickEditTaskName() {
    await this.page.locator('//button[@aria-label="Edit task name"]').click();
  }

  /** Assert the edited task name span is visible */
  async assertEditedTaskNameVisible(name: string = 'Task_edited') {
    await expect(this.page.locator(`//SPAN[normalize-space() = "${name}"]`).nth(1)).toBeVisible({ timeout: 60000 });
  }

  /** Fill the task name inline edit input */
  async fillInlineTaskNameInput(name: string) {
    await this.page.locator('INPUT[type=\'text\']').nth(2).fill(name);
  }

  // ─── Task Drawer — Delete ──────────────────────────────────────────────────

  /** Click the "Delete" option in the drawer More menu */
  async clickDeleteInMoreMenu() {
    await this.page.locator('//li[normalize-space() = "Delete"]').click();
  }

  /** Assert "Delete Tasks" dialog heading is visible */
  async assertDeleteTasksDialogVisible() {
    await expect(this.page.locator('//h6[normalize-space() = "Delete Tasks"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Yes, delete this task" confirmation button */
  async clickConfirmDeleteTask() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Yes, delete this task"]').click();
  }

  // ─── Bulk Selection ────────────────────────────────────────────────────────

  /** Click "Select Tasks" button */
  async clickSelectTasks() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Select Tasks"]').click();
  }

  /** Click the "select all rows" master checkbox */
  async clickSelectAllCheckbox() {
    await this.page.locator('INPUT[name=\'select_all_rows\'][type=\'checkbox\']').click();
  }

  /** Click the Complete button in the bulk action bar */
  async clickCompleteButton() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Complete"]').click();
  }

  /** Click a row checkbox */
  async clickRowCheckbox() {
    await this.page.locator('INPUT[type=\'checkbox\']').first().click();
  }

  // ─── Filter / Column Toolbar ───────────────────────────────────────────────

  /** Click the "Columns" button to open column selector */
  async clickColumnsButton() {
    await this.page.locator('//button[contains(text(),"Columns")]').click();
  }

  /** Click the "Filters" button to open filter overlay */
  async clickFiltersButton() {
    await this.page.locator('//button[contains(text(),"Filters")]').click();
  }

  /** Click "Add filter" inside the filter overlay */
  async clickAddFilter() {
    await this.page.locator('//button[contains(text(),"Add filter")]').click();
  }

  /** Assert the filter overlay is visible */
  async assertFilterOverlayVisible() {
    await expect(this.page.locator('//button[contains(text(),"Add filter")]')).toBeVisible({ timeout: 60000 });
  }

  // ─── Task Assigner / Project overlay ──────────────────────────────────────

  /** Assert the Task Assigner heading is visible */
  async assertTaskAssignerVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Task Assigner"]').first()).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Production Environment project link is visible */
  async assertProductionEnvironmentProjectVisible() {
    await expect(this.page.locator('//P[normalize-space() = "MuukTest - Production Environment (All Company)"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click Members button in Task Assigner */
  async clickMembers() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Members"]').click();
  }

  /** Assert the Tanner Dawson member entry is visible */
  async assertTannerDawsonVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "Tanner Dawson"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click the Add button in Task Assigner overlay */
  async clickAdd() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Add"]').click();
  }

  /** Click the Remove button in Task Assigner overlay */
  async clickRemove() {
    await this.page.locator('//BUTTON[@type=\'button\'][normalize-space() = "Remove"]').click();
  }

  /** Assert participant avatar AR is visible */
  async assertARParticipantVisible() {
    await expect(this.page.locator('//DIV[normalize-space() = "AR"]').nth(31)).toBeVisible({ timeout: 60000 });
  }
}
