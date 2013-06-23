/**
 * tools: casperjs/phantomjs
 *
 * This test uses the header login button to 
 * preform a valid login
 *
 * @author J.Stone
 */

var x = require('casper').selectXPath;
var casper = require('casper').create();
var login = 'http://voxy.com/';

console.log('1.Navigate to voxy.com');
console.log('2.Login with valid username from header');
console.log('  [user:u1@voxy.com/pwd:thing]');
console.log('3.Check to see if Guide is displayed');

casper.start(login, function() {
	this.click(x('//*[@id="header_login_Btn"]'));
});

casper.wait(1000, function() {
	//fill out and submit login form
	this.fill('form#header_login', {
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
