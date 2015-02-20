var cr = require('./lulz.js');

var haha = new cr("http://flowfestival.com/");

haha.crawl(function(res) {
	console.log('go!');
	console.log(res);
});