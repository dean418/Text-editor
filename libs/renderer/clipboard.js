const {clipboard} = require("electron");

class Clipboard {
	constructor() {

	}

	getClipboardData() {
		let availableFormats = clipboard.availableFormats();
		let clipboardData = '';

		if (availableFormats.indexOf("text/plain") > -1) {
			clipboardData = clipboard.readText();
		}
		return clipboardData;
	}
}

module.exports = Clipboard;