require("babel-register")({
    presets: [ 'es2015' ]
});


exports.config = {

    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/slotGameSpec.js'],
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.sleep(500);
        browser.resetUrl = 'file:///';
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    }
};