@bdd
Feature: Product Details

  @bdd1
  Scenario: View product detail page
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    Then I should see element using css ".product-name h1" to be visible
    And I should see element using css ".product-price" to be visible
    And I should see element using css "#add-to-cart-button-4" to be visible

  @bdd2
  Scenario: Verify product description and specifications
    Given I go to url "https://nop-qa.portnov.com/apple-macbook-pro-13-inch"
    Then I should see element using css ".product-name h1" to be visible
    And I should see element using css ".short-description" to be visible
    And I should see element using css ".full-description" to be visible

  @bdd3
  Scenario: Navigate to product from category page
    Given I go to url "https://nop-qa.portnov.com/notebooks"
    When I wait for any element using css ".product-item" to be visible
    And I click element using css ".product-item:first-child .product-title a"
    Then I should see element using css ".product-name h1" to be visible
    And I should see element using css "#add-to-cart-button-4" to be visible
