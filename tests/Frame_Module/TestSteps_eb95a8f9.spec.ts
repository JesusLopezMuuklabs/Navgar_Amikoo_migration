/**
 * Test Case ID: TC64039
 * Description: Entities module button links to the top entity type list in the sidebar clone clone
 * Migrated from: muuk-tests/Frame_Module/TestSteps_eb95a8f9.spec.ts
 *
 * Note: this test clicks the sidebar "Help" button and interacts with the
 * Intercom iframe. Intercom must be loaded in the test environment.
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64039 – Help sidebar button opens Intercom widget', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover the Help sidebar button then click it
  await page.locator("//SPAN[contains(text(),'Help')]").hover({ timeout: 60000 });
  await page.locator("//SPAN[contains(text(),'Help')]").click({ timeout: 60000 });

  // Interact with the Intercom iframe (click Messages tab)
  await framePage.clickIntercomMessagesTab();
});
