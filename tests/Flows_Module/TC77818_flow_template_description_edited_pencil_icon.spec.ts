import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77818 - Confirm flow template description can be edited by clicking on the pencil icon in the title header
 * Original: muuk-tests/Flows_Module/TestSteps_a23160d2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77818 - Flow template description can be edited by clicking on pencil icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Overview tab
  await flowsPage.clickOverviewTab();

  // Click + Add description
  await flowsPage.clickAddDescription();

  // Fill description
  await flowsPage.fillDescription('This is a description');

  // Click Done
  await flowsPage.clickDoneDescription();

  // Assert the description text is visible
  await flowsPage.assertDescriptionVisible('This is a description');
});
