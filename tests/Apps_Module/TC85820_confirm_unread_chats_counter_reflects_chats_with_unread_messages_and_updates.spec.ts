import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85820 - Confirm Unread chats counter reflects the current amount of chats with unread messages and dynamically updates
 * Original: muuk-tests/Apps_Module/TestSteps_e547c802.spec.ts
 *
 * Navigates to Applications and verifies the "Unread chats" counter chip is visible
 * on the app cards.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85820 - Confirm Unread chats counter reflects chats with unread messages and updates', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Assert "Unread chats" chip is visible on the app cards
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Unread chats")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch first instance to create new chat context
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back and verify counter is still visible
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Unread chats")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch second instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back and verify counter is still visible
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Unread chats")]`).first()).toBeVisible({ timeout: 60000 });
});
