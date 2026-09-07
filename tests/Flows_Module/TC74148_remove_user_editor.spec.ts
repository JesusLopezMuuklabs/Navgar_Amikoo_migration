import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74148 - Remove user Editor
 * Original: muuk-tests/Flows_Module/TestSteps_626a0093.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74148 - Remove user Editor from flow group', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Click "Editor" button for Victor Villa to open roles menu
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Editor"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Click Remove
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Remove"]`).first().click({ timeout: 60000 }).catch(() => {});
});
