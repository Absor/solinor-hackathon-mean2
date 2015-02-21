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
var Imagemin = require('imagemin');

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

var Crawler = (function(url,id) {
  var crawl = function(cb) {
    phantom.create(function (ph) {
     ph.createPage(function (page) {
        page.open(url, function (status) {
          var info = {};
          page.set('viewportSize', {width:1500,height:1500}, function() {
            setTimeout(renderPage,1200,page);
          });
          
          function renderPage(page) {
            page.render("screenshot-" + id + ".jpg", function() {
              evaluatePage(page);
              
            });
            
          }




          function evaluatePage() {
            var evalInfo = page.evaluate(function() {



              function mostPopularFont() {
                var fonts = [];
                var colors = [];
                var mostPopularColor;
                var mostPopularFont;
                var elements = document.getElementsByTagName('*');
                console.log(elements);
                var skipElements = ["SCRIPT", "HTML", "HEAD", "META", "TITLE", "LINK"];
                for (var i = 0; i < elements.length; i++) {
                  var currentElement = elements[i];
                  if (skipElements.indexOf(currentElement.nodeName) >= 0) continue;
                  console.log(currentElement.nodeName);
                  var textInElement = "";
                  for (var ii = 0; ii < currentElement.childNodes.length; ii++) {
                    var currentNode = currentElement.childNodes[ii];
                    if (currentNode.nodeName === "#text") {
                      var text = currentNode.innerText || currentNode.textContent;
                      textInElement += text;
                    }
                  }
                  textInElement = textInElement.replace(/\s/g, "");//Remove whitespace
                  if (textInElement.length === 0) continue;
                  var elementFont = window.getComputedStyle(currentElement).getPropertyValue('font-family');
                  var elementColor = window.getComputedStyle(currentElement).getPropertyValue('color');
                  if (colors[elementColor] === undefined) {
                    colors[elementColor] = 0;
                  }
                  colors[elementColor] += textInElement.length;
                  if (mostPopularColor === undefined || colors[elementColor] > colors[mostPopularColor]) {
                    mostPopularColor = elementColor;
                  }
                  if (fonts[elementFont] === undefined) {
                    fonts[elementFont] = 0;
                  }
                  fonts[elementFont] += textInElement.length;
                  if (mostPopularFont === undefined || fonts[elementFont] > fonts[mostPopularFont]) {
                    mostPopularFont = elementFont;
                  }
                }
                return mostPopularFont;
              }


              var evalInfo = {};
              evalInfo['title'] = document.title;
              evalInfo['fontFamily'] = mostPopularFont();
              //evalInfo['fontFamily'] = window.getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('font-family');
              evalInfo['isUsingJquery'] = typeof(jQuery) == 'function';

              evalInfo['colours'] = null;
              

              var images = document.getElementsByTagName('img');
              evalInfo['logo'] = null;
              for (var i = 0; i < images.length; i++) {
                var image = images[i]
                if (image.src.indexOf('logo') != -1) {
                  evalInfo['logo'] = image.src;
                  break;
                }
              };

              var excludeThese = ['page','document','window','_phantom','callPhantom','phantom','global','require','WebPage','SVGTextElement','frames','HTMLBodyElement','Int8Array','onpageshow','ArrayBuffer','onseeking','menubar','onended','onsuspend','pageXOffset','length','CSSPrimitiveValue','DOMStringList','frameElement','SVGNumberList','HTMLMenuElement','NodeFilter','MouseEvent','TextEvent','onreset','HTMLQuoteElement','onwebkitanimationiteration','WebKitPoint','HTMLIsIndexElement','XMLHttpRequestUpload','CSSCharsetRule','HTMLAppletElement','HTMLCollection','statusbar','XMLHttpRequestException','HTMLStyleElement','ondragleave','SVGFEColorMatrixElement','DOMException','HTMLFrameSetElement','clientInformation','SVGPathSegClosePath','localStorage','onhashchange','SVGTransformList','onloadedmetadata','HTMLUListElement','CharacterData','name','ondragstart','HTMLLegendElement','XPathResult','HTMLPreElement','onkeydown','onwebkitanimationstart','CanvasGradient','SVGFontFaceFormatElement','SVGGlyphElement','ondblclick','SVGTextPositioningElement','CSSRuleList','onmousemove','WebKitTransitionEvent','outerHeight','styleMedia','SQLException','ondragend','history','SVGUnitTypes','top','SVGPathSegLinetoVerticalAbs','SVGMatrix','parent','DOMTokenList','CanvasRenderingContext2D','TextMetrics','ClientRectList','HTMLButtonElement','onunload','HTMLMapElement','onpagehide','scrollY','RGBColor','oninvalid','Plugin','SVGFESpotLightElement','CSSStyleSheet','ondrag','MessagePort','Attr','EntityReference','HTMLTableCaptionElement','HTMLObjectElement','self','HTMLMeterElement','PageTransitionEvent','MutationEvent','SVGDocument','pageYOffset','HTMLInputElement','screenLeft','SVGAnimatedLength','onkeyup','SVGPathSegMovetoAbs','HTMLScriptElement','SVGPathSegList','onmousewheel','ImageData','SVGAnimatedNumber','SVGAnimatedEnumeration','SVGDescElement','SVGFEFuncGElement','onstorage','webkitURL','HTMLOListElement','HTMLCanvasElement','CSSFontFaceRule','XMLDocument','SVGMaskElement','HTMLBRElement','CSSStyleRule','SVGZoomEvent','HTMLFontElement','HTMLTitleElement','Node','HTMLTableSectionElement','Text','onclick','HTMLOptionElement','File','onvolumechange','StyleSheetList','Range','SVGUseElement','WebKitBlobBuilder','onmouseover','SVGAnimatedInteger','Float32Array','HTMLAnchorElement','innerHeight','onplaying','CanvasPattern','CSSMediaRule','SVGViewElement','SVGLengthList','HTMLEmbedElement','NodeList','SVGMarkerElement','DataView','MessageChannel','onmouseup','WebKitAnimationEvent','SVGColor','HTMLParamElement','offscreenBuffering','HashChangeEvent','HTMLTextAreaElement','onratechange','SVGAltGlyphElement','locationbar','SVGLength','BeforeLoadEvent','KeyboardEvent','SVGFontFaceNameElement','MimeTypeArray','HTMLAllCollection','ondragover','SVGPolygonElement','HTMLDivElement','HTMLBaseElement','SVGTSpanElement','HTMLBaseFontElement','SVGFESpecularLightingElement','SVGTRefElement','SVGFEConvolveMatrixElement','onsubmit','HTMLIFrameElement','HTMLBlockquoteElement','SVGPreserveAspectRatio','HTMLLIElement','ontouchstart','webkitNotifications','SVGAngle','SVGPathSegCurvetoQuadraticRel','SVGFETileElement','location','onstalled','scrollbars','HTMLMarqueeElement','SVGPaint','FileReader','Entity','onprogress','onwaiting','HTMLModElement','HTMLFormElement','SVGPathSegLinetoHorizontalAbs','opener','ontimeupdate','onfocus','outerWidth','onplay','HTMLHeadElement','ondurationchange','oncanplay','onemptied','SVGSVGElement','MimeType','DOMSettableTokenList','CDATASection','closed','event','DOMParser','CSSValueList','navigator','screen','FileList','sessionStorage','SVGPathSegCurvetoCubicSmoothRel','ProcessingInstruction','ononline','SVGStopElement','oncontextmenu','SVGPathSegArcAbs','RangeException','onoffline','WheelEvent','onresize','Storage','SVGFECompositeElement','innerWidth','Rect','SVGFEPointLightElement','SVGFEFuncBElement','MessageEvent','StorageEvent','HTMLElement','onsearch','onseeked','Counter','SVGPathSegCurvetoCubicRel','NamedNodeMap','HTMLOptGroupElement','HTMLHeadingElement','Worker','SVGPathSegLinetoVerticalRel','ondragenter','SVGFEBlendElement','onmessage','onblur','ontouchend','HTMLParagraphElement','SVGAnimatedNumberList','SVGElement','HTMLFieldSetElement','SVGAnimateColorElement','SVGComponentTransferFunctionElement','ondrop','SVGRect','SVGDefsElement','personalbar','HTMLSelectElement','SVGCursorElement','OverflowEvent','XPathException','oncanplaythrough','ProgressEvent','status','onselect','onpause','Int32Array','HTMLFrameElement','CSSRule','devicePixelRatio','CSSStyleDeclaration','SVGVKernElement','WebKitCSSTransformValue','HTMLTableRowElement','HTMLDirectoryElement','SVGTitleElement','SVGSymbolElement','HTMLKeygenElement','SVGFEFuncRElement','Option','SVGEllipseElement','Image','onloadeddata','WebKitCSSKeyframesRule','SVGLinearGradientElement','scrollX','onwebkittransitionend','screenY','onkeypress','WebSocket','toolbar','SVGTextContentElement','HTMLAreaElement','Event','screenTop','SVGFontFaceUriElement','SVGAnimatedAngle','Element','SVGScriptElement','SVGSetElement','Uint8Array','SVGStyleElement','HTMLOutputElement','SVGAnimatedString','DocumentType','TouchEvent','crypto','ontouchmove','UIEvent','EventException','defaultStatus','SVGPathSegCurvetoCubicSmoothAbs','onwebkitanimationend','screenX','SVGPathSegArcRel','SVGPolylineElement','SVGAnimateTransformElement','SVGFEDiffuseLightingElement','SVGTransform','SVGPathSegCurvetoQuadraticSmoothAbs','HTMLHRElement','CSSImportRule','defaultstatus','DocumentFragment','Int16Array','applicationCache','CSSPageRule','onload','onerror','SVGLineElement','XPathEvaluator','SVGImageElement','EventSource','onchange','Uint32Array','SVGFontFaceSrcElement','SVGFEGaussianBlurElement','SVGPathElement','MediaList','console','onabort','onbeforeunload','oninput','onloadstart','onmousedown','onmouseout','onpopstate','onscroll','ontouchcancel','StyleSheet','CSSValue','DOMImplementation','Document','Comment','Notation','HTMLDocument','HTMLDListElement','HTMLHtmlElement','HTMLImageElement','HTMLLabelElement','HTMLLinkElement','HTMLMetaElement','HTMLProgressElement','HTMLTableCellElement','HTMLTableColElement','HTMLTableElement','DOMStringMap','Uint16Array','WebKitCSSKeyframeRule','WebKitCSSMatrix','Clipboard','Blob','XMLSerializer','XMLHttpRequest','SharedWorker','PluginArray','ClientRect','SVGAElement','SVGAnimatedBoolean','SVGAnimatedLengthList','SVGAnimatedPreserveAspectRatio','SVGAnimatedRect','SVGAnimatedTransformList','SVGCircleElement','SVGClipPathElement','SVGElementInstance','SVGElementInstanceList','SVGException','SVGGElement','SVGGradientElement','SVGMetadataElement','SVGNumber','SVGPathSeg','SVGPathSegCurvetoCubicAbs','SVGPathSegCurvetoQuadraticAbs','SVGPathSegCurvetoQuadraticSmoothRel','SVGPathSegLinetoAbs','SVGPathSegLinetoHorizontalRel','SVGPathSegLinetoRel','SVGPathSegMovetoRel','SVGPatternElement','SVGPoint','SVGPointList','SVGRadialGradientElement','SVGRectElement','SVGRenderingIntent','SVGStringList','SVGSwitchElement','SVGTextPathElement','SVGAnimateElement','SVGFontElement','SVGFontFaceElement','SVGHKernElement','SVGMissingGlyphElement','SVGForeignObjectElement','SVGFEComponentTransferElement','SVGFEDisplacementMapElement','SVGFEDistantLightElement','SVGFEDropShadowElement','SVGFEFloodElement','SVGFEFuncAElement','SVGFEImageElement','SVGFEMergeElement','SVGFEMergeNodeElement','SVGFEMorphologyElement','SVGFEOffsetElement','SVGFETurbulenceElement','SVGFilterElement','FormData','FileError'];
              // var excludeThese = [];

              var windowKeys = Object.keys(window).filter(function(a) { return excludeThese.indexOf(a) == -1; });
              evalInfo['windowKeys'] = windowKeys;

              var scripts = document.getElementsByTagName('script');
              evalInfo['scriptlist'] = [];
              for (var i = scripts.length - 1; i >= 0; i--) {
                if (typeof(scripts[i].src) == 'string' && scripts[i].src != '') {
                  var script = scripts[i].src.split('/');
                  script = script[script.length-1];
                  evalInfo['scriptlist'].push(script);
                }
              };
            
              var cssFiles = document.getElementsByTagName('link');
              evalInfo['stylelist'] = [];
              for (var i = cssFiles.length - 1; i >= 0; i--) {
                if (typeof(cssFiles[i].href) == 'string' && cssFiles[i].rel == 'stylesheet' && cssFiles[i].href != '') {
                  var css = cssFiles[i].href.split('/');
                  css = css[css.length-1];
                  evalInfo['stylelist'].push(css);
                }
              };

              return evalInfo;
            }, function(res) {
              page.close();
              cb(res);
            // phantom.exit();
            });
          }
          
        });
      });
    });
  }

  return {
    crawl: crawl
  }

});

module.exports = Crawler; 