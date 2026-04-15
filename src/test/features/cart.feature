Feature: Cart Management

  Background:
    Given I am on the login page
    And I login as "validUser"

  Scenario: Verify cart badge count updates when adding multiple items
    Then I should see the cart count as 0
    When I add the "first" product to the cart
    Then I should see the cart count as 1
    When I add the "second" product to the cart
    Then I should see the cart count as 2

  Scenario: Successful multi-product purchase with dynamic total validation
    When I add the "first" product to the cart
    And I add the "second" product to the cart
    And I navigate to the cart page
    And I click on the checkout button
    And I fill in checkout information with "Jane" "Smith" "54321"
    Then I should see the checkout overview
    And the total price should be correctly calculated with tax
    When I click the finish button
    Then I should see "Thank you for your order!" success message
