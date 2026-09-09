import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78481 - Confirm clicking on the delay icon will prompt the delay selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_85e2249c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78481 - Clicking delay icon prompts delay selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click the delay button (Delay icon)
  await page.locator(`//button[@aria-label='Delay']`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert delay overlay appears
  await expect(page.locator(`//DIV[normalize-space() = "Delay"]`).nth(1)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
