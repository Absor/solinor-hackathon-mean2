
var blocks = [
{
	id: 1,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
	font: 'Arial Black',
},
{
	id: 2,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
	font: 'Trebuchet MS',
},

{
	id: 3,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
	font: 'Comic Sans',
},
{
	id: 4,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
	font: 'Helvetica',
},

{
	id: 5,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
},

{
	id: 6,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
	font: 'Tahoma',
},
]

console.log(blocks);

function appendBlocks() {

	for (var i = 0; i < blocks.length; i++) {
		$('#square-grid').append('<div id="square-'+ blocks[i].id +'" class="square"></div>');

		var cur = $('#square-' + blocks[i].id);
		cur.append('<img class="website-screenshot" src="'+ blocks[i].screenshot + '" />');
		cur.append('<h2>' + blocks[i].title + '</h2>');
		cur.append('<img class="website-logo" src="'+ blocks[i].logo + '" />');
		cur.append('<p>' + blocks[i].url + '</p>');

		cur.append('<p class="website-font">This is the font used by the website!</p>');
		cur.children('.website-font').css('font-family', blocks[i].font);

		cur.append('<div class="website-colors"></div>');

		var colors = $('#square-' + blocks[i].id + ' .website-colors');
		
		for (var j = 0; j < blocks[i].colors.length; j++) {
			var color = blocks[i].colors[j]
			colors.append('<div class="color"></div>');
			colors.children().last().css('background-color', color);
		};
	};
	

}

