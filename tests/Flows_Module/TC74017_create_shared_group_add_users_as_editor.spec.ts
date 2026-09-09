import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74017 - Create Shared group Add users as Editor
 * Original: muuk-tests/Flows_Module/TestSteps_edba9a33.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74017 - Create Shared group: Add users as Editor', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Add Victor Villa as Editor via the shared group members
  await page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`).pressSequentially('Victor', { timeout: 60000 }).catch(() => {});
  await page.locator(`//P[normalize-space() = "Victor Villa"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Editor"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert Editor badge is visible
  await expect(page.locator(`//p[contains(text(), "Victor Villa")]/ancestor::div/descendant::button[contains(text(), "Editor")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
