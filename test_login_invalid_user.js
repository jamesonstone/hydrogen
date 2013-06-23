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
	this.echo(this.getCurrentUrl());
	this.fill('form#ajax-login-form', {
		'username':    'voxytest',
		'password':    'things'
	}, true);
});

casper.then(function() {
	this.test.assertEquals(this.getCurrentUrl(), login, 'current url and login page url match');

	//add better logic to ensure error text is displayed with invalid username
	
	this.test.assertExists(x('//*[@id="body"]/div[2]/div/div/div/div/ul/li/text()'));
});


casper.run(function() {
	this.test.renderResults(true);
});
