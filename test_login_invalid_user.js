/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to voxy.com/u/login/ ("login" page) and
 * attempts to login with an invalid email/password
 *
 * @author J.Stone
 */
var x = require('casper').selectXPath;
var casper = require('casper').create();
var login = 'http://voxy.com/u/login/';

console.log('1.Navigate to /u/login');
console.log('2.Login with invalid username [user: voxytest/pwd:things]');

casper.start(login, function() {
	this.echo('current url: ' + this.getCurrentUrl());

	//verify the error text isn't displayed before attempting to login
	this.test.assertTextDoesntExist('Please enter a correct username and password. ' +
	 'Note that both fields are case-sensitive.', 'error text is NOT displayed yet');
});

casper.then(function() {
	//fill out and submit login form
	this.fill('form#ajax-login-form', {
		'username':    'voxytest',
		'password':    'things'
	}, true);
});

casper.then(function() {
	this.test.assertEquals(this.getCurrentUrl(), login, 'current url and login page url match');

	//make sure error text is displayed
	this.test.assertTextExists('Please enter a correct username and password. ' +
	 'Note that both fields are case-sensitive.', 'error text is displayed');
	
	//verify xpath to error text
	this.test.assertExists(x('//*[@id="body"]/div[2]/div/div/div/div/ul/li'), 'xpath to error text ' +
	 'is correct');
});


casper.run(function() {
	this.test.renderResults(true);
});
