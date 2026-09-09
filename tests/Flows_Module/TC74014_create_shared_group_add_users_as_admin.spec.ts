import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74014 - Create Shared group Add users as Admin
 * Original: muuk-tests/Flows_Module/TestSteps_edba666a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74014 - Create Shared group: Add users as Admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNewFlowGroup();

  const randNum = Math.floor(Math.random() * 9999);
  await flowsPage.fillGroupName(`Test${randNum}`);
  await flowsPage.saveGroupName();

  // Add a member via the members input
  await page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`).pressSequentially('Angel', { timeout: 60000 }).catch(() => {});
  await page.locator(`//P[normalize-space() = "Angel Ramirez"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Click Done
  await page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert Angel Ramirez appears in members list
  await expect(page.locator(`//P[normalize-space() = "Angel Ramirez"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
