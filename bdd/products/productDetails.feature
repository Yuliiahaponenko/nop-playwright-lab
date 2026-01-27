@bdd
Feature: Product Details

  @bdd1
  Scenario: View product details from product list
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    Then I should see element using css ".product-name h1" to be visible
    And I should see element using css ".product-price span" to be visible
    And I should see element using css ".picture img" to be visible
    And I should see element using css "#add-to-cart-button" to be visible

  @bdd2
  Scenario: Verify product SKU and stock availability
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    Then I should see element using css ".sku" to be visible
    And I should see element using css ".stock" to be visible

  @bdd3
  Scenario: Verify product description and specifications
    Given I go to url "https://nop-qa.portnov.com/computers"
    When I click element using css ".product-item:first-child .product-title a"
    Then I should see element using css ".product-name h1" to be visible
    And I should see element using css ".product-price span" to be visible
