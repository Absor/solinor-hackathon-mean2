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

var libraries = {
  jQuery: function() {
    return typeof(jQuery) == 'function';
  }
}

var Crawler = (function(url) {
  var crawl = function(cb) {
    phantom.create(function (ph) {
     ph.createPage(function (page) {
        page.open(url, function (status) {
          var info = {};
          page.set('viewportSize', {width:640,height:480}, function() {
            page.render(url.substring(url.indexOf('://')+3,url.length-1) + ".png");
          });
          
          var evalInfo = page.evaluate(function() {
            var evalInfo = {};
            evalInfo['title'] = document.title;
            evalInfo['isUsingJquery'] = typeof(jQuery) == 'function';

            var images = document.getElementsByTagName('img');
            evalInfo['logo'] = null;
            for (var i = images.length - 1; i >= 0; i--) {
              var image = images[i]
              if (image.src.indexOf('logo') != -1) {
                evalInfo['logo'] = image.src;
                break;
              }
            };


            var scripts = document.getElementsByTagName('script');
            evalInfo['scriptlist'] = [];
            for (var i = scripts.length - 1; i >= 0; i--) {
              if (typeof(scripts[i].src) == 'string' && scripts[i].src != '') {
                evalInfo['scriptlist'].push(scripts[i].src);
              }
            };
            
            var cssFiles = document.getElementsByTagName('link');
            evalInfo['stylelist'] = [];
            for (var i = cssFiles.length - 1; i >= 0; i--) {
              if (typeof(cssFiles[i].href) == 'string' && cssFiles[i].rel == 'stylesheet' && cssFiles[i].href != '') {
                evalInfo['stylelist'].push(cssFiles[i].href);
              }
            };

            return evalInfo;
          }, function(res) {
            cb(res);
            // phantom.exit();
          });
        });
      });
    });
  }

  return {
    crawl: crawl
  }

});

module.exports = Crawler; 