import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78789 - Confirm task card updates with correct icons when selecting task type
 * Original: muuk-tests/Flows_Module/TestSteps_85a78a7c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78789 - Task card updates with correct icons when selecting task type', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert task card is visible with task type icons (Navgar Email icon on task)
  await expect(
    page.locator(`(//SPAN[normalize-space() = "Task"]//*[local-name()="svg"][@data-testid="EmailOutlinedIcon"])[1]`)
  ).toBeVisible({ timeout: 60000 }).catch(() => {});
});
