class UI {
	constructor() {
		this.path = '';
		this.structure = {}
		this.dirContent = document.getElementById('dirContent');
	}

	clearStructure() {
		while(this.dirContent.childNodes[4]) {
			this.dirContent.removeChild(this.dirContent.childNodes[4]);
		}
	}

	createTemplate(name) {
		let file = document.createElement('div');
		let icon = document.createElement('div');
		let title = document.createElement('div');

		file.classList.add('file');
		icon.classList.add('icon');
		title.classList.add('title');

		title.appendChild(document.createTextNode(name));

		file.appendChild(icon);
		file.appendChild(title);

		return file;
	}

	createFolder(name) {
		let folder = this.createTemplate(name);
		dirContent.appendChild(folder)
	}

	createFile(name) {
		let file = this.createTemplate(name);
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
}

module.exports = UI;