import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79396 - Confirm edit button opens selected email template drawer
 * Original: muuk-tests/Flows_Module/TestSteps_51451723.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79396 - Edit button opens selected email template drawer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Click Edit on a mail template task's email section
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Edit"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert the Email Template drawer header appears
  await expect(page.locator(`//H6[contains(text(), "Email Template")]`)).toBeVisible({ timeout: 60000 });
});
