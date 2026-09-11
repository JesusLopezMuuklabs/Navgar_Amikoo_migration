import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC73794 - Edit group name and confirm change updates in sidebar list
 * Original: muuk-tests/RunningFlows_Module/TestSteps_2c82b126.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC73794 - Edit group name and confirm change updates in sidebar list', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  // Navigate to Running Flows
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click the _Running Flow Group in the sidebar
  await runningFlowsPage.clickRunningFlowGroup('_Running Flow Group');

  // Open the group edit panel via the pencil button
  await runningFlowsPage.clickRunningFlowGroupEditButton('_Running Flow Group');

  // Confirm "Edit group" header is visible
  await runningFlowsPage.clickEditGroupHeader();

  // Update the group name
  await runningFlowsPage.fillGroupName('_Running Flow Group_updated');
  await runningFlowsPage.saveGroupName();

  // Assert "Group updated successfully" toast
  await runningFlowsPage.assertGroupUpdatedSuccessfully();

  // Close the edit panel
  await runningFlowsPage.closeEditGroupPanel();

  // Assert the updated name appears in sidebar
  await runningFlowsPage.assertUpdatedGroupNameVisible('_Running Flow Group_updated');

  // Open the edit panel again for verification
  await runningFlowsPage.clickRunningFlowGroupEditButton('_Running Flow Group');
  await runningFlowsPage.clickEditGroupHeader();

  // Update name again (restore / verify second edit)
  await runningFlowsPage.fillGroupName('_Running Flow Group_updated');
  await runningFlowsPage.saveGroupName();

  // Assert toast again
  await runningFlowsPage.assertGroupUpdatedSuccessfully();

  // Assert old name NOT visible
  await runningFlowsPage.assertUpdatedGroupNameNotVisible('_Running Flow Group_updated');
});
