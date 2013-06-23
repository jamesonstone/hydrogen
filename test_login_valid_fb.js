/**
 * tools: casperjs/phantomjs
 *
 * This test uses a non-premium facebook user login
 * Note: FB user has already been auth approved (in the Voxy/BF handshake)
 *
 * @author J.Stone
 */

var x = require('casper').selectXPath;
var casper = require('casper').create();
var login = 'http://voxy.com/';

console.log('1.Navigate to /u/login');
console.log('2.Login with valid facebook username');
console.log('[user:bhfgbpp_wisemansen_1372020624@tfbnw.net/pwd:things28]');
console.log('3.Check to see if Guide is displayed');

casper.start(login, function() {
	//this.clear();
	this.click(x('//*[@id="header_login_Btn"]'));
});

casper.wait(1000, function() {
	this.click(x('//*[@id="header_login"]/ul/li[2]/a'));
});

casper.wait(1000, function() {
	this.echo(this.getCurrentUrl());
	//fill out and submit login form
	this.fill('form#login_form', {
		'username':    'bhfgbpp_wisemansen_1372020624@tfbnw.net',
		'password':    'things28'
	}, true);
});

casper.wait(1000, function() {
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
