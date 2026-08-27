import { Page, Locator } from '@playwright/test';

/**
 * InviteUserPage
 * The invitation form reached via "Invite A User".
 * URL pattern: /[orgId]/accounts/[accountId]/invitations/new
 *
 * Covers: test2 (TC84104+), test4
 *
 * Muuk origin: dashboardStagingNavgeh7wsg0a2ub
 */
export class InviteUserPage {
  readonly page: Page;

  // ── Form labels (used as visibility assertions in the original tests) ─────
  /** "Name" field label. */
  readonly nameLabel: Locator;

  /** "Email" field label. */
  readonly emailLabel: Locator;

  // ── Form action ──────────────────────────────────────────────────────────
  /** "Send invitation" submit button. */
  readonly sendInvitationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameLabel            = page.locator(`//LABEL[normalize-space() = "Name"]`);
    this.emailLabel           = page.locator(`//LABEL[normalize-space() = "Email"]`);
    this.sendInvitationButton = page.locator(
      `//BUTTON[@name='button'][@type='submit'][normalize-space() = "Send invitation"]`
    );
  }

  /**
   * Fill and submit the invite form.
   * @param name  Display name for the invitee.
   * @param email Email address for the invitee.
   */
  async sendInvitation(name: string, email: string): Promise<void> {
    // The Name and Email inputs sit below their labels; use the label
    // locators as anchors if needed — the tests only assert visibility
    // in this batch, but this method is provided for completeness.
    await this.page.locator(`//LABEL[normalize-space() = "Name"]/following-sibling::input`).fill(name);
    await this.page.locator(`//LABEL[normalize-space() = "Email"]/following-sibling::input`).fill(email);
    await this.sendInvitationButton.click({ timeout: 60000 });
  }
}
