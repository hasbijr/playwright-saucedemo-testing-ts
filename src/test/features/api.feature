Feature: API Testing

  Scenario: Verify GET request to JSONPlaceholder
    Given I send a GET request to "https://jsonplaceholder.typicode.com/posts/1"
    Then the response status should be 200
    And the response body should contain title "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"

  Scenario: Verify POST request to JSONPlaceholder
    Given I send a POST request to "https://jsonplaceholder.typicode.com/posts" with title "foo" and body "bar"
    Then the response status should be 201
    And the response body should contain the sent title and body
    And the response body should contain id 101

  Scenario: Verify PUT request to JSONPlaceholder
    Given I send a PUT request to "https://jsonplaceholder.typicode.com/posts/1" with title "Updated Title"
    Then the response status should be 200
    And the response body should contain title "Updated Title"

  Scenario: Verify DELETE request to JSONPlaceholder
    Given I send a DELETE request to "https://jsonplaceholder.typicode.com/posts/1"
    Then the response status should be 200
