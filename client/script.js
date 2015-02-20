
var blocks = [
{
	id: 1,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
},
{
	id: 2,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
},

{
	id: 3,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
},
{
	id: 4,
	title: 'Google',
	url: 'www.google.fi',
	screenshot: '1-screenshot.png',
	logo: '1-logo.png',
	colors: ['#123456', '#AABBCC', '#FFDEAD'],
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
},
]

console.log(blocks);

function appendBlocks() {

	for (var i = 0; i < blocks.length; i++) {
		$('#square-grid').append('<div id="square-'+ blocks[i].id +'" class="square"></div>');

		var cur = $('#square-' + blocks[i].id);
		cur.append('<img class="website-screenshot" src="'+ blocks[i].screenshot + '" />');
		cur.append('<p>' + blocks[i].title + '</p>');
		cur.append('<img class="website-logo" src="'+ blocks[i].logo + '" />');
		cur.append('<p>' + blocks[i].url + '</p>');
		cur.append('<div class="website-colors"></div>');

		var colors = $('#square-' + blocks[i].id + '.website-colors');
		console.log('colors: ' + blocks[i].colors);
		for (var j = 0; j < blocks[i].colors.length; j++) {
			var color = blocks[i].colors[j]
			colors.append('<div class="color"></div>').css('background-color', blocks[i].colors[j]);
		};
	};
	

}

