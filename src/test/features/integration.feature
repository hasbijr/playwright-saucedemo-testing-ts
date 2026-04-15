Feature: UI-API Integration

  Scenario: Verify UI product catalog matches master product data
    Given I am on the login page
    And I login as "validUser"
    Then all products on the UI should match the master data source
