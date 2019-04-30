const File = require('../libs/file');

let file = new File();

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{label: 'New file'},
			{	
				label: 'New project folder',
				async click() {
					console.log(await file.createFolder())
				}
			},

			{type: 'separator'},

			{label: 'Open file'},
			{label: 'Open folder'},

			{type: 'separator'}
		
		]
	},
	{
		label: 'Edit',
		submenu: [
			{label: 'Copy'},
			{label: 'Paste'}
		]
	}
]

module.exports = menuTemplate;