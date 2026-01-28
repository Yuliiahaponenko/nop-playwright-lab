@bdd
Feature: Product Filters

  @bdd1
  Scenario: Filter products by price range
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    Then I wait for any element using css ".product-item" to be visible
    When I go to url "https://nop-qa.portnov.com/notebooks?price=1000-1500"
    Then I wait for any element using css ".product-item" to be visible

  @bdd2
  Scenario: Filter products by manufacturer
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    Then I wait for any element using css ".product-item" to be visible
    When I go to url "https://nop-qa.portnov.com/apple"
    Then I wait for any element using css ".product-item" to be visible

  @bdd3
  Scenario: Sort products by price ascending
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    Then I wait for any element using css ".product-item" to be visible
    When I select option "Price: Low to High" from element using css "#products-orderby"
    Then I wait for any element using css ".product-item" to be visible

  @bdd4
  Scenario: Sort products by name
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    Then I wait for any element using css ".product-item" to be visible
    When I select option "Name: A to Z" from element using css "#products-orderby"
    Then I wait for any element using css ".product-item" to be visible
