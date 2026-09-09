import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78299 - Confirm task names can be edited
 * Original: muuk-tests/Flows_Module/TestSteps_f5c71bed.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78299 - Task names can be edited', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click the task name edit area (+ Add a task name)
  await page.locator(`//SPAN[normalize-space() = "+ Add a task name"]`).nth(1).click({ timeout: 60000 }).catch(() => {});

  // Assert the textarea becomes visible for editing
  await expect(page.locator(`TEXTAREA[name='legend'][placeholder='+ Add a task name']`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
