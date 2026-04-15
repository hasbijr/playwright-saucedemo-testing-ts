Feature: Purchase Flow

  Background:
    Given I am on the login page
    And I login as "validUser"

  Scenario: Verify inventory page and sorting
    Then I should be redirected to the inventory page
    When I sort products by "Price (high to low)"
    Then the first item price should be higher than the second

  Scenario: Successful product purchase with tax validation
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    And I click on the checkout button
    And I fill in checkout information with "John" "Doe" "12345"
    Then I should see the checkout overview
    And the total price should be correctly calculated with tax
    When I click the finish button
    Then I should see "Thank you for your order!" success message
