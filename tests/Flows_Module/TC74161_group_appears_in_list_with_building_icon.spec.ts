import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74161 - Confirm group appears in flow groups list with building icon
 * Original: muuk-tests/Flows_Module/TestSteps_626b0daa.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74161 - Group appears in flow groups list with building icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Assert the building/company icon is visible in the groups list
  await expect(page.locator(`svg[data-testid="ApartmentOutlinedIcon"]`)).toBeVisible({ timeout: 60000 });
});
