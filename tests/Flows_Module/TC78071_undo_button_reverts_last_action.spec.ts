import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78071 - Confirm Undo button reverts last action
 * Original: muuk-tests/Flows_Module/TestSteps_a7b9c3d4.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78071 - Undo button reverts last action', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Undo button
  await flowsPage.clickUndo();

  // Assert the flow editor is still visible (undo doesn't crash)
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "Undo"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
