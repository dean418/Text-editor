const Line = require('./line');
const Cursor = require('./cursor');

class Editor {

	constructor() {
		this.container = document.getElementById('editorContainer');
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
		leftLinePos = leftLinePos.replace(removeSpace, '');
		rightLinePos = rightLinePos.replace(removeSpace, '');

		return {
			left: leftLinePos,
			right: rightLinePos
		}
	}

	updateLine() {
		this.focusedLine.classList.add('focused');
		this.focusedLineCpy.classList.remove('focused');
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
			focusedLine.parentNode.insertBefore(line, focusedLine.nextSibling);
		}

		this.sortLineNumbers();
		return line.childNodes[1];
	}

	addCursor() {
		this.focusedLine.textContent = this.linePosition.left;
		this.focusedLine.innerHTML += this.cursor.outerHTML;
		this.focusedLine.innerHTML += this.linePosition.right;
	}

	checkCounter() {
		if (this.cursorCounter > this.focusedLine.textContent.length) {
			this.cursorCounter = this.focusedLine.textContent.length;
		}
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

	scroll(isNegative) {
		let height = getComputedStyle(editor.focusedLine).height;
		height = parseInt(height, 10);
	
		if (isNegative) {
			window.scrollBy(0, -height);
		} else {
			window.scrollBy(0, height);
		}
	}

	removePrevLineCursor() {
		let prevLineNodes = this.focusedLineCpy.childNodes;

		for (let i = 0; i < prevLineNodes.length; i++) {
			if (prevLineNodes[i].tagName !== undefined && prevLineNodes[i].tagName == 'SPAN') {
				prevLineNodes[i].remove();
			}
		}
	}

	isOutOfView(direction) {
		let bounding = editor.focusedLine.getBoundingClientRect();
	
		if (direction == 'down') {
			if (bounding.bottom + 48 < window.innerHeight) {
				return false;
			} else {
				return true;
			}
		} else {
			if (bounding.top <= 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	handleSpace() {
		this.linePosition = this.updatePosition();
		this.addCursor();
	}

	handleArrowUpDown(direction) {
		this.removePrevLineCursor(direction);
		this.linePosition = this.updatePosition();
		this.addCursor(this.linePosition);
	}
	
	handleArrowLeftRight() {
		this.linePosition = this.updatePosition();
		this.addCursor(this.linePosition);
	}
}

module.exports = Editor;
