const Line = require('./line');

class Cursor extends Line {
	constructor() {
		super({...line});
		this.cursor;
	}

	createCursor() {
		let cursor = document.createElement("span");

		cursor.id = "cursor";
		this.cursor = cursor;
		line.focusedLine.innerHTML += cursor.outerHTML;
	}

	addCursor(linePosition) {
		line.focusedLine.innerText = linePosition.left;
		line.focusedLine.innerHTML += this.cursor.outerHTML;
		line.focusedLine.innerHTML += linePosition.right;
	}

	removePrevLineCursor(direction) {
		/*
			indexes off?
		*/
		let currentLine = line.focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);
		let previousLine = 0;

		if (direction === "up") {
			previousLine = currentLineId;
		} else if (direction === "down") {
			previousLine = currentLineId - 2;
		}

		let prevLineNodes = line.lines[previousLine].childNodes[1].childNodes;
		// console.log(prevLineNodes)

		for (let i = 0; i < prevLineNodes.length; i++) {
			if (prevLineNodes[i].tagName !== undefined && prevLineNodes[i].tagName == "SPAN") {
				prevLineNodes[i].remove();
			}
		}
	}
}


module.exports = Cursor;