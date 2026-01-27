@bdd
Feature: Checkout Validation

  @bdd1
  Scenario: Verify required fields validation
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I click element using css "#add-to-cart-button"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "button:has-text('Checkout')"
    And I click element using css "input[value='CheckoutAsGuest']"
    When I click element using css "button:has-text('Continue'):near(#billing-buttons-container)"
    Then I wait for any element using css ".field-validation-error, .validation-summary-errors" to be visible

  @bdd2
  Scenario: Verify email format validation
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    And I click element using css "#add-to-cart-button"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "button:has-text('Checkout')"
    And I click element using css "input[value='CheckoutAsGuest']"
    When I fill element using css "#BillingNewAddress_Email" with value "invalid-email"
    And I click element using css "button:has-text('Continue'):near(#billing-buttons-container)"
    Then I wait for any element using css ".field-validation-error" to be visible
