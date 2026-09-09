import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77456 - Confirm fields and buttons are interactable Flow status toggle
 * Original: muuk-tests/Flows_Module/TestSteps_6886974c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77456 - Fields and buttons are interactable: Flow status toggle', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickFlowTemplate('Flow Template Flow Module');
  await flowsPage.clickScheduleFlow();

  // Assert the "Flow status (active / inactive)" label is visible
  await expect(page.locator(`//P[normalize-space() = "Flow status (active / inactive)"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
