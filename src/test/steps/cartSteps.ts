import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { Then } = createBdd(test);

Then('I should see the cart count as {int}', async ({ inventoryPage }, expectedCount) => {
  const actualCount = await inventoryPage.getCartCount();
  expect(actualCount).toBe(expectedCount);
});
