
var blocks = [
{
	id: 1,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.25], ['#AABBCC', 0.55], ['#FFDEAD', 0.20]],
	font: 'Arial Black',
},
{
	id: 2,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.25], ['#AABBCC', 0.55], ['#FFDEAD', 0.20]],
	font: 'Trebuchet MS',
},

{
	id: 3,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.25], ['#AABBCC', 0.55], ['#FFDEAD', 0.20]],
	font: 'Comic Sans',
},
{
	id: 4,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.25], ['#AABBCC', 0.55], ['#FFDEAD', 0.20]],
	font: 'Helvetica',
},

{
	id: 5,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.25], ['#AABBCC', 0.55], ['#FFDEAD', 0.20]],
	font: 'Helvetica',
},

{
	id: 6,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 7,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 8,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 9,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 10,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 11,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
{
	id: 12,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: [['#123456', 0.15], ['#AABBCC', 0.55], ['#FFDEAD', 0.25]],
	font: 'Tahoma',
},
]

console.log(blocks);

$(document).ready(function () {
	appendBlocks();
});

function appendBlocks() {

	for (var i = 0; i < blocks.length; i++) {
		$('#square-grid').append('<div id="square-'+ blocks[i].id +'" class="square"></div>');

		var cur = $('#square-' + blocks[i].id);
		cur.append('<div class="square-top"></div><div class="square-bottom"></div>');

		curTop = cur.children('.square-top');
		curBot = cur.children('.square-bottom');

		curTop.append('<img class="website-screenshot" src="'+ blocks[i].screenshot + '" />');
		//cur.append('<h2>' + blocks[i].title + '</h2>');
		curTop.append('<img class="website-logo" src="'+ blocks[i].logo + '" />');
		curTop.append('<p>' + blocks[i].url + '</p>');

		curTop.append('<p class="website-font">' + blocks[i].font + '</p>');
		curTop.children('.website-font').css('font-family', blocks[i].font);

		curBot.append('<div class="website-colors"></div>');

		var colors = $('#square-' + blocks[i].id + ' .website-colors');
		
		var max = 1;
		for (var j = 0; j < blocks[i].colors.length; j++) {
			var color = blocks[i].colors[j]
			colors.append('<div class="color"></div>');
			var percentage = Math.random() * max;

			max -= percentage;
			colors.children().last().css({'background-color': "#"+((1<<24)*Math.random()|0).toString(16), width: 350*percentage + 'px'});
		};
	};
	

}

