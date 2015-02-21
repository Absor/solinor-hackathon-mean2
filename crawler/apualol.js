var cr = require('./lulz.js');
var fs = require('fs');
var async = require('async');
// var ce = require('colour-extractor');
var ColorThief = require('color-thief');

console.log("ahoy");
console.log(typeof(ce));

var list = [];

<<<<<<< HEAD
var limit = 100;
=======
var limit = 30;
var colorThief = new ColorThief();
>>>>>>> a27cd943ab3042eb7ddd583e1410246969e09dec
var current = 0;

fs.readFile('../client/sites.txt', { encoding: 'utf8' }, function (err, data) {
  if (err) throw err;
  data = data.split('\n', limit);
  /* data.forEach(function(url) {
  	console.log(url);
  	doSomething(url);
  }); */

  for (var i = data.length - 1; i >= 0; i--) {
  	if (data[i].indexOf('http://') == -1 && data[i].indexOf('https://') == -1) {
  		data[i] = 'http://' + data[i];
  	}
  };
  console.log("töiden määrä: " + data.length);
  async.series(data.map(function(url) {
  	return function(callback) {
  		doSomething(url, function(res) {
  			callback(null,res);
  		});
  	}
  }), function(err, results) {
  	console.log(JSON.stringify(results));
  	fs.writeFile('results.json', JSON.stringify(results));
  });
});

var id = 1;

function doSomething(url,cb) {
	console.log("Going to: " + url);
	var haha = new cr(url,id);
	id++;

	haha.crawl(function(res) {
		console.log(res);
		res['id'] = id - 1;
		res['url'] = url;
		res['colours'] = null;
		/*ce.topColours('screenshot-' + res['id'] + '.png', true, function (colours) {
              res['colours'] = colours;
              cb(res);
        }); */
        res['colours'] = colorThief.getPalette('screenshot-' + res['id'] + '.png', 5);
        console.log(res['colours']);
        cb(res);
		
		
	});
}