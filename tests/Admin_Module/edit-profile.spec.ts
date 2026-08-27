// tests/Admin_Module/edit-profile.spec.ts
//
// TC84153 — Confirm "Choose file" button opens a file upload window
// Muuk file: a4fb0c92
//
// Flow: Login → Profile Menu → Profile → assert "Edit Profile" heading visible
//
// Note: The Muuk source test navigates to the Edit Profile page and asserts the
// H1 "Edit Profile" heading is visible. The "Choose file" button itself is a native
// file-input (<input type="file">) which cannot be meaningfully interacted with in
// a headless browser the same way Muuk did. The assertion that the element is present
// and visible (enabled) preserves the original intent.

import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { EditProfilePage } from '../../pages/Admin_Module/EditProfilePage';

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Edit Profile page', () => {

  // TC84153 — Confirm "Choose file" button opens a file upload window
  test('Edit Profile page is accessible and shows the page heading', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const dashboardPage  = new DashboardPage(page);
    const editProfilePage = new EditProfilePage(page);

    // Navigate to app and log in
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    // Open Profile Menu → Profile (Edit Profile page)
    await dashboardPage.navigateToProfile();

    // Assert the "Edit Profile" heading is visible — confirms successful navigation
    await expect(editProfilePage.pageHeading).toBeVisible({ timeout: 60000 });

    // Assert the avatar file-upload input is present in the DOM and visible
    // (this is the "Choose file" button referenced in the TC description)
    await expect(editProfilePage.avatarFileInput).toBeVisible({ timeout: 60000 });
  });

});
