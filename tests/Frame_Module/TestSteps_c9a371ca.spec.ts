/**
 * Test Case ID: TC64178
 * Description: Main Command Bar Flow templates can be created
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a371ca.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64178 – Main Command Bar: Flow templates can be created', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Flow Templates module
  await framePage.navigateToFlowTemplates();

  // Fill the flow name in the command bar and click Save
  await framePage.fillCommandBarFlowNameInput('Test');
  await framePage.clickCommandBarSave();

  // Verify "Flow Settings" panel opened
  await framePage.verifyFlowSettingsVisible();

  // Fill description
  await framePage.fillFlowDescription('Test Description');

  // Open members input and select Angel Ramirez
  await framePage.clickAddMembersInput();
  await framePage.selectFlowMember('Angel Ramirez');

  // Press Tab then Enter to confirm selection
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  // Fill the legend/name input and press Enter
  await framePage.fillFlowLegend('Test');
  await framePage.pressEnter();

  // Assign an owner
  await framePage.clickFlowOwnerAssign();
  await framePage.selectFlowOwner('ARAR Angel Ramirez');
  await framePage.clickDoneButton();

  // Open sort dropdown and select "Newest first"
  await framePage.openFlowSortDropdown();
  await framePage.selectNewestFirst();

  // Open flow context menu (3 dots)
  await framePage.openFlowContextMenu();

  // Hover then click "Delete flow"
  await page.locator("//SPAN[contains(text(),'Delete flow')]").hover({ timeout: 60000 });
  await framePage.clickDeleteFlow();

  // Type flow name to confirm deletion
  await framePage.fillDeleteFlowConfirmation('Test');

  // Confirm deletion
  await framePage.confirmDeleteFlow();
});
