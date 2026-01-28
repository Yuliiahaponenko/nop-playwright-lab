@bdd
Feature: User Logout

  @bdd1
  Scenario: Logout successfully
    Given I go to url "https://nop-qa.portnov.com/login"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I click element using css "button[type='submit'].login-button"
    And I wait for any element using css ".header-links a.ico-account" to be visible
    When I click element using css "a[href*='/logout']"
    Then I should see element using css "a[href*='/login']" to be visible
    And I should see the page title contains "Your store"

  @bdd2
  Scenario: Verify protected pages inaccessible after logout
   Given I go to url "https://nop-qa.portnov.com/login"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I click element using css "button[type='submit'].login-button"
    And I wait for any element using css ".header-links a.ico-account" to be visible
    When I click element using css "a[href*='/logout']"
    And I go to url "https://nop-qa.portnov.com/customer/info"
    Then I should see the page url contains "/login"
