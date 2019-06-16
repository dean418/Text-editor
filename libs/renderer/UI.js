class UI {
	constructor() {
		this.path = '';
		this.structure = {};
		this.focused;
		this.dirContent = document.getElementById('dirContent');
	}

	clearStructure() {
		while(this.dirContent.childNodes[4]) {
			this.dirContent.removeChild(this.dirContent.childNodes[4]);
		}
	}

	createTemplate(name, path) {
		let file = document.createElement('div');
		let icon = document.createElement('div');
		let title = document.createElement('div');

		file.classList.add('file');
		icon.classList.add('icon');
		title.classList.add('title');

		title.appendChild(document.createTextNode(name));

		file.appendChild(icon);
		file.appendChild(title);

		file.setAttribute('data-path', path)

		return file;
	}

	createFolder(name) {
		let folder = this.createTemplate(name, this.focused);
		folder.onclick = this.setFocused.bind(this, [folder, name, false]);
		dirContent.appendChild(folder);
	}

	createFile(name) {
		let file = this.createTemplate(name, this.focused);
		file.onclick = this.setFocused.bind(this, [file, name, true]);
		dirContent.appendChild(file)
	}

	showNameInput(type) {
		nameInput.style.display = 'block';
		fieldName.focus();
		nameInput.setAttribute('data-type', type);
	}

	clearInput() {
		event.preventDefault();

		let name = fieldName.value;

		fieldName.value = '';
		nameInput.style.display = 'none';

		return name;
	}

	setFocused(file) {
		let path = file[0].dataset.path;
		let name = file[1];
		let isFile = file[2];

		path = path + "/" + name;
		if(isFile) {
			// set the focused property to the files parent
			path = path.substr(0, path.lastIndexOf('/'));
			
		}
		this.focused = path;
	}
}

module.exports = UI;