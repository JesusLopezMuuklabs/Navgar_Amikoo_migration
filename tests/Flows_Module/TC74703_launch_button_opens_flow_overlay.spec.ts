import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74703 - Confirm clicking Launch button opens the flow launch overlay
 * Original: muuk-tests/Flows_Module/TestSteps_08c02d25.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC74703 - Confirm clicking Launch button opens the flow launch overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Navigate to Flow Templates
  await flowsPage.navigateToFlowTemplates();

  // Click the "Flows Module" group
  await flowsPage.clickFlowGroup('Flows Module');

  // Click the "Flow Template Flow Module" template
  await flowsPage.clickFlowTemplate('Flow Template Flow Module');

  // Click the Launch button
  await flowsPage.clickLaunch();

  // Assert the execution overlay header is visible
  await expect(
    page.locator(`//h6[normalize-space() = 'Executing Flow Template Flow Module']`)
  ).toBeVisible({ timeout: 60000 });

  // Assert the Execute button is visible
  await flowsPage.assertExecuteButtonVisible();
});
