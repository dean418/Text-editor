const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

const menuTemplate = require('./src/menuTemplate');

function createWindow () {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Editor",
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.webContents.openDevTools();

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

app.on('ready', () => {
	createWindow();

	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu)
});