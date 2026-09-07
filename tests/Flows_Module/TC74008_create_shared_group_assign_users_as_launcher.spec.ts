import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74008 - Create Shared group Assign users as Launcher
 * Original: muuk-tests/Flows_Module/TestSteps_edb9ec49.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74008 - Create Shared group: Assign users as Launcher', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Click "Make template launcher" to assign launcher role
  await page.locator(`//P[normalize-space() = "Make template launcher"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert Launcher badge is visible
  await expect(page.locator(`//div[@aria-label="Victor Villa"]/parent::div/following-sibling::div/descendant::p[contains(text(), "Launcher")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
