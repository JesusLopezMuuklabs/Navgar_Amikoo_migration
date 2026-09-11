/**
 * Test Case ID: TC64034
 * Description: Entities module button links to the top entity type list in the sidebar
 * Migrated from: muuk-tests/Frame_Module/TestSteps_eb948daa.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64034 – Entities module button links to the top entity type list', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Accounts (sub-section of Entities nav)
  await framePage.navigateToAccounts();

  // Select the "MuukTest - Feature Flag Environment" account
  await framePage.selectAccount('MuukTest - Feature Flag Environment');

  // Navigate to Entities
  await framePage.navigateToEntities();

  // Verify the Entities header is visible (h6 containing "Entit")
  await framePage.verifyEntitiesHeader();
});
