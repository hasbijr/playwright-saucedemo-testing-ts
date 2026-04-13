Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
    And I should see "Products" header

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I login with "locked_out_user" and "secret_sauce"
    Then I should see an error message
