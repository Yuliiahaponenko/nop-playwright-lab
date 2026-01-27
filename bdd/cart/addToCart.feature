@bdd
Feature: Add to Cart

  @bdd1
  Scenario: Add product to cart from product list
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child button:has-text('Add to cart')"
    Then I wait for any element using css ".bar-notification.success" to be visible
    And I should see element using css ".cart-qty" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible
    And I should see element using css ".product-name a" to be visible

  @bdd2
  Scenario: Add product to cart from product detail page
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I fill element using css "#product_enteredQuantity" with value "2"
    And I click element using css "#add-to-cart-button"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible

  @bdd3
  Scenario: Add configurable product with options
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I wait for any element using css "input[type='radio'][name*='Color'], select[name*='Size']" to be visible
    When I click element using css "#add-to-cart-button"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible
