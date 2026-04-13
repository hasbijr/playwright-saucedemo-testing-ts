import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
