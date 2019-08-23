# Slot game example using Protractor
This is my solution for slot game (game itself is not attached) using Protractor framework.

Solution will execute couple of tests:
1. Verifies whether game is opened
2. Checks if reels are spinning
3. Checks if balance is updated after spin
4. Checks in case of win proper message is shown for all possible win combinations
5. Checks that player will get random win
6. Check that in case of no win message is not shown
7. Check that in case of no balance reels won't spin

## Setup:
* Install [Node](http://nodejs.org)
* Clone the project: git clone 'projectUrl'
* Navigate inside the project and execute `npm i` to install the project dependencies
* Install Protractor `npm install -g protractor` 
* Install webdriver-manager `webdriver-manager update` 
* Install Jasmine data provider `npm install jasmine-data-provider`  

## Run tests:
* run tests via plain Protractor: Navigate to project folder and execute `protractor conf.js`

## Troubleshooting
* run `node -v` and make sure your node version is 8.x.x or greater
* `webdriver-manager` _should_ have updated on install, but if not, run `npm run update` to be sure
