import { Page, expect } from '@playwright/test';

/**
 * FlowsPage
 * Page Object for the Flow Templates module (sidebar nav + group management + template list).
 * Migrated from: muuk-tests/Flows_Module/PageDetails.ts
 */
export class FlowsPage {
  constructor(private readonly page: Page) {}

  // ─── Navigation ──────────────────────────────────────────────────────────

  /** Click "Flow Templates" in the sidebar. */
  async navigateToFlowTemplates() {
    await this.page.locator('//span[contains(text(), "Flow Templates")]').click({ timeout: 60000 });
  }

  /** Click a specific Flow Group by its name. */
  async clickFlowGroup(name: string) {
    await this.page.locator(`//P[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Click a specific Flow Template by its name. */
  async clickFlowTemplate(name: string) {
    await this.page.locator(`//P[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  // ─── Flow Groups ─────────────────────────────────────────────────────────

  /** Click the "+ New Flow Group" button. */
  async clickNewFlowGroup() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "+ New Flow Group"]`).click({ timeout: 60000 });
  }

  /** Fill the group name input. */
  async fillGroupName(name: string) {
    await this.page.locator(`INPUT[name='name'][type='string']`).fill(name, { timeout: 60000 });
  }

  /** Save the group name form. */
  async saveGroupName() {
    await this.page.locator(`//Label[normalize-space() = "Name"]/following::BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  /** Click the delete icon for a group (edit pencil area). */
  async clickGroupDeleteIcon() {
    await this.page.locator(`//div[contains(@class,'flex items-center')]//div[contains(@class,'relative')][2]/button[1]`).click({ timeout: 60000 });
  }

  /** Confirm group deletion. */
  async confirmGroupDeletion() {
    await this.page.locator(`//h6[normalize-space() = "Delete group"]/following::BUTTON[@type='button'][normalize-space() = "Yes, delete it"][1]`).click({ timeout: 60000 });
  }

  /** Assert "Private" label is visible. */
  async assertPrivateLabelVisible() {
    await expect(this.page.locator(`//P[contains(text(),"Private")]`)).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Schedule a flow" label is visible. */
  async assertScheduleFlowLabelVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "Schedule a flow"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Group Settings / Members ─────────────────────────────────────────────

  /** Open the settings panel for the current group. */
  async clickGroupSettingsTab() {
    await this.page.locator(`//h6[contains(text(), "Settings")]`).click({ timeout: 60000 });
  }

  /** Click the "Email Templates" role tab in settings. */
  async clickEmailTemplatesTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Email Templates"]`).click({ timeout: 60000 });
  }

  /** Add a member to the group by typing their name. */
  async addMember(name: string) {
    await this.page.locator(`INPUT[placeholder='Add a new member here'][type='text'][role='combobox']`).pressSequentially(name, { timeout: 60000 });
  }

  /** Click a member suggestion in the autocomplete dropdown. */
  async selectMemberSuggestion(name: string) {
    await this.page.locator(`//P[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Click "Next" in member wizard. */
  async clickNext() {
    await this.page.locator(`//BUTTON[normalize-space() = "Next"]`).click({ timeout: 60000 });
  }

  /** Click "Done" button (submit type). */
  async clickDone() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).click({ timeout: 60000 });
  }

  /** Click "Remove" for a member. */
  async clickRemoveMember() {
    await this.page.locator(`//p[contains(text(), "Victor Villa")]/following::button[contains(text(), "Remove")][1]`).click({ timeout: 60000 });
  }

  /** Assert admin badge is visible for Victor Villa. */
  async assertAdminBadgeVisible() {
    await expect(
      this.page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Admin")]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Flow Template Actions ────────────────────────────────────────────────

  /** Click the "New" button to open the new template dropdown. */
  async clickNew() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "New"]`).click({ timeout: 60000 });
  }

  /** Select "Flow Template" from the new dropdown menu. */
  async selectFlowTemplate() {
    await this.page.locator(`//P[normalize-space() = "Flow Template"]`).click({ timeout: 60000 });
  }

  /** Select "Email Template" from the new dropdown menu. */
  async selectEmailTemplate() {
    await this.page.locator(`//P[normalize-space() = "Email Template"]`).click({ timeout: 60000 });
  }

  /** Delete the current flow template. */
  async clickDeleteFlow() {
    await this.page.locator(`//SPAN[normalize-space() = "Delete flow"]`).click({ timeout: 60000 });
  }

  /** Confirm flow deletion (entering the name if required). */
  async confirmFlowDeletion(flowName?: string) {
    if (flowName) {
      await this.page.locator(`input[placeholder*='confirm the deletion' i]`).fill(flowName, { timeout: 60000 });
    }
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Yes, delete it"]`).click({ timeout: 60000 });
  }

  // ─── Flow Template Form ───────────────────────────────────────────────────

  /** Fill the flow template name input. */
  async fillFlowTemplateName(name: string) {
    await this.page.locator(`INPUT[name='name'][type='text']`).fill(name, { timeout: 60000 });
  }

  /** Press Enter to submit template name. */
  async submitTemplateName() {
    await this.page.keyboard.press('Enter');
  }

  /** Click the "Create" button to save the flow. */
  async clickCreate() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Create"]`).click({ timeout: 60000 });
  }

  /** Click "Done" button (type=button variant). */
  async clickDoneButton() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Done"]`).click({ timeout: 60000 });
  }

  // ─── Launch ───────────────────────────────────────────────────────────────

  /** Click "Launch" on a specific flow template card. */
  async clickLaunch() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Launch"]`).click({ timeout: 60000 });
  }

  /** Click "Execute" button in the launch overlay. */
  async clickExecute() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Execute"]`).click({ timeout: 60000 });
  }

  /** Assert the execution overlay is visible with the given flow name. */
  async assertExecutionOverlayVisible(flowName: string) {
    await expect(
      this.page.locator(`//h6[normalize-space() = 'Executing ${flowName}']`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Execute" button is visible. */
  async assertExecuteButtonVisible() {
    await expect(
      this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Execute"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  // ─── Email Template Panel ─────────────────────────────────────────────────

  /** Hover over the "Public?" label to trigger tooltip. */
  async hoverPublicLabel() {
    await this.page.locator(`//P[normalize-space() = "Public?"]`).hover({ timeout: 60000 });
  }

  /** Click the Public? toggle switch. */
  async clickPublicToggle() {
    await this.page.locator(`//span[contains(@class, "MuiSwitch")]`).click({ timeout: 60000 });
  }

  /** Assert the Public toggle ON state indicator is visible. */
  async assertPublicToggleOnVisible() {
    await expect(
      this.page.locator(`//span[contains(@class, "-colorP")]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Hover the body helper text in the email template editor. */
  async hoverHelperText() {
    await this.page.locator(`//P[normalize-space() = "Type {{ or click {+} to add a variable and personalize the template"]`).hover({ timeout: 60000 });
  }

  /** Assert the email helper text is visible. */
  async assertHelperTextVisible() {
    await expect(
      this.page.locator(`//P[normalize-space() = "Type {{ or click {+} to add a variable and personalize the template"]`)
    ).toBeVisible({ timeout: 60000 });
  }

  /** Assert the email helper text is NOT visible. */
  async assertHelperTextNotVisible() {
    await expect(
      this.page.locator(`//P[normalize-space() = "Type {{ or click {+} to add a variable and personalize the template"]`)
    ).not.toBeVisible({ timeout: 60000 });
  }

  /** Click the comma separator helper text. */
  async clickCommaSeparatorText() {
    await this.page.locator(`//SPAN[normalize-space() = "You can separate multiple email addresses with a comma (,)"]`).click({ timeout: 60000 });
  }

  /** Click the X (Close) button on the helper info banner. */
  async clickCloseHelperBanner() {
    await this.page.locator(`//button[@aria-label="Close"]`).click({ timeout: 60000 });
  }

  /** Click Save in the email template form. */
  async clickSaveEmailTemplate() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  // ─── Flow Template Editor ─────────────────────────────────────────────────

  /** Click the "View details" button on a flow template card. */
  async clickViewDetails() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "View details"]`).click({ timeout: 60000 });
  }

  /** Click the "Overview" tab in the template details. */
  async clickOverviewTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Overview"]`).click({ timeout: 60000 });
  }

  /** Click the "Template" tab in the template details. */
  async clickTemplateTab() {
    await this.page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Template"]`).click({ timeout: 60000 });
  }

  /** Click the "+ Add description" span (any occurrence). */
  async clickAddDescription() {
    await this.page.locator(`//SPAN[normalize-space() = "+ Add description"]`).nth(2).click({ timeout: 60000 });
  }

  /** Fill the description textarea. */
  async fillDescription(text: string) {
    await this.page.locator(`//textarea[@name='description']`).fill(text, { timeout: 60000 });
  }

  /** Click Done after editing description. */
  async clickDoneDescription() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).click({ timeout: 60000 });
  }

  /** Assert a specific description text is visible. */
  async assertDescriptionVisible(text: string) {
    await expect(this.page.locator(`//SPAN[normalize-space() = "${text}"]`).nth(2)).toBeVisible({ timeout: 60000 });
  }

  // ─── Flow Steps / Task Editor ─────────────────────────────────────────────

  /** Click the "Add step below" button. */
  async clickAddStepBelow() {
    await this.page.locator(`//button[@aria-label="Add step below"]`).click({ timeout: 60000 });
  }

  /** Click "Add template" button in step. */
  async clickAddTemplate() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Add template"]`).click({ timeout: 60000 });
  }

  /** Click "+ Create new template" in the template picker. */
  async clickCreateNewTemplate() {
    await this.page.locator(`//P[normalize-space() = "+ Create new template"]`).click({ timeout: 60000 });
  }

  /** Click an existing template named "MailTemplate". */
  async clickMailTemplate() {
    await this.page.locator(`//P[normalize-space() = "+ Create new template"]/following::P[normalize-space() = "MailTemplate"]`).click({ timeout: 60000 });
  }

  /** Fill step legend (task name). */
  async fillStepLegend(name: string) {
    await this.page.locator(`INPUT[name='legend'][type='text']`).fill(name, { timeout: 60000 });
  }

  /** Click the "Save" button inside the flow editor. */
  async clickSaveFlowEditor() {
    await this.page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`).click({ timeout: 60000 });
  }

  /** Click the "Undo" button in the flow editor. */
  async clickUndo() {
    await this.page.locator(`//BUTTON[@type='button'][normalize-space() = "Undo"]`).click({ timeout: 60000 });
  }

  /** Click the "Overview" button inside the flow editor toolbar. */
  async clickFlowEditorOverview() {
    await this.page.locator(`//BUTTON[normalize-space() = "Overview"]`).click({ timeout: 60000 });
  }

  /** Click "Zoom out" in the flow canvas. */
  async clickZoomOut() {
    await this.page.locator(`BUTTON[type='button'][title='zoom out']`).click({ timeout: 60000 });
  }

  /** Click "Fit view" in the flow canvas. */
  async clickFitView() {
    await this.page.locator(`BUTTON[type='button'][title='fit view']`).click({ timeout: 60000 });
  }

  /** Assert a task step label is visible. */
  async assertStepVisible(label: string) {
    await expect(this.page.locator(`//span[@class="truncate"][normalize-space() = "${label}"]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Schedule Flow ────────────────────────────────────────────────────────

  /** Click "Schedule flow" option. */
  async clickScheduleFlow() {
    await this.page.locator(`//SPAN[normalize-space() = "Schedule flow"]`).click({ timeout: 60000 });
  }

  /** Click "Select all days" in the schedule panel. */
  async clickSelectAllDays() {
    await this.page.locator(`//SPAN[normalize-space() = "Select all days"]`).click({ timeout: 60000 });
  }

  /** Assert the schedule panel visible text. */
  async assertSchedulePlanningTextVisible() {
    await expect(this.page.locator(`//P[normalize-space() = "You can plan ahead and schedule a flow to be launched in the future."]`)).toBeVisible({ timeout: 60000 });
  }

  // ─── Search ───────────────────────────────────────────────────────────────

  /** Fill the search input on the Flow Templates page. */
  async searchTemplate(query: string) {
    await this.page.locator(`input[placeholder="Search"]`).fill(query, { timeout: 60000 });
  }
}
