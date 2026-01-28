@bdd
Feature: Add to Cart

  @bdd1
  Scenario: Add product to cart from product list
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    When I click element using css ".item-grid .product-item:nth-child(1) .product-box-add-to-cart-button"
    Then I wait for any element using css ".bar-notification.success" to be visible
    And I should see element using css ".cart-qty" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible
    And I should see element using css ".product-name a" to be visible

  @bdd2
  Scenario: Add product to cart from product detail page
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I fill element using css "#product_enteredQuantity_4" with value "2"
    And I click element using css "#add-to-cart-button-4"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible

  @bdd3
  Scenario: Add configurable product with options
    Given I go to url "https://nop-qa.portnov.com/build-your-own-computer"
    Then I wait for any element using css "#add-to-cart-button-1" to be visible
    When I click element using css "#add-to-cart-button-1"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible
