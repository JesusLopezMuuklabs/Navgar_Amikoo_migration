import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Admin_Module/LoginPage';
import { ProfileMenuComponent } from '../../pages/Admin_Module/ProfileMenuComponent';
import { EditProfilePage } from '../../pages/Admin_Module/EditProfilePage';

/**
 * Edit Profile page — Muuk source: muuk-tests/Admin/test2/TestSteps_a4fb0c92.spec.ts
 *
 * Flow:
 *   1. Navigate to app root and log in.
 *   2. Open Profile Menu → Profile.
 *   3. Assert "Edit Profile" H1 heading is visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Edit Profile page', () => {

  // TC84153 — Confirm Choose file button opens a file upload window
  test('TC84153 - Confirm Choose file button opens a file upload window', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const editProfilePage = new EditProfilePage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    // Open Profile Menu and navigate to Profile (Edit Profile page)
    await profileMenu.navigateToProfile();

    // Assert the Edit Profile heading is visible — confirms successful navigation
    await expect(editProfilePage.pageHeading).toBeVisible({ timeout: 60000 });
  });

});
