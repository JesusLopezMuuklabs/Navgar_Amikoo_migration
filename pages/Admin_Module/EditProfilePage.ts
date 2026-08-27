import { Page, Locator } from '@playwright/test';

/**
 * EditProfilePage
 * The user profile edit page at `/users/edit`.
 * Covers: test2 (TC84153), test3 (TC84154 + TC84297 series), test4, test5.
 *
 * Muuk origin: dashboardStagingNavgkat21kg28a4
 */
export class EditProfilePage {
  readonly page: Page;

  // ── Page heading ─────────────────────────────────────────────────────────
  /** H1 "Edit Profile" heading — used to assert landing on this page. */
  readonly pageHeading: Locator;

  // ── Profile fields ───────────────────────────────────────────────────────
  /**
   * Initials text input (`user[initials]`, placeholder "SJ").
   * Used by test3 (TC84154) — fill "ASD", save, verify "ASD" persisted,
   * then restore to "AR".
   */
  readonly initialsInput: Locator;

  /**
   * Avatar file upload input (`user[avatar]`).
   * Used by test2 (TC84153) — "Choose file" button opens file picker.
   */
  readonly avatarFileInput: Locator;

  // ── Form action ──────────────────────────────────────────────────────────
  /**
   * "Update" submit button (span text).
   * Used by test3 (TC84154) to save profile changes.
   */
  readonly updateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading    = page.locator(`//H1[normalize-space() = "Edit Profile"]`);
    this.initialsInput  = page.locator(
      `INPUT[placeholder='SJ'][type='text'][name='user[initials]'][id='user_initials']`
    );
    this.avatarFileInput = page.locator(
      `INPUT[type='file'][name='user[avatar]'][id='user_avatar']`
    );
    this.updateButton   = page.locator(`//SPAN[normalize-space() = "Update"]`);
  }

  /**
   * Fill the initials field and click Update.
   * @param initials New initials value (e.g. "ASD" or "AR").
   */
  async updateInitials(initials: string): Promise<void> {
    await this.initialsInput.fill(initials);
    await this.updateButton.click({ timeout: 60000 });
  }
}
