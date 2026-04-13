import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import testData from '../data/testData.json';

const { Given, When, Then } = createBdd();

Given('I am on the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/');
});

When('I login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.validUser.username, testData.validUser.password);
});

When('I login with {string} and {string}', async ({ page }, username, password) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
});

Then('I should see {string} header', async ({ page }, headerText) => {
  const inventoryPage = new InventoryPage(page);
  const text = await inventoryPage.getHeaderText();
  expect(text).toBe(headerText);
});

Then('I should see an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.errorMessage).toBeVisible();
});
