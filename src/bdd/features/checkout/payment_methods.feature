@bdd
Feature: Checkout Payment Methods

  Background:
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I click element using css "#termsofservice"
    And I click element using css "#checkout"
    And I click element using css "#checkout-as-guest"

  @bdd1
  Scenario: Select credit card payment method
    When I fill element using css "#BillingNewAddress_FirstName" with value "John"
    And I fill element using css "#BillingNewAddress_LastName" with value "Doe"
    And I fill element using css "#BillingNewAddress_Email" with value "john@example.com"
    And I fill element using css "#BillingNewAddress_City" with value "New York"
    And I fill element using css "#BillingNewAddress_Address1" with value "123 Main St"
    And I fill element using css "#BillingNewAddress_ZipPostalCode" with value "10001"
    And I fill element using css "#BillingNewAddress_PhoneNumber" with value "5551234567"
    And I select option "United States" from element using css "#BillingNewAddress_CountryId"
    And I click element using css "button[onclick='Billing.save()']"
    When I wait for any element using css "input[name='shippingoption']" to be visible
    And I click element using css "input[name='shippingoption']:first-child"
    And I click element using css "button[onclick='ShippingMethod.save()']"
    Then I wait for any element using css "input[name='paymentmethod']" to be visible
    When I click element using css "input[value='Payments.Manual']"
    And I click element using css "button[onclick='PaymentMethod.save()']"
    Then I should see element using css "#CardholderName" to be visible

  @bdd2
  Scenario: Select check/money order payment
    When I fill element using css "#BillingNewAddress_FirstName" with value "Jane"
    And I fill element using css "#BillingNewAddress_LastName" with value "Smith"
    And I fill element using css "#BillingNewAddress_Email" with value "jane@example.com"
    And I fill element using css "#BillingNewAddress_City" with value "Boston"
    And I fill element using css "#BillingNewAddress_Address1" with value "456 Oak Ave"
    And I fill element using css "#BillingNewAddress_ZipPostalCode" with value "02101"
    And I fill element using css "#BillingNewAddress_PhoneNumber" with value "5559876543"
    And I select option "United States" from element using css "#BillingNewAddress_CountryId"
    And I click element using css "button[onclick='Billing.save()']"
    When I wait for any element using css "input[name='shippingoption']" to be visible
    And I click element using css "input[name='shippingoption']:first-child"
    And I click element using css "button[onclick='ShippingMethod.save()']"
    When I wait for any element using css "input[name='paymentmethod']" to be visible
    And I click element using css "input[value='Payments.CheckMoneyOrder']"
    And I click element using css "button[onclick='PaymentMethod.save()']"
    Then I should see element using css ".payment-info" to be visible
