const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const File = require('./libs/main/file');
let file = new File();

const menuTemplate = require('./menuTemplate');

function createWindow () {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'Editor',
		webPreferences: {
			nodeIntegration: true
		}
	});

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// DEV: reload on ctrl+r
	globalShortcut.register('CommandOrControl+R', function() {
		win.reload();
	});

	//DEV: open dev tools on launch 
	win.webContents.openDevTools();
}

app.on('ready', () => {
	createWindow();

	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu)
});

ipcMain.on('newFolder', (sender, name) => {
	file.createFolder(name);
});

ipcMain.on('newFile', (sender, name) => {
	file.createFile(name);
})