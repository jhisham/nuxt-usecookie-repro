# Issue
There is an inconsistency in behavior when using useCookie when trying to populate value from external API.
This repo has been created to reproduce the behavior.

3 scenarios have been setup for useCookie:
1. `useCookie()` set with local data (`httpOnly: true`)
2. `useCookie()` set with external data (`httpOnly` is not set which by default means `false`)
3. `useCookie()` set with external data (`httpOnly; true`)

## Expected behavior
Cookies should be set in the browser for all 3 scenarios.

## Actual behavior
Scenarios 1 and 2 pass. Cookies are set in the browser
Scenario 3 fails to set the cookie in the browser


# Steps to reproduce
The issue can be reproduced by cloning this repo and following the steps below:

## Install dependancies
```
yarn Install
```

## Run the server
```
yarn dev -o
```
*Note: Run the server either on localhost port 3000 or 3001 only or else you will not be able to access the API*

## Get data
Click on the `Get Token` button to get back a JWT token from the API.

*Note: the user and password to query has been setup so there's no need to enter anything on the frontend. But if for whatever reason you'd like to use another username, a list of available usernames is provided underneath the `Get Token` button. In the pages/index.vue file just change the username value to the username you want.*

## Open the Application tab
In the browser open up developer console and click on the *Application* tab. `token1` and `token2` should be in the list of cookies but `token3` is missing.
The cookie value is also logged to the console. All three tokens (`token1`, `token2`, and `token3` values) should be be printed out to the console to verify that all 3 tokens have value.