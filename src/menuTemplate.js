const File = require('../libs/main/file');

let file = new File();

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{label: 'New file'},
			{	
				label: 'New project folder',
				async click() {
					await file.createFolder();
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