var cr = require('./lulz.js');
var fs = require('fs');
var async = require('async');

var list = [];

var limit = 50;
var current = 0;

fs.readFile('../client/sites.txt', { encoding: 'utf8' }, function (err, data) {
  if (err) throw err;
  data = data.split('\n', limit);
  /* data.forEach(function(url) {
  	console.log(url);
  	doSomething(url);
  }); */

  async.series(data.map(function(url) {
  	return function(callback) {
  		doSomething(url, function() {
  			callback(null,null);
  		});
  	}
  }));
});

function doSomething(url,cb) {
	console.log("Going to: " + url);
	var haha = new cr(url);

	haha.crawl(function(res) {
		console.log(res);
		cb(res);
	});
}