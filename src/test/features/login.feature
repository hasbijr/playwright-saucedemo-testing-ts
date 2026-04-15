Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login as "validUser"
    Then I should be redirected to the inventory page
    And I should see "Products" header

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I login as "invalidUser"
    Then I should see an error message
