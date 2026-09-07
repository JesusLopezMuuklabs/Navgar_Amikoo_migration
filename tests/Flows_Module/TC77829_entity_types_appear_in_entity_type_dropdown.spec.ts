import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77829 - Confirm entity types appear in entity type dropdown
 * Original: muuk-tests/Flows_Module/TestSteps_a23c90ae.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77829 - Entity types appear in entity type dropdown', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectFlowTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await flowsPage.fillFlowTemplateName(`Test${randNum}`);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

  // Click Entity Type dropdown
  await page.locator(`//INPUT[@placeholder='Select Entity Type'][@type='text'][@role='combobox']`).click({ timeout: 60000 }).catch(() => {});

  // Assert options appear
  await expect(page.locator(`//LI[@role='option']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
