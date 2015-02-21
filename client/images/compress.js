var Imagemin = require('imagemin');

var imagemin = new Imagemin().src("*").dest('compressed/').use(Imagemin.jpegtran({progressive: true}));
imagemin.run(function(err,files) { console.log("error: " + err);console.log("compressed files: " + files) });