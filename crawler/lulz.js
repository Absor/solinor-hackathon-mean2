/* var page = require('webpage').create();
var url = "http://www.flowfestival.com/"
page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });

  var logo = page.evaluate(function() {
  	var images = document.getElementsByTagName('img');

  	for (var i = images.length - 1; i >= 0; i--) {
  		var image = images[i]
  		if (image.src.indexOf('logo') != -1) {
  			return image.src;
  		}
  	};
	return null;
  });

  var isjQueryUsed = page.evaluate(function() {
  	return typeof(jQuery) == 'function'
  })

  var globalVariables = page.evaluate(function() {
  	return Object.keys( window );
  })


  var scriptList = page.evaluate(function() {
    var scripts = document.getElementsByTagName('script');
    var list = [];
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (typeof(scripts[i].src) == 'string') {
        list.push(scripts[i].src);
      }
    };
    return list;
  });

  console.log("status: " + status);
  console.log('Page title is ' + title);
  console.log('Logo URL is ' + logo);
  console.log('jQuery is used: ' + isjQueryUsed);
  console.log("List javascript files: ");
  console.log(scriptList);


  page.render('yle.png');
  //console.log('Global variables: ');
  //console.log(globalVariables);
  phantom.exit();
}); */


var phantom = require('phantom');

/* phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://www.google.com", function (status) {
      console.log("opened google? ", status);
      page.evaluate(function () { return document.title; }, function (result) {
        console.log('Page title is ' + result);
        ph.exit();
      });
    });
  });
});*/

var Crawler = (function(url) {
  var crawl = function(cb) {
    phantom.create(function (ph) {
     ph.createPage(function (page) {
        page.open(url, function (status) {
          var title = page.evaluate(function() {
            return document.title;
          }, function(res) {
            cb(res);
            // phantom.exit();
          });
        });
      });
    });
  }

  var testi = function(callback) {
    console.log(typeof(callback));
    callback("asd");
  }

  return {
    crawl: crawl
  }

});

module.exports = Crawler; 