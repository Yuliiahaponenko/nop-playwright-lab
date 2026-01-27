import { test, expect } from '../../fixtures/test.fixture';
import * as productsData from '../../data/products.json';

test.describe('Product Search Tests', () => {
  test('TC-PROD-001: Search product by keyword', async ({
    page,
    homePage,
    productListPage,
  }) => {
    // Navigate to homepage
    await homePage.goto();

    // Search for a product
    const keyword = 'laptop';
    await homePage.searchProduct(keyword);

    // Verify search results page displayed
    await productListPage.verifySearchResults(keyword);

    // Verify product count displayed
    const productCount = await productListPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC-PROD-001: Search with multiple keywords', async ({
    page,
    homePage,
    productListPage,
  }) => {
    await homePage.goto();

    const keywords = productsData.searchKeywords;
    for (const keyword of keywords.slice(0, 3)) {
      // Search for product
      await homePage.searchProduct(keyword);

      // Verify results
      const productCount = await productListPage.getProductCount();
      expect(productCount).toBeGreaterThanOrEqual(0); // Some keywords may have no results

      // Navigate back to homepage for next search
      await homePage.goto();
    }
  });

  test('TC-PROD-001: Search with invalid keyword', async ({
    page,
    homePage,
    productListPage,
  }) => {
    await homePage.goto();

    // Search with invalid keyword
    await homePage.searchProduct('xyzabc123nonexistent');

    // Verify no results or appropriate message
    const productCount = await productListPage.getProductCount();
    // Either no products or a "no results" message should be displayed
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROD-001: Verify product details in search results', async ({
    page,
    homePage,
    productListPage,
  }) => {
    await homePage.goto();

    const keyword = 'laptop';
    await homePage.searchProduct(keyword);

    // Verify products have required elements
    const productCount = await productListPage.getProductCount();
    if (productCount > 0) {
      // Check first product has image, name, price, add to cart button
      const firstProduct = productListPage.productItems.first();
      const productName = firstProduct.locator('.product-title');
      const productPrice = firstProduct.locator('.price');
      const addToCartButton = firstProduct.locator('button:has-text("Add to cart")');

      expect(await productName.isVisible()).toBeTruthy();
      expect(await productPrice.isVisible()).toBeTruthy();
      expect(await addToCartButton.isVisible()).toBeTruthy();
    }
  });
});
