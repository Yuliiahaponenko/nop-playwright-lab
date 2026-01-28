@bdd
Feature: Guest Checkout

  @bdd1
  Scenario: Complete guest checkout flow
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "#termsofservice"
    And I go to url "https://nop-qa.portnov.com/onepagecheckout"
    Then I wait for any element using css "input[value='CheckoutAsGuest']" to be visible
    And I click element using css "input[value='CheckoutAsGuest']"
    When I fill element using css "#BillingNewAddress_FirstName" with value "John"
    And I fill element using css "#BillingNewAddress_LastName" with value "Doe"
    And I fill element using css "#BillingNewAddress_Email" with value "john.doe@example.com"
    And I fill element using css "#BillingNewAddress_City" with value "Los Angeles"
    And I fill element using css "#BillingNewAddress_Address1" with value "123 Test Street"
    And I fill element using css "#BillingNewAddress_ZipPostalCode" with value "90001"
    And I fill element using css "#BillingNewAddress_PhoneNumber" with value "5551234567"
    And I select option "United States" from element using css "#BillingNewAddress_CountryId"
    And I click element using css "button:has-text('Continue'):near(#billing-buttons-container)"
    Then I wait for any element using css "input[name='shippingoption']" to be visible
    When I click element using css "input[name='shippingoption']:first-child"
    And I click element using css "button:has-text('Continue'):near(#shipping-method-buttons-container)"
    Then I wait for any element using css "input[name='paymentmethod']" to be visible
    When I click element using css "input[name='paymentmethod']:first-child"
    And I click element using css "button:has-text('Continue'):near(#payment-method-buttons-container)"
    Then I wait for any element using css "#CardholderName" to be visible
    When I fill element using css "#CardholderName" with value "Test User"
    And I fill element using css "#CardNumber" with value "4111111111111111"
    And I select option "12" from element using css "#ExpireMonth"
    And I select option "2027" from element using css "#ExpireYear"
    And I fill element using css "#CardCode" with value "123"
    And I click element using css "button:has-text('Continue'):near(#payment-info-buttons-container)"
    Then I wait for any element using css "button:has-text('Confirm')" to be visible
    When I click element using css "button:has-text('Confirm')"
    Then I should see element using css ".page-title:has-text('Thank you')" to be visible
    And I should see element using css ".order-number" to be visible

  @bdd2
  Scenario: Verify order details in confirmation
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "#termsofservice"
    And I go to url "https://nop-qa.portnov.com/onepagecheckout"
    Then I wait for any element using css "input[value='CheckoutAsGuest']" to be visible
    And I click element using css "input[value='CheckoutAsGuest']"
    When I fill element using css "#BillingNewAddress_FirstName" with value "John"
    And I fill element using css "#BillingNewAddress_LastName" with value "Doe"
    And I fill element using css "#BillingNewAddress_Email" with value "john.doe@example.com"
    And I fill element using css "#BillingNewAddress_City" with value "Los Angeles"
    And I fill element using css "#BillingNewAddress_Address1" with value "123 Test Street"
    And I fill element using css "#BillingNewAddress_ZipPostalCode" with value "90001"
    And I fill element using css "#BillingNewAddress_PhoneNumber" with value "5551234567"
    And I select option "United States" from element using css "#BillingNewAddress_CountryId"
    And I click element using css "button:has-text('Continue'):near(#billing-buttons-container)"
    When I click element using css "input[name='shippingoption']:first-child"
    And I click element using css "button:has-text('Continue'):near(#shipping-method-buttons-container)"
    When I click element using css "input[name='paymentmethod']:first-child"
    And I click element using css "button:has-text('Continue'):near(#payment-method-buttons-container)"
    When I fill element using css "#CardholderName" with value "Test User"
    And I fill element using css "#CardNumber" with value "4111111111111111"
    And I select option "12" from element using css "#ExpireMonth"
    And I select option "2027" from element using css "#ExpireYear"
    And I fill element using css "#CardCode" with value "123"
    And I click element using css "button:has-text('Continue'):near(#payment-info-buttons-container)"
    When I click element using css "button:has-text('Confirm')"
    Then I should see element using css ".order-total" to be visible
