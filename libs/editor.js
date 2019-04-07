const Line = require('./line');
const Cursor = require('./cursor');

class Editor {

	constructor() {
		this.container = document.getElementById("editorContainer");
		this.lines = [];
		this.cursorCounter = 0;
		this.cursor = new Cursor().cursor;
		this.focusedLine = this.addLine();
		this.focusedLineCpy = this.focusedLine;
		this.linePosition = this.updatePosition();
	}

	updatePosition() {
		let lineText = this.focusedLine.textContent;
		let leftLinePos = lineText.substring(0, this.cursorCounter);
		let rightLinePos = lineText.substring(this.cursorCounter, lineText.length);
		
		let removeSpace = /(\r\n|\n|\r|u21b5)/gm;
		leftLinePos = leftLinePos.replace(removeSpace, "");
		rightLinePos = rightLinePos.replace(removeSpace, "");

		return {
			left: leftLinePos,
			right: rightLinePos
		}
	}

	updateLine() {
		this.focusedLine.classList.add("focused");
		this.focusedLineCpy.classList.remove("focused");
	}

	addLine() {
		let line = new Line().line;
		let lineId;

		if (typeof (this.focusedLine) == 'undefined') {
			lineId = 1;
		} else {
			lineId = parseInt(this.focusedLine.parentElement.id);
		}

		if (lineId == this.lines.length || this.lines.length == 0) {
			this.lines.push(line);
			this.container.appendChild(line)
		} else {
			this.lines.splice(lineId, 0, line);
			let focusedLine = this.focusedLine.parentNode;
			focusedLine.parentNode.insertBefore(line, focusedLine.nextSibling)
		}

		this.sortLineNumbers();
		return line.childNodes[1];
	}

	sortLineNumbers() {
		let lineNumber = 1;

		for (let line of this.lines) {
			line.id = lineNumber;
			line.childNodes[0].textContent = lineNumber;
			lineNumber += 1;
		}
		lineNumber = 1;
	}

	addCursor() {
		this.focusedLine.textContent = this.linePosition.left;
		this.focusedLine.innerHTML += this.cursor.outerHTML;
		this.focusedLine.innerHTML += this.linePosition.right;
	}

	removePrevLineCursor(direction) {
		let currentLine = this.focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);
		let previousLine = 0;

		if (direction === "up") {
			previousLine = currentLineId;
		} else if (direction === "down") {
			previousLine = currentLineId -2;
		}

		let prevLineNodes = this.lines[previousLine].childNodes[1].childNodes;

		for (let i = 0; i < prevLineNodes.length; i++) {
			if (prevLineNodes[i].tagName !== undefined && prevLineNodes[i].tagName == "SPAN") {
				prevLineNodes[i].remove();
			}
		}
	}
}

module.exports = Editor;