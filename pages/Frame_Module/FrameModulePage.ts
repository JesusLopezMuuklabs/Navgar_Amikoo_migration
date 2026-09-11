import { Page, expect } from '@playwright/test';

/**
 * FrameModulePage
 *
 * Consolidated page object for the Frame Module tests.
 * Migrated from muuk-tests/Frame_Module/PageDetails.ts.
 * Covers: navigation sidebar, search/command bar, reminders drawer,
 *         user profile menu, and top-level page verifications.
 */
export class FrameModulePage {
  constructor(readonly page: Page) {}

  // ─── Login page ──────────────────────────────────────────────────────────

  /** Click the "Log In" link on the landing page, fill credentials and submit. */
  async login(email: string, password: string): Promise<void> {
    await this.page.locator("//a[@href='/users/sign_in']").click({ timeout: 60000 });
    await this.page.locator("//input[@id='user_email']").fill(email);
    await this.page.locator("//input[@id='user_password']").fill(password);
    await this.page.locator("//input[@type='submit'][@name='commit']").click({ timeout: 60000 });
  }

  /** Verify that the dashboard loaded after login (checks 5 nav items). */
  async verifyDashboardLoaded(): Promise<void> {
    await expect(this.page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 30000 });
    await expect(this.page.locator("//span[normalize-space(text())='Messages']")).toBeVisible({ timeout: 30000 });
    await expect(this.page.locator("//span[normalize-space(text())='Tasks']")).toBeVisible({ timeout: 30000 });
    await expect(this.page.locator("//span[normalize-space(text())='Flow Templates']")).toBeVisible({ timeout: 30000 });
    await expect(this.page.locator("//span[normalize-space(text())='Entities']")).toBeVisible({ timeout: 30000 });
  }

  /**
   * Full login flow with retry on invalid credentials.
   * Used by every test in the Frame Module.
   */
  async loginWithRetry(baseUrl: string, email: string, password: string): Promise<void> {
    await this.page.goto(baseUrl, { timeout: 20000 });
    await this.login(email, password);

    // Retry once if credentials were rejected
    const invalidMsg = this.page.locator("//p[normalize-space(text())='Invalid email or password.']");
    if (await invalidMsg.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.login(email, password);
    }

    await this.verifyDashboardLoaded();
  }

  // ─── Main sidebar navigation ─────────────────────────────────────────────

  async navigateToMessages(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Messages')]").click({ timeout: 60000 });
  }

  async navigateToTasks(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Tasks')]").nth(0).click({ timeout: 60000 });
  }

  async navigateToFlowTemplates(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Flow Templates')]").click({ timeout: 60000 });
  }

  async navigateToRunningFlows(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Running Flows')]").click({ timeout: 60000 });
  }

  async navigateToProjects(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Projects')]").nth(0).click({ timeout: 60000 });
  }

  async navigateToEntities(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Entities')]").click({ timeout: 60000 });
  }

  async navigateToHelp(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Help')]").click({ timeout: 60000 });
  }

  async navigateToAccounts(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Accounts')]").nth(0).click({ timeout: 60000 });
  }

  // ─── Page assertions ──────────────────────────────────────────────────────

  async verifyAllMessagesHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'All Messages')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyInboxHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Inbox')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyFlowTemplatesHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Flow Templates')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyRunningFlowsHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Running Flows')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyEntitiesHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Entit')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyEditProfileHeader(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Edit Profile')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyUpdatePasswordHeader(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Update Password')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyBillingHeader(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Billing')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyAccountsHeader(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Accounts')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyConnectedAccountsHeader(): Promise<void> {
    await expect(this.page.locator("//H2[contains(text(),'Connected Accounts')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyWelcomeToNavgar(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Welcome to Navgar')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyTermsOfServiceHeader(): Promise<void> {
    await expect(this.page.locator("//H2[contains(text(),'Terms of Service')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyPrivacyPolicyHeader(): Promise<void> {
    await expect(this.page.locator("//H1[contains(text(),'Privacy Policy')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyHelpCenterHeader(): Promise<void> {
    await expect(
      this.page.locator("//H1[normalize-space() = 'Advice and answers from the Navgar Team']")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyHelpSiteLoaded(): Promise<void> {
    await expect(this.page.locator("//div[@class='header__logo']")).toBeVisible({ timeout: 30000 });
  }

  // ─── Profile menu ─────────────────────────────────────────────────────────

  async openProfileMenu(): Promise<void> {
    await this.page.locator("//div[@aria-label='Profile Menu']").click({ timeout: 60000 });
  }

  async clickProfileMenuItem(text: string): Promise<void> {
    await this.page.locator(`//A[contains(text(),'${text}')]`).click({ timeout: 60000 });
  }

  async clickSignOut(): Promise<void> {
    await this.page.locator("//BUTTON[@type='submit'][contains(text(),'Sign Out')]").click({ timeout: 60000 });
  }

  async hoverProfileMenu(): Promise<void> {
    await this.page.locator("//div[@aria-label='Profile Menu']").hover({ timeout: 60000 });
  }

  // ─── Accounts sub-navigation ─────────────────────────────────────────────

  async selectAccount(name: string): Promise<void> {
    await this.page.locator(`//SPAN[contains(text(),'${name}')]`).click({ timeout: 60000 });
  }

  // ─── Search / Command bar (Alt+K hotkey) ─────────────────────────────────

  async openSearchWithHotkey(): Promise<void> {
    await this.page.keyboard.down('Alt');
    await this.page.keyboard.press('K');
    await this.page.keyboard.up('Alt');
  }

  async typeInSearch(text: string): Promise<void> {
    await this.page.keyboard.type(text);
  }

  async clearSearch(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Clear']").first().click({ timeout: 60000 });
  }

  async clickShowAll(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Show all']").first().click({ timeout: 60000 });
  }

  async clickShowAllBySection(section: 'tasks' | 'groups'): Promise<void> {
    if (section === 'tasks') {
      await this.page.locator("//div[p[normalize-space()='Tasks']]//button[contains(., 'Show all')]").click({ timeout: 60000 });
    } else {
      await this.page.locator("//div[p[normalize-space()='Groups']]//button[contains(., 'Show all')]").click({ timeout: 60000 });
    }
  }

  async verifySearchResultsVisible(): Promise<void> {
    await expect(
      this.page.locator("//div[@class='flex flex-col h-full gap-4']")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifySearchResultsNotVisible(): Promise<void> {
    await expect(
      this.page.locator("//div[@class='flex flex-col h-full gap-4']")
    ).not.toBeVisible({ timeout: 30000 });
  }

  async verifyShowAllButtonVisible(): Promise<void> {
    await expect(
      this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Show all']").first()
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyShowAllButtonNotVisible(): Promise<void> {
    await expect(
      this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Show all']").first()
    ).not.toBeVisible({ timeout: 30000 });
  }

  async verifyExpandedTasksViewVisible(): Promise<void> {
    await expect(
      this.page.locator("//div[@class='relative h-full overflow-auto']")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifySearchSectionHeaderVisible(section: string): Promise<void> {
    await expect(
      this.page.locator(`//DIV[normalize-space() = 'TasksShow all']`)
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyTasksShowAllVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Tasks']]//button[contains(., 'Show all')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyRunningFlowsShowAllNotVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Running flows']]//button[contains(., 'Show all')]")).not.toBeVisible({ timeout: 30000 });
  }

  async verifyGroupsShowAllNotVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Groups']]//button[contains(., 'Show all')]")).not.toBeVisible({ timeout: 30000 });
  }

  async verifyRunningFlowsShowAllVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Running flows']]//button[contains(., 'Show all')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyGroupsShowAllVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Groups']]//button[contains(., 'Show all')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyTasksShowAllNotVisible(): Promise<void> {
    await expect(this.page.locator("//div[p[normalize-space()='Tasks']]//button[contains(., 'Show all')]")).not.toBeVisible({ timeout: 30000 });
  }

  // ─── Command bar filter buttons (in expanded search) ─────────────────────

  async clickFilterButton(label: string): Promise<void> {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = '${label}']`).click({ timeout: 60000 });
  }

  async clickProjectTasksFilter(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Project tasks')]").click({ timeout: 60000 });
  }

  async verifyProjectTaskResultVisible(): Promise<void> {
    await expect(this.page.locator("//B[contains(text(),'Task')]")).toBeVisible({ timeout: 30000 });
  }

  // ─── Main command bar (task / flow template creation) ────────────────────

  async fillCommandBarInput(value: string): Promise<void> {
    await this.page.locator("INPUT[id='command-bar-input'][name='legend'][type='text']").fill(value, { timeout: 60000 });
  }

  async fillCommandBarFlowNameInput(value: string): Promise<void> {
    await this.page.locator("INPUT[name='name'][type='text']").fill(value, { timeout: 60000 });
  }

  async clickCommandBarAdd(): Promise<void> {
    await this.page.locator("//BUTTON[@type='submit'][normalize-space() = 'Add']").click({ timeout: 60000 });
  }

  async clickCommandBarSave(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][contains(text(),'Save')]").click({ timeout: 60000 });
  }

  async pressEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }

  // ─── Tasks module specifics ───────────────────────────────────────────────

  async clickToOthersFilter(): Promise<void> {
    await this.page.locator("//a[@href='/104/tasks?filter=me-to-others']").click({ timeout: 60000 });
  }

  async verifyTaskVisible(): Promise<void> {
    await expect(this.page.locator("//P[contains(text(),'Task')]")).toBeVisible({ timeout: 30000 });
  }

  async checkFirstTaskCheckbox(): Promise<void> {
    await this.page.locator("//INPUT[@type='checkbox']").first().click({ timeout: 60000 });
  }

  async verifyNoRowsVisible(): Promise<void> {
    await expect(this.page.locator("//div[contains(text(),'No rows')]")).toBeVisible({ timeout: 30000 });
  }

  async verifyTaskCompletedSuccessfully(): Promise<void> {
    await expect(
      this.page.locator("//DIV[contains(text(),'Task completed successfully')]")
    ).toBeVisible({ timeout: 30000 });
  }

  async fillProjectTaskInput(value: string): Promise<void> {
    await this.page.locator("INPUT[id='project-command-bar'][name='legend'][placeholder='+ Add Task'][type='text']").fill(value, { timeout: 60000 });
  }

  async verifyProjectTaskCreated(): Promise<void> {
    await expect(
      this.page.locator("//div[@data-field='legend']/descendant::div[normalize-space() = 'Task']")
    ).toBeVisible({ timeout: 30000 });
  }

  async clickTasksTabInProject(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][@role='tab'][normalize-space() = 'Tasks']").click({ timeout: 60000 });
  }

  // ─── Flow Templates module ────────────────────────────────────────────────

  async verifyFlowSettingsVisible(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Flow Settings')]")).toBeVisible({ timeout: 30000 });
  }

  async fillFlowDescription(desc: string): Promise<void> {
    await this.page.locator("TEXTAREA[name='description']").fill(desc, { timeout: 60000 });
  }

  async clickAddMembersInput(): Promise<void> {
    await this.page.locator("input[placeholder='Add members']").click({ timeout: 60000 });
  }

  async selectFlowMember(name: string): Promise<void> {
    await this.page.locator(`//P[contains(text(),'${name}')]`).click({ timeout: 60000 });
  }

  async fillFlowLegend(value: string): Promise<void> {
    await this.page.locator("INPUT[name='legend'][type='text']").fill(value, { timeout: 60000 });
  }

  async clickFlowOwnerAssign(): Promise<void> {
    await this.page.locator("//button[.//*[@aria-label='Owner: unassigned']]").click({ timeout: 60000 });
  }

  async selectFlowOwner(displayName: string): Promise<void> {
    await this.page.locator(`(//DIV[normalize-space() = '${displayName}'])[1]`).click({ timeout: 60000 });
  }

  async clickDoneButton(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Done']").click({ timeout: 60000 });
  }

  async openFlowSortDropdown(): Promise<void> {
    await this.page.locator("//SPAN[normalize-space() = 'Alphabetically']").click({ timeout: 60000 });
  }

  async selectNewestFirst(): Promise<void> {
    await this.page.locator("//DIV[normalize-space() = 'Newest first']").click({ timeout: 60000 });
  }

  async openFlowContextMenu(): Promise<void> {
    await this.page.locator("//button[normalize-space()='Launch']/following-sibling::div//button").click({ timeout: 60000 });
  }

  async clickDeleteFlow(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Delete flow')]").click({ timeout: 60000 });
  }

  async fillDeleteFlowConfirmation(name: string): Promise<void> {
    await this.page.locator("INPUT[placeholder='Type the name of the flow to confirm the deletion'][type='text']").fill(name, { timeout: 60000 });
  }

  async confirmDeleteFlow(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Yes, delete it']").click({ timeout: 60000 });
  }

  // ─── Projects module ──────────────────────────────────────────────────────

  async verifyMyProjectsTabVisible(): Promise<void> {
    await expect(
      this.page.locator("//BUTTON[@type='button'][normalize-space() = 'My projects']")
    ).toBeVisible({ timeout: 30000 });
  }

  async hoverMyProjectsTab(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'My projects']").hover({ timeout: 60000 });
  }

  async verifyCommandBarProjectsContext(): Promise<void> {
    await expect(
      this.page.locator("//li[.//span[normalize-space(text())='Projects']]")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyCommandBarFlowTemplatesContext(): Promise<void> {
    await expect(
      this.page.locator("//li[.//span[normalize-space(text())='Flow Templates']]")
    ).toBeVisible({ timeout: 30000 });
  }

  async clickProjectContextMenu(): Promise<void> {
    // nth(4) matches the project-level 3-dot menu button
    await this.page.locator("//button//*[name()='svg' and contains(@class,'MuiSvgIcon-root')]").nth(4).click({ timeout: 60000 });
  }

  async clickDeleteProject(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Delete Project')]").click({ timeout: 60000 });
  }

  async confirmDeleteProject(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'Yes, delete it']").click({ timeout: 60000 });
  }

  // ─── Reminders drawer ────────────────────────────────────────────────────

  /** Open the Reminders side-drawer by clicking/hovering the badge button. */
  async openRemindersDrawer(): Promise<void> {
    await this.page.locator("//button[.//span[contains(@class,'MuiBadge-root')]]").click({ timeout: 60000 });
  }

  async hoverRemindersButton(): Promise<void> {
    await this.page.locator("//button[.//span[contains(@class,'MuiBadge-root')]]").hover({ timeout: 60000 });
  }

  async fillReminderText(text: string): Promise<void> {
    await this.page.locator("INPUT[name='content_plain'][placeholder='Remind me about...'][type='text']").fill(text, { timeout: 60000 });
  }

  async clickReminderTime(label: string): Promise<void> {
    await this.page.locator(`//SPAN[contains(text(),'${label}')]`).click({ timeout: 60000 });
  }

  /** Special handler for the "in 20 min" button (force-click workaround). */
  async click20MinReminderOption(): Promise<void> {
    const btn = this.page.locator('//button[.//span[normalize-space(.)="in 20 min"] and not(@disabled)]');
    await btn.waitFor({ state: 'attached', timeout: 30000 });
    await btn.click({ force: true, timeout: 60000 });
  }

  async clearReminder(): Promise<void> {
    await this.page.locator("//BUTTON[@role='button'][@type='button'][normalize-space() = 'Clear']").click({ timeout: 60000 });
  }

  async verifyReminderUpdatedSuccessfully(): Promise<void> {
    await expect(
      this.page.locator("//DIV[contains(text(),'The reminder has been updated successful')]")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyReminderCreatedSuccessfully(): Promise<void> {
    await expect(
      this.page.locator("//DIV[contains(text(),'Your reminder has been created successfu')]")
    ).toBeVisible({ timeout: 30000 });
  }

  async verifyReminderItemVisible(text: string): Promise<void> {
    await expect(this.page.locator(`//P[contains(text(),'${text}')]`)).toBeVisible({ timeout: 30000 });
  }

  // Recurring reminder helpers
  async clickRecurringTab(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Recurring')]").click({ timeout: 60000 });
  }

  async verifyRecurringReminderHeader(): Promise<void> {
    await expect(this.page.locator("//h6[contains(text(), 'Recurring reminder')]")).toBeVisible({ timeout: 30000 });
  }

  async selectWeeklyRecurrence(): Promise<void> {
    await this.page.locator("//input[@value='weekly']").click({ timeout: 60000 });
  }

  async toggleWeekDay(day: 'M' | 'W' | 'F'): Promise<void> {
    const selectors: Record<string, string> = {
      M: "//DIV[normalize-space() = 'M']",
      W: "//SPAN[contains(text(),'W')]",
      F: "//DIV[normalize-space() = 'F']",
    };
    if (day === 'W') {
      await this.page.locator(selectors[day]).nth(1).click({ timeout: 60000 });
    } else {
      await this.page.locator(selectors[day]).first().click({ timeout: 60000 });
    }
  }

  async openTimePicker(): Promise<void> {
    await this.page.locator("//div[@aria-labelledby='time-selection time-selection']").click({ timeout: 60000 });
  }

  async selectTimeMidnight(): Promise<void> {
    await this.page.locator("//li[@data-value='00:00']").click({ timeout: 60000 });
  }

  async clickAddReminder(): Promise<void> {
    await this.page.locator("//BUTTON[@type='submit'][contains(text(),'Add reminder')]").click({ timeout: 60000 });
  }

  // Custom (date picker) reminder
  async clickCustomTab(): Promise<void> {
    await this.page.locator("//SPAN[contains(text(),'Custom')]").click({ timeout: 60000 });
  }

  async hoverTodayInCalendar(): Promise<void> {
    await this.page.locator("//button[contains(@class, 'MuiPickersDay-today')]").hover({ timeout: 60000 });
  }

  async clickTomorrowInCalendar(): Promise<void> {
    await this.page.locator("//button[contains(@class, 'MuiPickersDay-today')]/following::button").first().click({ timeout: 60000 });
  }

  async clickOkInDatePicker(): Promise<void> {
    await this.page.locator("//BUTTON[@type='button'][normalize-space() = 'OK']").click({ timeout: 60000 });
  }

  async verifyTomorrowLabelVisible(): Promise<void> {
    await expect(this.page.locator("//SPAN[contains(text(),'Tomorrow')]")).toBeVisible({ timeout: 30000 });
  }

  // URL hyperlink in reminder
  async verifyReminderLinkVisible(text: string): Promise<void> {
    await expect(this.page.locator(`//A[contains(text(),'${text}')]`)).toBeVisible({ timeout: 30000 });
  }

  // ─── PWA install button ───────────────────────────────────────────────────

  async clickPwaInstallButton(): Promise<void> {
    await this.page.locator("//button[@aria-label='Install app']").click({ timeout: 60000 });
  }

  // ─── Intercom help widget (iframe) ───────────────────────────────────────

  async clickIntercomMessagesTab(): Promise<void> {
    const frame = this.page.frameLocator('iframe[name="intercom-messenger-frame"]').first();
    await frame.locator('//button[@id="spaces-messages-tab"]').click({ timeout: 60000 });
  }

  // ─── Scroll helpers ───────────────────────────────────────────────────────

  /**
   * Scroll until the page bottom is reached (pagination trigger).
   * Preserves the functional intent from the original Muuk snippet.
   */
  async scrollToBottom(): Promise<void> {
    while (
      await this.page.evaluate(
        () => window.scrollY + window.innerHeight < document.body.scrollHeight
      )
    ) {
      await this.page.mouse.wheel(0, 500);
      await this.page.waitForTimeout(500);
    }
  }
}
