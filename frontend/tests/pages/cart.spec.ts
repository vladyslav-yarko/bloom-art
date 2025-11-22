import { test, expect } from '@playwright/test'


test.describe("Cart Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should have correct metadata', async ({ page }) => {
        await expect(page).toHaveTitle('Bloom-Art: Cart')
    })

    test('should have correct elementes', async ({ page }) => {
        await expect(
            page.getByRole('heading', {
                name: '✨ ArtStudia ✨',
            })
        ).toBeVisible()
    })
})
