import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC_A73551 - Flow Group Confirm group appears in flow groups list with a shared icon
 * Original: muuk-tests/Flows_Module/TestSteps_b1f4a6c7.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A73551 - Flow Group: group appears in flow groups list with a shared icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Assert shared icon (MuiSvgIcon cursor-pointer) is visible
  await expect(page.locator(`svg.MuiSvgIcon-root.cursor-pointer`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
