/**
 * Test Case ID: TC64167
 * Description: Main Command Bar Creation selector defaults to Flow Templates when in the Flow and Running Flows modules
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a1b427.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64167 – Command Bar defaults to Flow Templates when in the Flow Templates module', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Flow Templates
  await framePage.navigateToFlowTemplates();

  // Verify the Flow Templates header is shown
  await framePage.verifyFlowTemplatesHeader();

  // Hover and click the command-bar "Flow Templates" context selector
  const flowTemplatesSelector = page.locator("//li[.//span[normalize-space(text())='Flow Templates']]");
  await flowTemplatesSelector.hover({ timeout: 60000 });
  await flowTemplatesSelector.click({ timeout: 60000 });
});
