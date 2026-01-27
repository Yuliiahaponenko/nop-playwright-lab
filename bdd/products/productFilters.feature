@bdd
Feature: Product Filters

  @bdd1
  Scenario: Apply price range filter
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I fill element using css "#PriceFrom" with value "500"
    And I fill element using css "#PriceTo" with value "1000"
    And I click element using css "button:has-text('Filter')"
    Then I wait for any element using css ".product-item" to be visible
    When I click element using css "button:has-text('Clear')"
    Then I wait for any element using css ".product-item" to be visible

  @bdd2
  Scenario: Apply multiple filters
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I fill element using css "#PriceFrom" with value "100"
    And I fill element using css "#PriceTo" with value "500"
    And I click element using css "button:has-text('Filter')"
    Then I wait for any element using css ".product-item" to be visible
