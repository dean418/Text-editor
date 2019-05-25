const {ipcRenderer} = require('electron');

class FS {
	constructor() {}

	newFile(name) {
		ipcRenderer.send('newFile', name);
	}

	newFolder(name) {
		ipcRenderer.send('newFolder', name);
	}

	deleteFile() {}

	deleteFolder() {}

	saveFile(file) {}
}

module.exports = FS;