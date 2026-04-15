import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { Then } = createBdd(test);

// Mock Master Data (In a real scenario, this would come from an API call)
const MASTER_PRODUCT_DATA = [
  { name: 'Sauce Labs Backpack', price: 29.99 },
  { name: 'Sauce Labs Bike Light', price: 9.99 },
  { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { name: 'Sauce Labs Onesie', price: 7.99 },
  { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 }
];

Then('all products on the UI should match the master data source', async ({ inventoryPage }) => {
  const uiProducts = await inventoryPage.getAllProducts();
  
  // Compare lengths
  expect(uiProducts.length).toBe(MASTER_PRODUCT_DATA.length);
  
  // Compare content
  for (const masterProduct of MASTER_PRODUCT_DATA) {
    const uiMatch = uiProducts.find(p => p.name === masterProduct.name);
    
    if (!uiMatch) {
      throw new Error(`Product "${masterProduct.name}" found in Master Data but missing on UI`);
    }
    
    expect(uiMatch.price).toBe(masterProduct.price);
  }
});
