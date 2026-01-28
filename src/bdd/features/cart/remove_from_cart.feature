@bdd
Feature: Remove from Cart

  @bdd1
  Scenario: Remove single product from cart
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    Then I wait for any element using css "table.cart tbody tr" to be visible
    When I check the checkbox using css "input[name='removefromcart']"
    And I click element using css "button[name='updatecart']"
    Then I should see element using css ".no-data" to be visible

  @bdd2
  Scenario: Remove item from cart with multiple products
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/htc-one-m8-android-l-50-lollipop"
    And I click element using css "#add-to-cart-button-18"
    And I wait for any element using css ".bar-notification.success" to be visible
    When I go to url "https://nop-qa.portnov.com/cart"
    Then I wait for any element using css "table.cart tbody tr" to be visible
    When I check the checkbox using css "input[name='removefromcart']"
    And I click element using css "button[name='updatecart']"
    Then I wait for any element using css "table.cart tbody tr" to be visible
