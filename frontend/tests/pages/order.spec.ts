import { test, expect } from '@playwright/test'


test.describe("Order Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/order')
    })

    test('should have correct metadata', async ({ page }) => {
        await expect(page).toHaveTitle('Bloom-Art: Order')
    })

    test('should have correct elementes', async ({ page }) => {
        await expect(
            page.getByRole('heading', {
                name: 'Contact data',
            })
        ).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Shipping (Нова Пошта)',
            })
        ).toBeVisible()
    })
})
