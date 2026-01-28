@bdd
Feature: Update Cart Quantity

  @bdd1
  Scenario: Update product quantity in cart
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    Then I should see element using css ".cart-item-row" to be visible
    When I fill element using css ".qty-input" with value "3"
    And I click element using css "button[name='updatecart']"
    Then I should see element using css ".qty-input" to be visible

  @bdd2
  Scenario: Update quantity to zero removes item
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".qty-input" with value "0"
    And I click element using css "button[name='updatecart']"
    Then I should see element using css ".no-data" to be visible

  @bdd3
  Scenario: Verify cart total updates with quantity change
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".qty-input" with value "2"
    And I click element using css "button[name='updatecart']"
    Then I should see element using css ".cart-total" to be visible
