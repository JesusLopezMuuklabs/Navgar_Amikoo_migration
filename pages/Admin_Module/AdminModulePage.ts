import { Page, expect } from '@playwright/test';

/**
 * AdminModulePage
 * Page Object for the Admin Module screens of the Navgar staging dashboard.
 * Migrated from: muuk-tests/Admin_Module/PageDetails.ts
 *
 * Covers:
 *   - Accounts list page
 *   - Account detail / edit page
 *   - New account creation page
 *   - Invite a user page
 *   - Profile / Edit Profile page
 *   - Password / Two-factor Authentication page
 *   - Connected Accounts page
 *   - Backup Codes page
 */
export class AdminModulePage {
  constructor(readonly page: Page) {}

  // ─── Navigation ───────────────────────────────────────────────────────────

  /** Open the Profile Menu (top-right avatar button). */
  async openProfileMenu() {
    await this.page.locator('//div[@role="button"][@aria-label="Profile Menu"]').click({ timeout: 60000 });
  }

  /** Click "Accounts" in the Profile Menu dropdown (index 1). */
  async clickAccountsInProfileMenu() {
    await this.page.locator('//A[normalize-space() = "Accounts"]').nth(1).click({ timeout: 60000 });
  }

  /** Click "Accounts" in the Profile sidebar (index 2, used on profile screens). */
  async clickAccountsInSidebar() {
    await this.page.locator('//A[normalize-space() = "Accounts"]').nth(2).click({ timeout: 60000 });
  }

  /** Click "Profile" in the Profile Menu dropdown (index 1). */
  async clickProfileInMenu() {
    await this.page.locator('//A[normalize-space() = "Profile"]').nth(1).click({ timeout: 60000 });
  }

  /** Click "Password" in the profile sidebar (index 1). */
  async clickPasswordTab() {
    await this.page.locator('//A[normalize-space() = "Password"]').nth(1).click({ timeout: 60000 });
  }

  /** Click "Connected Accounts" in the profile sidebar (index 1). */
  async clickConnectedAccountsTab() {
    await this.page.locator('//A[normalize-space() = "Connected Accounts"]').nth(1).click({ timeout: 60000 });
  }

  // ─── Accounts List page ───────────────────────────────────────────────────

  /** Assert the Accounts list heading is visible. */
  async assertAccountsHeadingVisible() {
    await expect(this.page.locator('//H1[normalize-space() = "Accounts"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click a specific account by its display name span. */
  async clickAccountByName(name: string) {
    await this.page.locator(`//SPAN[normalize-space() = "${name}"]`).click({ timeout: 60000 });
  }

  /** Click the "MuukTest - Feature Flag Environment" account link. */
  async clickFeatureFlagEnvironment() {
    await this.page.locator('//SPAN[normalize-space() = "MuukTest - Feature Flag Environment"]').click({ timeout: 60000 });
  }

  /** Click the "MuukTest - Production Environment" account link. */
  async clickProductionEnvironment() {
    await this.page.locator('//SPAN[normalize-space() = "MuukTest - Production Environment"]').click({ timeout: 60000 });
  }

  /** Click the "Switch" link for the Feature Flag environment row. */
  async clickSwitchForFeatureFlagEnvironment() {
    await this.page.locator('//tr[.//span[contains(text(), \'MuukTest - Feature Flag Environment\')]]//a[@label=\'Switch\']').click({ timeout: 60000 });
  }

  /** Click "View" link (first occurrence). */
  async clickView() {
    await this.page.locator('//A[normalize-space() = "View"]').first().click({ timeout: 60000 });
  }

  /** Click "Create an Account" button. */
  async clickCreateAnAccount() {
    await this.page.locator('//A[normalize-space() = "Create an Account"]').click({ timeout: 60000 });
  }

  // ─── Account Detail page ──────────────────────────────────────────────────

  /** Assert the account detail heading is visible (by account name). */
  async assertAccountDetailHeadingVisible(accountName: string) {
    await expect(this.page.locator(`//H1[normalize-space() = "${accountName}"]`)).toBeVisible({ timeout: 60000 });
  }

  /** Click "Edit Account" button. */
  async clickEditAccount() {
    await this.page.locator('//A[normalize-space() = "Edit Account"]').click({ timeout: 60000 });
  }

  /** Assert "Account was successfully updated." flash message is visible. */
  async assertAccountUpdatedSuccessVisible() {
    await expect(this.page.locator('//P[normalize-space() = "Account was successfully updated."]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert User table header is visible. */
  async assertUserTableHeaderVisible() {
    await expect(this.page.locator('//th[text() = "User"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Friendly code table header is visible. */
  async assertFriendlyCodeTableHeaderVisible() {
    await expect(this.page.locator('//th[text() = "Friendly code"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Email table header is visible. */
  async assertEmailTableHeaderVisible() {
    await expect(this.page.locator('//th[text() = "Email"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Phone number table header is visible. */
  async assertPhoneNumberTableHeaderVisible() {
    await expect(this.page.locator('//th[text() = "Phone number"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Roles table header is visible. */
  async assertRolesTableHeaderVisible() {
    await expect(this.page.locator('//th[text() = "Roles"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Invite A User" button on the account detail page. */
  async clickInviteAUser() {
    await this.page.locator('//A[normalize-space() = "Invite A User"]').click({ timeout: 60000 });
  }

  /** Click "New Registration Code" button. */
  async clickNewRegistrationCode() {
    await this.page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "New Registration Code"]').click({ timeout: 60000 });
  }

  /** Assert the new registration code confirmation message is visible. */
  async assertNewRegistrationCodeVisible() {
    await expect(this.page.locator('//P[contains(text(), "New registration code created: ")]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Current Account" label is visible for the Feature Flag environment row. */
  async assertCurrentAccountLabelVisible() {
    await expect(this.page.locator('//tr[.//span[contains(text(), \'MuukTest - Feature Flag Environment\')]]//div[text()=\'Current Account\']')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the MuukTest account image is visible. */
  async assertAccountAvatarVisible() {
    await expect(this.page.locator('//td//img[contains(@alt, \'MuukTest\')]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Edit" link on the accounts list row. */
  async clickEdit() {
    await this.page.locator('//A[normalize-space() = "Edit"]').click({ timeout: 60000 });
  }

  // ─── Edit Account page ────────────────────────────────────────────────────

  /** Assert the Account Name label is visible on the edit form. */
  async assertAccountNameLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Account Name"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Default language label is visible on the edit form. */
  async assertDefaultLanguageLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Default language"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Friendly code label is visible on the edit form. */
  async assertFriendlyCodeLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Friendly code"]')).toBeVisible({ timeout: 60000 });
  }

  /** Select a language in the Default language dropdown on the Edit Account form. */
  async selectDefaultLanguage(value: string) {
    await this.page.locator('SELECT[name=\'account[default_language]\'][id=\'account_default_language\']').selectOption(value, { timeout: 60000 });
  }

  /** Click "Update Account" button. */
  async clickUpdateAccount() {
    await this.page.locator('//BUTTON[@name=\'button\'][@type=\'submit\'][normalize-space() = "Update Account"]').click({ timeout: 60000 });
  }

  // ─── New Account page ─────────────────────────────────────────────────────

  /** Assert the New Account page heading is visible. */
  async assertNewAccountHeadingVisible() {
    await expect(this.page.locator('//H1[normalize-space() = "Accounts Icons/cheveron right New Account"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Account Name label is visible on the create form. */
  async assertNewAccountNameLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Account Name"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert Default language label is visible on the create form. */
  async assertNewAccountDefaultLanguageLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Default language"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Create Account" button. */
  async clickCreateAccount() {
    await this.page.locator('//BUTTON[@name=\'button\'][@type=\'submit\'][normalize-space() = "Create Account"]').click({ timeout: 60000 });
  }

  // ─── Invite A User page ───────────────────────────────────────────────────

  /** Assert the Name label is visible on the invite form. */
  async assertInviteNameLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Name"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the Email label is visible on the invite form. */
  async assertInviteEmailLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Email"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Send invitation" button is visible. */
  async assertSendInvitationButtonVisible() {
    await expect(this.page.locator('//BUTTON[@name=\'button\'][@type=\'submit\'][normalize-space() = "Send invitation"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Send invitation" button. */
  async clickSendInvitation() {
    await this.page.locator('//BUTTON[@name=\'button\'][@type=\'submit\'][normalize-space() = "Send invitation"]').click({ timeout: 60000 });
  }

  // ─── Edit Profile page ────────────────────────────────────────────────────

  /** Assert the Edit Profile heading is visible. */
  async assertEditProfileHeadingVisible() {
    await expect(this.page.locator('//H1[normalize-space() = "Edit Profile"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Update" span button on the Edit Profile page. */
  async clickUpdateProfile() {
    await this.page.locator('//SPAN[normalize-space() = "Update"]').click({ timeout: 60000 });
  }

  /** Assert "Applications" span in the sidebar is visible (confirms successful login). */
  async assertApplicationsVisible() {
    await expect(this.page.locator('//SPAN[normalize-space() = "Applications"]')).toBeVisible({ timeout: 60000 });
  }

  // ─── Password page ────────────────────────────────────────────────────────

  /** Assert "Update Password" heading is visible. */
  async assertUpdatePasswordHeadingVisible() {
    await expect(this.page.locator('//H1[normalize-space() = "Update Password"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Current password" label is visible. */
  async assertCurrentPasswordLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Current password"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "New password" label is visible. */
  async assertNewPasswordLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "New password"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "New password confirmation" label is visible. */
  async assertNewPasswordConfirmationLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "New password confirmation"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Update" (submit) button on the password form. */
  async clickUpdatePasswordButton() {
    await this.page.locator('INPUT[type=\'submit\'][name=\'commit\']').click({ timeout: 60000 });
  }

  /** Assert "Two-factor Authentication" section heading is visible. */
  async assertTwoFactorAuthHeadingVisible() {
    await expect(this.page.locator('//H2[normalize-space() = "Two-factor Authentication"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Enable two-factor authentication" link. */
  async clickEnableTwoFactor() {
    await this.page.locator('//A[normalize-space() = "Enable two-factor authentication"]').click({ timeout: 60000 });
  }

  // ─── Backup Codes page ────────────────────────────────────────────────────

  /** Assert "Backup Codes" heading is visible. */
  async assertBackupCodesHeadingVisible() {
    await expect(this.page.locator('//H3[normalize-space() = "Backup Codes"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Cancel" link on the Backup Codes page. */
  async clickCancelBackupCodes() {
    await this.page.locator('//A[normalize-space() = "Cancel"]').click({ timeout: 60000 });
  }

  // ─── Connected Accounts page ──────────────────────────────────────────────

  /** Assert "Connected Accounts" heading is visible. */
  async assertConnectedAccountsHeadingVisible() {
    await expect(this.page.locator('//H2[normalize-space() = "Connected Accounts"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert the "Sign in with Google" button is visible. */
  async assertGoogleButtonVisible() {
    await expect(this.page.locator('//button[@class="btn btn-google_oauth2"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click the "Sign in with Google" button. */
  async clickGoogleButton() {
    await this.page.locator('//button[@class="btn btn-google_oauth2"]').click({ timeout: 60000 });
  }

  /** Assert the "MS 365" button is visible. */
  async assertMS365ButtonVisible() {
    await expect(this.page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "MS 365"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "MS 365" button. */
  async clickMS365Button() {
    await this.page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "MS 365"]').click({ timeout: 60000 });
  }

  // ─── Profile account avatar / link assertions ─────────────────────────────

  /** Assert the production environment account link is visible (index 1). */
  async assertProductionEnvironmentLinkVisible() {
    await expect(this.page.locator('//A[normalize-space() = "MuukTest - Production Environment"]').nth(1)).toBeVisible({ timeout: 60000 });
  }

  /** Assert the production environment account header image is visible. */
  async assertProductionEnvironmentAvatarVisible() {
    await expect(this.page.locator('//h1[.//a[contains(text(), \'MuukTest - Production\')]]/preceding-sibling::img')).toBeVisible({ timeout: 60000 });
  }

  // ─── Time zone / Phone / Profile fields ──────────────────────────────────

  /** Assert "Time zone" label is visible on the profile page. */
  async assertTimeZoneLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Time zone"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Preferred language" label is visible on the profile page. */
  async assertPreferredLanguageLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Preferred language"]')).toBeVisible({ timeout: 60000 });
  }

  /** Assert "Phone numbers" label is visible on the profile page. */
  async assertPhoneNumbersLabelVisible() {
    await expect(this.page.locator('//LABEL[normalize-space() = "Phone numbers"]')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Add phone" link. */
  async clickAddPhone() {
    await this.page.locator('//A[normalize-space() = "Add phone"]').click({ timeout: 60000 });
  }

  /** Click "Delete my account" button. */
  async clickDeleteMyAccount() {
    await this.page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "Delete my account"]').click({ timeout: 60000 });
  }

  /** Assert "Are you sure?" modal heading is visible. */
  async assertAreYouSureVisible() {
    await expect(this.page.locator('//h5[normalize-space() = \'Are you sure?\']')).toBeVisible({ timeout: 60000 });
  }

  /** Click "Cancel" button in the confirmation modal. */
  async clickCancelModal() {
    await this.page.locator('//BUTTON[normalize-space() = "Cancel"]').click({ timeout: 60000 });
  }
}
