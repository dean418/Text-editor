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

	async createFolder() {
		let projectPath = await this.getFolder();
		fs.mkdir(projectPath + "/new-project-folder", (err) => {
			if (err) throw err
		});
		webContents.getAllWebContents()[1].send("new-project-folder", projectPath + "/new-project-folder");
	}
}

module.exports = File;