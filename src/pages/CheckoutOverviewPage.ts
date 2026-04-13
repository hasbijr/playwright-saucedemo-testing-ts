import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async getPriceDetails() {
    const sub = await this.subtotal.innerText();
    const tx = await this.tax.innerText();
    const tot = await this.total.innerText();
    
    // Extracts numeric values from strings like "Item total: $29.99"
    return {
      subtotal: parseFloat(sub.split('$')[1]),
      tax: parseFloat(tx.split('$')[1]),
      total: parseFloat(tot.split('$')[1])
    };
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}
