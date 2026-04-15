import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly headerTitle: Locator;
  readonly productSort: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('.title');
    this.productSort = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  itemContainer(name: string) {
    return this.inventoryItems.filter({ hasText: name });
  }

  async getHeaderText() {
    return await this.headerTitle.innerText();
  }

  async sortBy(option: string) {
    await this.productSort.selectOption({ label: option });
  }

  async addItemToCart(index: number = 0) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async getPriceByName(name: string) {
    const priceText = await this.itemContainer(name).locator('.inventory_item_price').innerText();
    return parseFloat(priceText.replace('$', ''));
  }

  async addItemByName(name: string) {
    await this.itemContainer(name).locator('button').click();
  }

  async getItemPrice(index: number = 0) {
    const priceText = await this.inventoryItems.nth(index).locator('.inventory_item_price').innerText();
    return parseFloat(priceText.replace('$', ''));
  }

  async getItemName(index: number = 0) {
    return await this.inventoryItems.nth(index).locator('.inventory_item_name').innerText();
  }

  async openItemDetails(index: number = 0) {
    await this.inventoryItems.nth(index).locator('.inventory_item_name').click();
  }

  async getAllProducts() {
    const count = await this.inventoryItems.count();
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push({
        name: await this.getItemName(i),
        price: await this.getItemPrice(i)
      });
    }
    return products;
  }
}
