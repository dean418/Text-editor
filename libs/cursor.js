const Editor = require('./editor');

class Cursor extends Editor {
	constructor(lines) {
		super();
		this.cursor;
		this.lines = lines;
	}

	createCursor(focusedLine) {
		let cursor = document.createElement("span");

		cursor.id = "cursor";
		this.cursor = cursor;
		focusedLine.innerHTML += cursor.outerHTML;
	}

	addCursor(focusedLine, linePosition) {
		focusedLine.innerText = linePosition.left;
		focusedLine.innerHTML += this.cursor.outerHTML;
		focusedLine.innerHTML += linePosition.right;
	}

	removePrevLineCursor(focusedLine, direction) {
		let currentLine = focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);
		let previousLine = 0;

		if (direction === "up") {
			previousLine = currentLineId;
		} else if (direction === "down") {
			previousLine = currentLineId - 2;
		}

		let prevLineNodes = this.lines[previousLine].childNodes[1].childNodes
		for (let i = 0; i < prevLineNodes.length; i++) {
			if (prevLineNodes[i].tagName !== undefined && prevLineNodes[i].tagName.toLowerCase() == "span") {
				prevLineNodes[i].remove();
			}
		}
	}
}


module.exports = Cursor;