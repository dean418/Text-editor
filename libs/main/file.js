const {dialog, webContents} = require('electron');
const fs = require('fs');

class File {
	constructor() {
	}

	getFolder() {
		return new Promise((resolve) => {
			dialog.showOpenDialog({properties: ['openDirectory']}, (directory) => {
				console.log(directory[0])
				resolve(directory[0]);
			});
		})	
	}

	async newProjectFolder() {
		let projectPath = await this.getFolder();
		fs.mkdir(projectPath + '/new-project-folder', (err) => {
			if (err) throw err
		});
		webContents.getAllWebContents()[1].send('newProjectFolder', projectPath + '/new-project-folder');
	}

	createFile(name) {
		console.log('creating new file')
		//create file at current path
	}

	createFolder(name) {
		console.log('creating new folder')
	}
}

module.exports = File;