import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

const { When, Then } = createBdd();

When('I sort products by {string}', async ({ page }, option) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy(option);
});

Then('the first item price should be higher than the second', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const firstPrice = await inventoryPage.getFirstItemPrice();
  const secondPriceText = await inventoryPage.inventoryItems.nth(1).locator('.inventory_item_price').innerText();
  const secondPrice = parseFloat(secondPriceText.replace('$', ''));
  expect(firstPrice).toBeGreaterThanOrEqual(secondPrice);
});

When('I add the first product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart(0);
});

When('I navigate to the cart page', async ({ page }) => {
  await page.goto('/cart.html');
});

When('I click on the checkout button', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();
});

When('I fill in checkout information with {string} {string} {string}', async ({ page }, first, last, zip) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(first, last, zip);
});

Then('I should see the checkout overview', async ({ page }) => {
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

Then('the total price should be correctly calculated with tax', async ({ page }) => {
  const overviewPage = new CheckoutOverviewPage(page);
  const { subtotal, tax, total } = await overviewPage.getPriceDetails();
  
  // Validate that Total = Subtotal + Tax
  expect(total).toBeCloseTo(subtotal + tax, 2);
});

When('I click the finish button', async ({ page }) => {
  const overviewPage = new CheckoutOverviewPage(page);
  await overviewPage.clickFinish();
});

Then('I should see {string} success message', async ({ page }, message) => {
  const completePage = new CheckoutCompletePage(page);
  const successMessage = await completePage.getSuccessMessage();
  expect(successMessage).toBe(message);
});
