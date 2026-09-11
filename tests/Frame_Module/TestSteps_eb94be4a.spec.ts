/**
 * Test Case ID: TC64036
 * Description: Entities module button links to the top entity type list in the sidebar clone
 * Migrated from: muuk-tests/Frame_Module/TestSteps_eb94be4a.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64036 – Entities module button (clone): navigate directly to Entities', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate directly to Entities
  await framePage.navigateToEntities();

  // Verify the Entities header is visible
  await framePage.verifyEntitiesHeader();
});
