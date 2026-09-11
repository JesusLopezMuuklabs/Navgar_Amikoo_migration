/**
 * Test Case ID: TC64584
 * Description: Clicking the button will trigger the PWA install request prompt
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b64ec94.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64584 – PWA install button triggers the install prompt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Click the PWA "Install app" button
  await framePage.clickPwaInstallButton();

  // Wait briefly after clicking (preserves original sleep intent)
  await page.waitForTimeout(2000);
});
