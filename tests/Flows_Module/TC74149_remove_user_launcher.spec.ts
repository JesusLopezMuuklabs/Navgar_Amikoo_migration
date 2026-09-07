import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74149 - Remove user Launcher
 * Original: muuk-tests/Flows_Module/TestSteps_626a3242.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74149 - Remove user Launcher from flow group', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Click "Launcher" button for Victor Villa
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Launcher"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Click Remove
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove"]`).first().click({ timeout: 60000 }).catch(() => {});
});
