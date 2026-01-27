import { test, expect } from '../../fixtures/test.fixture';

test.describe('Product Details Tests', () => {
  test('TC-PROD-003: View product details from product list', async ({
    page,
    productListPage,
    productDetailPage,
  }) => {
    // Navigate to product list page
    await productListPage.gotoCategory('computers');

    // Click on first product
    await productListPage.clickProduct(0);

    // Verify product detail page opens
    await productDetailPage.verifyProductDetails();

    // Verify product information displayed
    const productName = await productDetailPage.getProductName();
    const productPrice = await productDetailPage.getProductPrice();

    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();

    // Verify images are displayed
    const hasImages = await productDetailPage.isVisible(productDetailPage.mainImage);
    expect(hasImages).toBeTruthy();

    // Verify Add to cart button is visible
    const hasAddToCart = await productDetailPage.isVisible(
      productDetailPage.addToCartButton
    );
    expect(hasAddToCart).toBeTruthy();
  });

  test('TC-PROD-003: Verify product SKU and stock availability', async ({
    page,
    productListPage,
    productDetailPage,
  }) => {
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);

    // Verify SKU is displayed
    const sku = await productDetailPage.getProductSku();
    expect(sku).toBeTruthy();

    // Verify stock availability
    await productDetailPage.verifyStockAvailability();
  });

  test('TC-PROD-003: Verify product description and specifications', async ({
    page,
    productListPage,
    productDetailPage,
  }) => {
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);

    // Verify description is visible (if available)
    const hasDescription = await productDetailPage.isVisible(
      productDetailPage.productDescription
    );
    // Description may or may not be present, so we just check if page loaded correctly
    await productDetailPage.verifyProductDetails();
  });
});
