import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { FooterComponent } from '../pages/components/FooterComponent';
import { SearchComponent } from '../pages/components/SearchComponent';
import { MiniCartComponent } from '../pages/components/MiniCartComponent';

type NopFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productListPage: ProductListPage;
  productDetailPage: ProductDetailPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  myAccountPage: MyAccountPage;
  headerComponent: HeaderComponent;
  footerComponent: FooterComponent;
  searchComponent: SearchComponent;
  miniCartComponent: MiniCartComponent;
};

export const test = base.extend<NopFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  footerComponent: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
  searchComponent: async ({ page }, use) => {
    await use(new SearchComponent(page));
  },
  miniCartComponent: async ({ page }, use) => {
    await use(new MiniCartComponent(page));
  },
});

export { expect } from '@playwright/test';
