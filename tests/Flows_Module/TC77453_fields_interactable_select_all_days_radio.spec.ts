import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77453 - Confirm fields and buttons are interactable Select all days radio button
 * Original: muuk-tests/Flows_Module/TestSteps_68785391.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77453 - Fields and buttons are interactable: Select all days radio button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickFlowTemplate('Flow Template Flow Module');

  // Open schedule flow panel
  await flowsPage.clickScheduleFlow();

  // Click Select all days
  await flowsPage.clickSelectAllDays();

  // Assert the label is visible
  await expect(page.locator(`//LABEL[normalize-space() = "Select the days that the flow should be launched"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
