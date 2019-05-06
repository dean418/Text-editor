class UI {
	constructor() {
		this.dirContent = document.getElementById("dirContent");
	}

	clearStructure() {
		/* remove current 
		project folder when new one is added*/
	}

	createFolder() {
		let file = document.createElement("div");
		let icon = document.createElement("div");
		let title = document.createElement("div");

		file.classList.add("file");
		icon.classList.add("icon");
		title.classList.add("title");

		title.appendChild(document.createTextNode("new-project-folder"));

		file.appendChild(icon);
		file.appendChild(title);
		this.dirContent.appendChild(file);
	}
}

module.exports = UI;