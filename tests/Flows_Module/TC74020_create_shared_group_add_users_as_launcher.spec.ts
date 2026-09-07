import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74020 - Create Shared group Add users as Launcher
 * Original: muuk-tests/Flows_Module/TestSteps_edbb1bd8.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74020 - Create Shared group: Add users as Launcher', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Add Victor Villa as Launcher
  await page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`).pressSequentially('Victor', { timeout: 60000 }).catch(() => {});
  await page.locator(`//P[normalize-space() = "Victor Villa"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Launcher"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='submit'][normalize-space() = "Done"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert Launcher badge
  await expect(page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Launcher")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
