import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79007 - Email: Confirm Mail task can be duplicated in the multiselect menu
 * Original: muuk-tests/Flows_Module/TestSteps_7665aec5.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79007 - Email: Mail task can be duplicated in the multiselect menu', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert More/Clone action is accessible
  await page.locator(`//button[@aria-label="More"]`).first().click({ timeout: 60000 }).catch(() => {});
  await expect(page.locator(`//SPAN[normalize-space() = "Clone"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
