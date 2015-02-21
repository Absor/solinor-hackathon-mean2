var cr = require('./lulz.js');
var fs = require('fs');
var async = require('async');

// var ce = require('colour-extractor');
var ColorThief = require('color-thief');
var client = require('google-images');
var Imagemin = require('imagemin');

console.log("ahoy");
console.log(typeof(ce));

var list = [];

var limit = 40;
var current = 0;

fs.readFile('../client/sites.txt', { encoding: 'utf8' }, function (err, data) {
  if (err) throw err;
  data = data.split('\n', limit);
  /* data.forEach(function(url) {
  	console.log(url);
  	doSomething(url);
  }); */

  for (var i = data.length - 1; i >= 0; i--) {
  	if (data[i].indexOf('http://') == -1) {
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
  	var newresults = [];
  	for (var i = 0; i < results.length; i++) {
  		console.log(i);
  		var elem = results[i];
  		if (elem['logo'] === undefined || elem['logo'] === null || elem['logo'] === "" || elem['filterOut'] === true) {
  			console.log("filtered out");
  		} else {
  			newresults.push(elem);
  		}
  	}
  	console.log("number of results:", newresults.length);
  	fs.writeFile('results.json', JSON.stringify(newresults));
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
    var colorThief = new ColorThief();
        res['colours'] = colorThief.getPalette('screenshot-' + res['id'] + '.jpg', 5);
        /* client.search(res['title'] + " logo", function(err,images) {
        	if (images.length > 0) {
        		images[0].writeTo('logo-' + res['id'] + '.png', function() {
        		cb(res);
        	});
        	} else {
        		cb(res);
        	}
        	
        }); */
<<<<<<< HEAD
		if (fs.existsSync('screenshot-' + res['id'] + '.png')) {
		        res['colours'] = colorThief.getPalette('screenshot-' + res['id'] + '.png', 5);
        		console.log(res['colours']);
		} else {
			res['filterOut'] = true;
		}
        cb(res);
        
		var imagemin = new Imagemin().src("screenshot-" + res['id'] + ".jpg").dest('compressed/').use(Imagemin.jpegtran({progressive: true}));
      imagemin.run(function(err,files) { cb(res); });
		// cb(res);
        console.log(res['colours']);
        
		
		
	});
}
