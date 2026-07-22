import { test, expect } from '@playwright/test';
import { customers } from '../test-data/customers';
import { deleteCustomers } from '../test-data/deleteCustomers';

test('test', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  for (const customer of customers) {
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(customer.firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill(customer.lastName);
    await page.getByRole('textbox', { name: 'Post Code' }).click();
    await page.getByRole('textbox', { name: 'Post Code' }).fill(customer.postCode);
    page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });

    await page.getByRole('form')
      .getByRole('button', { name: 'Add Customer' })
      .click();
  }

  await page.getByRole('button', { name: 'Customers' }).click();

  for (const customer of customers) {
    const row = page.locator('table tbody tr')
      .filter({ has: page.locator('td').nth(0).filter({ hasText: customer.firstName }) })
      .filter({ has: page.locator('td').nth(1).filter({ hasText: customer.lastName }) })
      .filter({ has: page.locator('td').nth(2).filter({ hasText: customer.postCode }) });
    await expect(row).toHaveCount(1);
  }

    for (const deleteCustomer of deleteCustomers) {
      const row = page.locator('table tbody tr')
        .filter({ has: page.locator('td').nth(0).filter({ hasText: deleteCustomer.firstName }) })
        .filter({ has: page.locator('td').nth(1).filter({ hasText: deleteCustomer.lastName }) })
        .filter({ has: page.locator('td').nth(2).filter({ hasText: deleteCustomer.postCode }) });
      await expect(row).toHaveCount(1);
      await row.getByRole('button', { name: 'Delete' }).click();
    }

    for (const deleteCustomer of deleteCustomers) {
      const row = page.locator('table tbody tr')
        .filter({ has: page.locator('td').nth(0).filter({ hasText: deleteCustomer.firstName }) })
        .filter({ has: page.locator('td').nth(1).filter({ hasText: deleteCustomer.lastName }) })
        .filter({ has: page.locator('td').nth(2).filter({ hasText: deleteCustomer.postCode }) });
      await expect(row).toHaveCount(0);
    }

});
