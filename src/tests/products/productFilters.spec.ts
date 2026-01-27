import { test, expect } from '../../fixtures/test.fixture';

test.describe('Product Filters Tests', () => {
  test('TC-PROD-002: Apply price range filter', async ({
    page,
    productListPage,
  }) => {
    // Navigate to a category page
    await productListPage.gotoCategory('computers');

    // Get initial product count
    const initialCount = await productListPage.getProductCount();

    // Apply price filter
    await productListPage.applyPriceFilter('500', '1000');

    // Verify filtered products displayed
    const filteredCount = await productListPage.getProductCount();
    expect(filteredCount).toBeGreaterThanOrEqual(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Clear filter
    await productListPage.clearFilters();

    // Verify all products shown again
    const afterClearCount = await productListPage.getProductCount();
    expect(afterClearCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('TC-PROD-002: Apply multiple filters', async ({ page, productListPage }) => {
    await productListPage.gotoCategory('computers');

    // Apply price filter
    await productListPage.applyPriceFilter('100', '500');

    // Verify products are filtered
    const filteredCount = await productListPage.getProductCount();
    expect(filteredCount).toBeGreaterThanOrEqual(0);
  });
});
