class UI {
	constructor() {
		this.path = '';
		this.structure;
		this.focused;
		this.dirContent = document.getElementById('dirContent');
	}

	clearStructure() {
		while(this.dirContent.childNodes[4]) {
			this.dirContent.removeChild(this.dirContent.childNodes[4]);
		}
	}

	createTemplate(name, isFile, isProjectFolder) {
		let file;
		let icon = document.createElement('div');
		let title = document.createElement('div');

		if(isFile || isProjectFolder) {
			file = document.createElement('li');
			file.setAttribute('data-path', this.focused)
		} else {
			file = document.createElement('ul');
			file.setAttribute('data-path', this.focused + '/' + name)
		}

		file.classList.add('file');
		icon.classList.add('icon');
		title.classList.add('title');

		title.appendChild(document.createTextNode(name));

		file.appendChild(icon);
		file.appendChild(title);

		return file;
	}

	createFolder(name, isProjectFolder, FSObject) {
		let folder = this.createTemplate(name, false, isProjectFolder);
		folder.onclick = this.setFocused.bind(this, [FSObject]);
		dirContent.appendChild(folder);
	}

	createFile(name, FSObject) {

		let file = this.createTemplate(name, true);
		file.onclick = this.setFocused.bind(this, [FSObject]);
		dirContent.appendChild(file);
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

	setFocused(FSObject) {
		this.focused = FSObject[0];
	}
}

module.exports = UI;