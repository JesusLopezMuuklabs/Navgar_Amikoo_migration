import { Page, Locator } from '@playwright/test';

/**
 * AccountMembersPage
 * The account detail/members page reached after clicking "View" or an account name link.
 * URL pattern: /[orgId]/accounts/[accountId]
 *
 * Covers: test1 (TC84094–TC84102), test2 (TC84103–TC84153), test4 (TC84302+)
 *
 * Muuk origins:
 *   dashboardStagingNavgs2xobrrm80o6 (members table + actions)
 *   dashboardStagingNavgidqm7qb1ce54 (Edit member link)
 */
export class AccountMembersPage {
  readonly page: Page;

  // ── Account heading (test4) ───────────────────────────────────────────────
  /**
   * H1 showing the account name (e.g. "MuukTest - Feature Flag Environment").
   * Used by test4 to assert landing on the correct account page.
   */
  readonly accountNameHeading: Locator;

  // ── Members table column headers ─────────────────────────────────────────
  /** "User" column header. */
  readonly userColumnHeader: Locator;

  /** "Friendly code" column header. */
  readonly friendlyCodeColumnHeader: Locator;

  /** "Email" column header. */
  readonly emailColumnHeader: Locator;

  /** "Phone number" column header. */
  readonly phoneNumberColumnHeader: Locator;

  /** "Roles" column header. */
  readonly rolesColumnHeader: Locator;

  // ── Member actions ───────────────────────────────────────────────────────
  /**
   * "Edit" link on the first member row.
   * index 0 → first "Edit" anchor on the members table.
   */
  readonly editMemberLink: Locator;

  // ── Page-level actions ───────────────────────────────────────────────────
  /**
   * "Invite A User" button/link — opens the invite form.
   * Used by test2 (TC84104+) and test4.
   */
  readonly inviteUserLink: Locator;

  /**
   * "Edit Account" link on the account detail page.
   * Opens the Edit Account form.
   * Used by test4.
   */
  readonly editAccountLink: Locator;

  /**
   * "New Registration Code" button.
   * Used by test4 to generate a registration code.
   */
  readonly newRegistrationCodeButton: Locator;

  /**
   * Success paragraph shown after a registration code is created.
   * Contains text "New registration code created: …".
   */
  readonly registrationCodeCreatedMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountNameHeading        = page.locator(`//H1[normalize-space() = "MuukTest - Feature Flag Environment"]`);
    this.userColumnHeader          = page.locator(`//th[text() = "User"]`);
    this.friendlyCodeColumnHeader  = page.locator(`//th[text() = "Friendly code"]`);
    this.emailColumnHeader         = page.locator(`//th[text() = "Email"]`);
    this.phoneNumberColumnHeader   = page.locator(`//th[text() = "Phone number"]`);
    this.rolesColumnHeader         = page.locator(`//th[text() = "Roles"]`);
    this.editMemberLink            = page.locator(`//A[normalize-space() = "Edit"]`).nth(0);
    this.inviteUserLink            = page.locator(`//A[normalize-space() = "Invite A User"]`);
    this.editAccountLink           = page.locator(`//A[normalize-space() = "Edit Account"]`);
    this.newRegistrationCodeButton = page.locator(
      `//BUTTON[@type='submit'][normalize-space() = "New Registration Code"]`
    );
    this.registrationCodeCreatedMessage = page.locator(
      `//P[contains(text(), "New registration code created: ")]`
    );
  }

  /** Click the "Edit" link on the first member row. */
  async clickEditMember(): Promise<void> {
    await this.editMemberLink.click({ timeout: 60000 });
  }

  /** Click "Invite A User" to open the invitation form. */
  async clickInviteUser(): Promise<void> {
    await this.inviteUserLink.click({ timeout: 60000 });
  }

  /** Click "Edit Account" to open the account edit form. */
  async clickEditAccount(): Promise<void> {
    await this.editAccountLink.click({ timeout: 60000 });
  }

  /** Click "New Registration Code" to generate a code. */
  async clickNewRegistrationCode(): Promise<void> {
    await this.newRegistrationCodeButton.click({ timeout: 60000 });
  }
}
