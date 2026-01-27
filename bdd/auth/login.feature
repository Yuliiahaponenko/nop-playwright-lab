@bdd
Feature: User Login

  @bdd1
  Scenario: Login with valid credentials
    Given I go to url "https://nop-qa.portnov.com"
    When I click element using css "a[href='/login']"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I click element using css "button[type='submit'].login-button"
    Then I should see element using css "a[href='/customer/info']" to be visible
    And I should see element using css "a[href='/customer/info']" inner text contains "testuser@example.com"

  @bdd2
  Scenario: Login with remember me checked
    Given I go to url "https://nop-qa.portnov.com"
    When I click element using css "a[href='/login']"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I click element using css "#RememberMe"
    And I click element using css "button[type='submit'].login-button"
    Then I should see element using css "a[href='/customer/info']" to be visible

  @bdd3
  Scenario: Login with invalid email
    Given I go to url "https://nop-qa.portnov.com/login"
    When I fill element using css "#Email" with value "invalid@example.com"
    And I fill element using css "#Password" with value "password123"
    And I click element using css "button[type='submit'].login-button"
    Then I should see element using css ".message-error" inner text contains "Login was unsuccessful"

  @bdd4
  Scenario: Login with invalid password
    Given I go to url "https://nop-qa.portnov.com/login"
    When I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "wrongpassword"
    And I click element using css "button[type='submit'].login-button"
    Then I should see element using css ".message-error" inner text contains "Login was unsuccessful"

  @bdd5
  Scenario: Login with empty credentials
    Given I go to url "https://nop-qa.portnov.com/login"
    When I fill element using css "#Email" with value ""
    And I fill element using css "#Password" with value ""
    And I click element using css "button[type='submit'].login-button"
    Then I wait for any element using css ".validation-summary-errors, .field-validation-error" to be visible
