*** Settings ***
Library    AppiumLibrary

*** Variables ***
${APP_PACKAGE}    com.example.financeapp
${APP_ACTIVITY}   .MainActivity
${USERNAME}       demo-user
${PASSWORD}       Password123!

*** Keywords ***
Open Finance App
    Open Application    remote_url=http://localhost:4723/wd/hub
    ...    platformName=Android
    ...    automationName=UiAutomator2
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    deviceName=Pixel_5_Emulator

Login With Valid Credentials
    Input Text    accessibility_id=usernameInput    ${USERNAME}
    Input Text    accessibility_id=passwordInput    ${PASSWORD}
    Click Element    accessibility_id=loginButton
