*** Settings ***
Resource    ../resources/common.resource

*** Test Cases ***
Valid Login
    Open Finance App
    Login With Valid Credentials
    Wait Until Page Contains Element    accessibility_id=homeScreen
