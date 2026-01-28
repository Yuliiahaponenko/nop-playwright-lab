@bdd
Feature: Product Search

  @bdd1
  Scenario: Search product by valid keyword
    Given I go to url "https://nop-qa.portnov.com"
    When I fill element using css "#small-searchterms" with value "laptop"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible
    And I should see element using css ".product-title" to be visible

  @bdd2
  Scenario: Search with multiple keywords
    Given I go to url "https://nop-qa.portnov.com"
    When I fill element using css "#small-searchterms" with value "computer"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible
    When I go to url "https://nop-qa.portnov.com"
    And I fill element using css "#small-searchterms" with value "phone"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible

  @bdd3
  Scenario: Search with invalid keyword shows no results
    Given I go to url "https://nop-qa.portnov.com"
    When I fill element using css "#small-searchterms" with value "xyzabc123nonexistent"
    And I click element using css "button[type='submit'].search-box-button"
    Then I should see element using css ".search-results" to be visible

  @bdd4
  Scenario: Verify product details in search results
    Given I go to url "https://nop-qa.portnov.com"
    When I fill element using css "#small-searchterms" with value "laptop"
    And I click element using css "button[type='submit'].search-box-button"
    Then I wait for any element using css ".product-item" to be visible
    And I should see element using css ".product-title" to be visible
    And I should see element using css ".prices" to be visible
