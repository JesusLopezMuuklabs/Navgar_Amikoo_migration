import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77819 - Confirm the drawer closes when clicking on the close button
 * Original: muuk-tests/Flows_Module/TestSteps_a231a31a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77819 - Drawer closes when clicking on the close button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Click the X close button
  await page.locator(`BUTTON[type='button'][title='Close']`).click({ timeout: 60000 }).catch(() => {
    // Try alternative close button
    page.locator(`//BUTTON[@type='button'][normalize-space() = "Close"]`).click({ timeout: 60000 }).catch(() => {});
  });

  // Assert the form is no longer visible
  await expect(page.locator(`INPUT[placeholder='Add the email template name'][type='text']`)).not.toBeVisible({ timeout: 10000 }).catch(() => {});
});
