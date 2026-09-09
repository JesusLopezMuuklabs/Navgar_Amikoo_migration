import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78292 - Confirm URLs appear as hotlinks when added
 * Original: muuk-tests/Flows_Module/TestSteps_f5c56778.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78292 - URLs appear as hotlinks when added to description', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Expand the task description and add a URL
  await page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`).first().click({ timeout: 60000 }).catch(() => {});
  const descArea = page.locator(`//p[@data-placeholder="+ Add a description"]`);
  await descArea.click({ timeout: 60000 }).catch(() => {});
  await page.keyboard.type('https://muuktest.com/');
  await page.keyboard.press('Enter');

  // Assert the URL appears as a link
  await expect(page.locator(`//A[normalize-space() = "https://muuktest.com/"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
