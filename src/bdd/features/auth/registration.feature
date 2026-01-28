@bdd
Feature: User Registration

  @bdd1
  Scenario: Register new user successfully
    Given I go to url "https://nop-qa.portnov.com/register"
    When I fill element using css "#FirstName" with value "TestUser"
    And I fill element using css "#LastName" with value "TestLastName"
    And I fill element using css "#Email" with value "testuser@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I fill element using css "#ConfirmPassword" with value "Test123!"
    And I click element using css "#register-button"
    Then I should see element using css ".result" inner text contains "completed"
    And I should see element using css ".header-links a.ico-account" to be visible

  @bdd2
  Scenario: Register new user with female gender
    Given I go to url "https://nop-qa.portnov.com/register"
    When I click element using css "#gender-female"
    And I fill element using css "#FirstName" with value "TestUser"
    And I fill element using css "#LastName" with value "TestLastName"
    And I fill element using css "#Email" with value "testuser2@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I fill element using css "#ConfirmPassword" with value "Test123!"
    And I click element using css "#register-button"
    Then I should see element using css ".result" inner text contains "completed"

  @bdd3
  Scenario: Register without newsletter subscription
    Given I go to url "https://nop-qa.portnov.com/register"
    When I fill element using css "#FirstName" with value "TestUser"
    And I fill element using css "#LastName" with value "TestLastName"
    And I fill element using css "#Email" with value "testuser3@example.com"
    And I fill element using css "#Password" with value "Test123!"
    And I fill element using css "#ConfirmPassword" with value "Test123!"
    And I click element using css "#Newsletter"
    And I click element using css "#register-button"
    Then I should see element using css ".result" inner text contains "completed"
