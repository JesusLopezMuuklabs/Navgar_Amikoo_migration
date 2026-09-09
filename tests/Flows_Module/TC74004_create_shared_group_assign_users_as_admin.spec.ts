import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC74004 - Create Shared group Assign users as Admin
 * Original: muuk-tests/Flows_Module/TestSteps_edb949ca.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC74004 - Create Shared group: Assign users as Admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Click "Make group admin" to assign admin role
  await page.locator(`//P[normalize-space() = "Make group admin"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert admin badge is visible
  await flowsPage.assertAdminBadgeVisible();
});
