import {test, expect} from '@playwright/test';
import {transactions} from '../test-data/transactions';


test('Verify customer transactions and balance calculation', async ({page}) => {

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

    await page.getByRole('button', {name: 'Customer Login'}).click();
    await expect(page.locator('#userSelect')).toBeVisible();

    await page.locator('#userSelect')
        .selectOption({ label: 'Hermoine Granger' });
    await expect(page.locator('#userSelect')).toHaveValue('1');
    
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#accountSelect')).toBeVisible();
    
    await page.locator('#accountSelect')
        .selectOption({ label: '1003' });
    await expect(page.locator('#accountSelect'))
        .toHaveValue('number:1003');


    const balanceText = await page.locator('.center strong').nth(1).textContent();

    let currentBalance = Number(balanceText);

    console.log('Initial Balance:', currentBalance);

    for (const transaction of transactions) {
        if (transaction.type === 'Credit') {
            await page.getByRole('button', { name: 'Deposit' }).click();
            await page.getByPlaceholder('amount').fill(transaction.amount.toString());
            await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();
            currentBalance += transaction.amount;

        } else if (transaction.type === 'Debit') {
            await page.getByRole('button', { name: 'Withdrawl' }).click();
            await expect(page.getByRole('form').getByRole('button', { name: 'Withdraw' })).toBeVisible();
            await page.getByPlaceholder('amount').fill(transaction.amount.toString());
            await page.getByRole('form').getByRole('button', { name: 'Withdraw' }).click();

            currentBalance -= transaction.amount;
        }


        const updatedBalanceText = await page.locator('.center strong').nth(1).textContent();
        const updatedBalance = Number(updatedBalanceText);

        console.log(`After ${transaction.type} of ${transaction.amount}, Updated Balance:`, updatedBalance);

        expect(updatedBalance).toBe(currentBalance);
    }



});
