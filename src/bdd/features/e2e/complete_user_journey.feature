@bdd
Feature: Complete User Journey

  @bdd1
  Scenario: Complete user journey from registration to order completion
    Given I go to url "https://nop-qa.portnov.com/register"
    When I fill element using css "#FirstName" with value "TestUser"
    And I fill element using css "#LastName" with value "TestLastName"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I fill element using css "#ConfirmPassword" with value "Test123!"
    And I click element using css "#register-button"
    Then I should see element using css ".result" inner text contains "completed"
    And I should see element using css ".header-links a.ico-account" to be visible
    When I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    Then I should see element using css ".product-name h1" to be visible
    When I click element using css "#add-to-cart-button-4"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".qty-input" with value "2"
    And I click element using css "button[name='updatecart']"
    When I click element using css "#termsofservice"
    And I click element using css "#checkout"
    When I fill element using css "#BillingNewAddress_FirstName" with value "John"
    And I fill element using css "#BillingNewAddress_LastName" with value "Doe"
    And I fill element using css "#BillingNewAddress_Email" with value "testuser@example.com"
    And I fill element using css "#BillingNewAddress_City" with value "Los Angeles"
    And I fill element using css "#BillingNewAddress_Address1" with value "123 Test Street"
    And I fill element using css "#BillingNewAddress_ZipPostalCode" with value "90001"
    And I fill element using css "#BillingNewAddress_PhoneNumber" with value "5551234567"
    And I select option "United States" from element using css "#BillingNewAddress_CountryId"
    And I click element using css "button[onclick='Billing.save()']"
    When I click element using css "input[name='shippingoption']:first-child"
    And I click element using css "button[onclick='ShippingMethod.save()']"
    When I click element using css "input[name='paymentmethod']:first-child"
    And I click element using css "button[onclick='PaymentMethod.save()']"
    When I fill element using css "#CardholderName" with value "Test User"
    And I fill element using css "#CardNumber" with value "4111111111111111"
    And I select option "12" from element using css "#ExpireMonth"
    And I select option "2027" from element using css "#ExpireYear"
    And I fill element using css "#CardCode" with value "123"
    And I click element using css "button[onclick='PaymentInfo.save()']"
    When I click element using css "button[onclick='ConfirmOrder.save()']"
    Then I should see element using css ".section.order-completed" to be visible
    And I should see element using css ".order-number" to be visible
    When I go to url "https://nop-qa.portnov.com/customer/info"
    And I go to url "https://nop-qa.portnov.com/customer/orders"
    Then I should see element using css ".order-list" to be visible
    When I go to url "https://nop-qa.portnov.com"
    And I click element using css "a[href*='/logout']"
    Then I should see element using css "a[href*='/login']" to be visible
