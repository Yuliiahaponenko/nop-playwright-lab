@bdd
Feature: Add to Cart

  @bdd1
  Scenario: Add product to cart from product list
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    When I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    And I wait for any element using css "#add-to-cart-button-4" to be visible
    And I click element using css "#add-to-cart-button-4"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I wait for any element using css "table.cart tbody tr" to be visible

  @bdd2
  Scenario: Add product to cart from product detail page
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I wait for any element using css "#add-to-cart-button-4" to be visible
    And I fill element using css "#product_enteredQuantity_4" with value "2"
    And I click element using css "#add-to-cart-button-4"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I wait for any element using css "table.cart tbody tr" to be visible

  @bdd3
  Scenario: Add configurable product with options
    Given I go to url "https://nop-qa.portnov.com/build-your-own-computer"
    Then I wait for any element using css "#product_attribute_1" to be visible
    When I select option "2.2 GHz Intel Pentium Dual-Core E2200" from element using css "#product_attribute_1"
    And I select option "2 GB" from element using css "#product_attribute_2"
    And I click element using css "#product_attribute_3_6"
    And I click element using css "#product_attribute_4_8"
    And I click element using css "#product_attribute_5_10"
    And I click element using css "#product_attribute_5_11"
    And I wait for any element using css "#add-to-cart-button-1" to be visible
    When I click element using css "#add-to-cart-button-1"
    Then I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I wait for any element using css "table.cart tbody tr" to be visible
