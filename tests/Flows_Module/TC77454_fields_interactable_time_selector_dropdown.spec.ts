import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77454 - Confirm fields and buttons are interactable Time selector dropdown
 * Original: muuk-tests/Flows_Module/TestSteps_687fd35f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77454 - Fields and buttons are interactable: Time selector dropdown', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickFlowTemplate('Flow Template Flow Module');
  await flowsPage.clickScheduleFlow();

  // Assert the Time label is visible
  await expect(page.locator(`//LABEL[normalize-space() = "Choose a time for the launch"]`)).toBeVisible({ timeout: 60000 });

  // Click the time combobox
  await page.locator(`//div[@role='combobox' and @aria-labelledby='time-selection time-selection']`).click({ timeout: 60000 });

  // Assert options appear
  await expect(page.locator(`LI[role='option']`).first()).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
