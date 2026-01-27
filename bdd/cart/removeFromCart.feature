@bdd
Feature: Remove from Cart

  @bdd1
  Scenario: Remove product from cart
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child button:has-text('Add to cart')"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:nth-child(2) button:has-text('Add to cart')"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css ".cart-item-row:first-child input[type='checkbox'][name*='remove']"
    And I click element using css "button:has-text('Update shopping cart')"
    Then I should see element using css ".cart-item-row" count is less than "2"

  @bdd2
  Scenario: Remove all products from cart
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child button:has-text('Add to cart')"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css ".cart-item-row input[type='checkbox'][name*='remove']"
    And I click element using css "button:has-text('Update shopping cart')"
    Then I should see element using css ".no-data:has-text('Your Shopping Cart is empty')" to be visible
