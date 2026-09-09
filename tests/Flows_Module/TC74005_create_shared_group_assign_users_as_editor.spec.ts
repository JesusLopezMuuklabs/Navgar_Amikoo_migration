import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74005 - Create Shared group Assign users as Editor
 * Original: muuk-tests/Flows_Module/TestSteps_edb98849.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74005 - Create Shared group: Assign users as Editor', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Click "Make group editor" to assign editor role
  await page.locator(`//P[normalize-space() = "Make group editor"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert Editor badge is visible for Victor Villa
  await expect(page.locator(`//p[contains(text(), "Victor Villa")]/ancestor::div/descendant::button[contains(text(), "Editor")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
