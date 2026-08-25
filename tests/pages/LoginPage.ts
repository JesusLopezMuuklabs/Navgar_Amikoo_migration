import { Page } from '@playwright/test';

/**
 * LoginPage — encapsulates the Navgar staging login flow.
 * URL: https://dashboard.staging.navgar.app/users/sign_in
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  /** Navigate to the app root (redirects to login if not authenticated). */
  async goto(baseUrl: string) {
    await this.page.goto(baseUrl, { timeout: 20000 });
  }

  /** Click the "Log in" heading/link to reach the login form. */
  async clickLogInLink() {
    await this.page.locator('//a[contains(text(),"Log In")]').click({ timeout: 60000 });
  }

  /** Fill email, password and submit the login form. */
  async login(email: string, password: string) {
    await this.page.locator('INPUT[type="email"][name="user[email]"][id="user_email"]').fill(email);
    await this.page.locator('INPUT[type="password"][name="user[password]"][id="user_password"]').fill(password);
    await this.page.locator('INPUT[type="submit"][name="commit"]').click({ timeout: 60000 });
    // Dismiss any post-login modal/overlay (e.g. command bar)
    await this.page.keyboard.press('Escape');
  }

  /** Full login sequence from the app root. */
  async loginFromRoot(baseUrl: string, email: string, password: string) {
    await this.goto(baseUrl);
    await this.clickLogInLink();
    await this.login(email, password);
  }
}
