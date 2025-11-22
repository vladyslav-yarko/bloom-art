import { test, expect } from '@playwright/test'


test.describe("Home Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/en')
    })

    test('should have correct metadata', async ({ page }) => {
        await expect(page).toHaveTitle('Bloom-Art: Home')
    })

    test('should have correct elementes', async ({ page }) => {
        await expect(
            page.getByRole('heading', {
                name: '✨ ArtStudia ✨',
            })
        ).toBeVisible()
    })
})
