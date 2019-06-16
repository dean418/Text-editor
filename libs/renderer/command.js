const {ipcRenderer} = require('electron');
const ProjectFolder = require('./FSObject');

class Command {
	constructor(ui) {
		this.ui = ui;
	}

	newProjectFolder(path) {
		this.ui.structure[path] = new ProjectFolder(path);
		this.ui.path = path;
		this.ui.focused = path;
		ui.clearStructure();
		ui.createFolder('new-project-folder');
	}

	newFile(name) {
		ipcRenderer.send('newFile', name);
		ui.createFile(name)
	}

	newFolder(name) {
		ipcRenderer.send('newFolder', name);
		ui.createFolder(name)
	}

	deleteFile() {}

	deleteFolder() {}

	saveFile(file) {}
}

module.exports = Command;