Feature: Logout Functionality

  Scenario: Successful logout through Sidebar
    Given I am on the login page
    And I login as "validUser"
    When I logout from the application
    Then I should be redirected to the login page
