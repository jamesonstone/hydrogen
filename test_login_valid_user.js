/**
 * tools: casperjs/phantomjs
 *
 * This test uses a non-premium user to login
 * and check that the guide page loads correctly
 *
 * @author J.Stone
 */

var x = require('casper').selectXPath;
var casper = require('casper').create();
var login = 'http://voxy.com/u/login/';

console.log('1.Navigate to /u/login');
console.log('2.Login with valid username [user:u1@voxy.com/pwd:things]');
console.log('3.Check to see if Guide is displayed');

casper.start(login, function() {
	//fill out and submit login form
	this.fill('form#ajax-login-form', {
		'username':    'u1@voxy.com',
		'password':    'things'
	}, true);
});

casper.then(function() {
	var check_url = this.getCurrentUrl();
	this.echo('current url: ' + check_url);

	//check for the substring "guide/recommend/" in the url
	if(check_url.indexOf("guide/recommend/") === -1) {
		casper.test.fail('url does not contain guide/recommend/');
	} else {
		casper.test.pass('Guide is displayed');
	}
});


casper.run(function() {
	this.test.renderResults(true);
});
