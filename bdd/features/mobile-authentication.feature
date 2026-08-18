Feature: Mobile authentication

  Scenario: Successful login
    Given the user is on the login screen
    When valid credentials are entered
    Then the home screen should be displayed

  Scenario: Invalid login
    Given the user is on the login screen
    When invalid credentials are entered
    Then an error message should be displayed
