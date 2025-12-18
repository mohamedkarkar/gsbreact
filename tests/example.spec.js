// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});

test('Login with valid credentials', async({page})=> {
  await page.goto('http://localhost:3000/login');

// Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'motdepasseValide');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/login');

});


test('Login with invalid credentials', async({page})=> {
  await page.goto('http://localhost:3000/login');

// Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();
// Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

page.on("dialog", async (dialog) => {
  expect(dialog.type()).toContain("alert");
  expect(dialog.message()).toContain("Échec de la connexion");
  await dialog.accept();
});
  await page.fill('input[name="login"]', 'Mauvais utilisateur');
  await page.fill('input[name="password"]', 'Mauvais mot de passe');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/login');

});

test('Reloading dashboard', async({page})=> {
  await page.goto('http://localhost:3000/');

// Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();
// Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.reload();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

});


test('logout redirect back to login', async({page})=> {
  await page.goto('http://localhost:3000/login');

// Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();
// Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.getByRole('button', { name:'Deconnexion'}).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});