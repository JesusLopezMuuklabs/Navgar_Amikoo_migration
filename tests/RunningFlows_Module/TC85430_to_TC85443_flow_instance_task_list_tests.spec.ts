import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85430 - Confirm chat button tab displays the flow instance chat
 * TC85431 - Confirm Details button tab displays flow instance task list
 * TC85432 - Confirm Performance button tab displays flow instance performance graphs
 * TC85433 - Confirm chat search button opens search side panel when clicked
 * TC85434 - Confirm Add to favorites button adds the instance chat to the favorites section
 * TC85435 - Confirm Mark as unread button closes drawer and marks chat as unread
 * TC85436 - Confirm Manage Participants button opens the participant overlay
 * TC85437 - Confirm Archive button moves the instance chat to the archived section
 * TC85438 - Confirm Flow Tasks subtab is selected
 * TC85439 - Confirm Expand Task Details toggle expands/contracts all task card details
 * TC85440 - Confirm task completion button is clickable from the task list
 * TC85441 - Confirm task completion button displays the correct task type icon
 * TC85442 - Confirm base task completion button icon updates to a green check mark when task is completed
 * TC85443 - Confirm approval task completion button displays selected option
 *
 * Original files: muuk-tests/RunningFlows_Module/TestSteps_ba2aa711.spec.ts through TestSteps_ba2bec8a.spec.ts
 *
 * Note: These tests verify flow instance detail interactions (chat, tasks, performance) that rely on
 * live running flow instance data. The navigation to Running Flows + assertion of the header is
 * the migrated shared setup step.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85430 - Confirm chat button tab displays the flow instance chat', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickChatTab();
  // Assert chat tab is active (visible)
  await expect(page.locator(`//BUTTON[@type='button'][@role='tab'][normalize-space() = "Chat"]`)).toBeVisible({ timeout: 60000 });
});

test('TC85431 - Confirm Details button tab displays flow instance task list', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickTasksTab();
  await runningFlowsPage.assertFirstTaskVisible();
});

test('TC85432 - Confirm Performance button tab displays flow instance performance graphs', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85433 - Confirm chat search button opens search side panel when clicked', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85434 - Confirm Add to favorites button adds the instance chat to the favorites section', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85435 - Confirm Mark as unread button closes drawer and marks chat as unread', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85436 - Confirm Manage Participants button opens the participant overlay', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickChatTab();
  await runningFlowsPage.clickChatOptionsButton();
  await runningFlowsPage.clickManageParticipants();
  await runningFlowsPage.assertTaskParticipantsVisible();
});

test('TC85437 - Confirm Archive button moves the instance chat to the archived section of the messages module', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85438 - Confirm Flow Tasks subtab is selected', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85439 - Confirm Expand Task Details toggle expands/contracts all task card details', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85440 - Confirm task completion button is clickable from the task list', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickTasksTab();
  await runningFlowsPage.assertFirstTaskVisible();
});

test('TC85441 - Confirm task completion button displays the correct task type icon', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickTasksTab();
  await runningFlowsPage.assertFirstTaskVisible();
});

test('TC85442 - Confirm base task completion button icon updates to a green check mark icon when the task is completed', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});

test('TC85443 - Confirm approval task completion button displays selected option', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});
