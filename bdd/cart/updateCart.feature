@bdd
Feature: Update Cart

  @bdd1
  Scenario: Update cart quantity
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I click element using css "#add-to-cart-button"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".cart-item-row:first-child input[type='number']" with value "3"
    And I click element using css "button:has-text('Update shopping cart')"
    Then I should see element using css ".cart-item-row:first-child input[type='number']" has value "3"

  @bdd2
  Scenario: Update quantity to 0 should remove item
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I click element using css "#add-to-cart-button"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".cart-item-row:first-child input[type='number']" with value "0"
    And I click element using css "button:has-text('Update shopping cart')"
    Then I should see element using css ".no-data:has-text('Your Shopping Cart is empty')" to be visible
