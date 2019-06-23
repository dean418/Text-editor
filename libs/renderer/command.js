const {ipcRenderer} = require('electron');
const path = require('path');

const FSObject = require('./FSObject');

class Command {
	constructor(ui) {
		this.ui = ui;
	}

	newProjectFolder(filePath) {
		let projectFolder = new FSObject.ProjectFolder({path: filePath});
		ui.clearStructure();
		
		this.ui.structure = projectFolder;
		this.ui.path = filePath;
		this.ui.focused = projectFolder;
		
		ui.createFolder('new-project-folder', true, projectFolder);
	}

	newFile(name) {
		let filePath = path.join(this.ui.focused.path, name);
		let file = new FSObject.File({path: filePath, parent: this.ui.focused});

		this.ui.focused.structure[filePath] = file;
		this.ui.focused = file.parent;

		ui.createFile(name, file.parent);
		ipcRenderer.send('newFile', name);
	}

	newFolder(name) {
		let filePath = path.join(this.ui.focused.path, name);
		let folder = new FSObject.Folder({path: filePath, parent: this.ui.focused});

		this.ui.focused.structure[filePath] = folder;
		this.ui.focused = folder;

		ui.createFolder(name, false, folder);
		ipcRenderer.send('newFolder', name);
	}

	deleteFile() {}

	deleteFolder() {}

	saveFile(file) {}
}

module.exports = Command;