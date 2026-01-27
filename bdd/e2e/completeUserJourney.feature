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
    Then I should see element using css ".result" inner text contains "Your registration completed"
    And I should see element using css "a[href='/customer/info']" to be visible
    When I go to url "https://nop-qa.portnov.com/computers"
    Then I wait for any element using css ".product-item" to be visible
    When I go to url "https://nop-qa.portnov.com"
    And I fill element using css "#small-searchterms" with value "laptop"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible
    When I click element using css ".product-item:first-child .product-title a"
    Then I should see element using css ".product-name h1" to be visible
    When I click element using css "#add-to-cart-button"
    And I wait for any element using css ".bar-notification.success" to be visible
    And I go to url "https://nop-qa.portnov.com/cart"
    When I fill element using css ".cart-item-row:first-child input[type='number']" with value "2"
    And I click element using css "button:has-text('Update shopping cart')"
    When I click element using css "button:has-text('Checkout')"
    When I fill element using css "#BillingNewAddress_FirstName" with value "John"
    And I fill element using css "#BillingNewAddress_LastName" with value "Doe"
    And I fill element using css "#BillingNewAddress_Email" with value "testuser@example.com"
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
    Then I should see element using css ".page-title:has-text('Thank you')" to be visible
    And I should see element using css ".order-number" to be visible
    When I go to url "https://nop-qa.portnov.com/customer/info"
    And I go to url "https://nop-qa.portnov.com/customer/orders"
    Then I should see element using css ".order-list" to be visible
    When I go to url "https://nop-qa.portnov.com"
    And I click element using css "a[href='/logout']"
    Then I should see element using css "a[href='/login']" to be visible
