@bdd
Feature: Guest Purchase Flow

  @bdd1
  Scenario: Complete guest purchase from search to checkout
    Given I go to url "https://nop-qa.portnov.com"
    When I fill element using css "#small-searchterms" with value "laptop"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible
    When I click element using css ".product-item:first-child .product-title a"
    And I wait for any element using css "#add-to-cart-button-4" to be visible
    And I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "#termsofservice"
    And I click element using css "#checkout"
    And I click element using css "#checkout-as-guest"
    Then I should see element using css "#BillingNewAddress_FirstName" to be visible
