const {dialog} = require('electron');
const fs = require('fs');

class File {
	constructor() {
	}

	getFolder() {
		return new Promise((resolve) => {
			dialog.showOpenDialog({properties: ['openDirectory']}, directory => {
				resolve(directory[0]);
			});
		})	
	}

	getFile() {

	}

	async createFolder() {
		let projectPath = await this.getFolder();
		fs.mkdir(projectPath + "/new-project-folder", (err) => {
			if (err) throw err
		})
	}

	createFile() {

	}
}

module.exports = File;