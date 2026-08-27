import { Page, Locator } from '@playwright/test';

/**
 * LoginPage
 * Handles the Navgar staging login flow.
 * Covers: all Admin test groups (test1–test5).
 */
export class LoginPage {
  readonly page: Page;

  // Landing page "Log In" link
  readonly logInLink: Locator;

  // Login form fields
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInLink    = page.locator(`//a[contains(text(),"Log In")]`);
    this.emailInput   = page.locator(`INPUT[type='email'][name='user[email]'][id='user_email']`);
    this.passwordInput = page.locator(`INPUT[type='password'][name='user[password]'][id='user_password']`);
    this.submitButton = page.locator(`INPUT[type='submit'][name='commit']`);
  }

  /** Navigate to the app root. */
  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl, { timeout: 20000 });
  }

  /**
   * Full login flow: click the "Log In" link on the landing page,
   * fill credentials, and submit.
   */
  async login(email: string, password: string): Promise<void> {
    await this.logInLink.click({ timeout: 60000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click({ timeout: 60000 });
    // Dismiss any command-bar overlay that appears after login
    await this.page.keyboard.press('Escape');
  }
}
