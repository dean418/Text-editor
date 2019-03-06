const Line = require('./line');

class Keypress extends Line {
	constructor() {
		super({...line});
	}

	backspace(linePosition) {
		if (line.focusedLine.innerText == "" && line.focusedLine.parentElement.id != 1) {
			return this.removeLine(line.focusedLine);
		} else {
			line.focusedLine.textContent = linePosition.left.substr(0, linePosition.left.length - 1) + linePosition.right;
			return line.focusedLine;
		}
	}

	delete(linePosition) {
		if (line.focusedLine.innerText == "" && line.focusedLine.parentElement.id != line.lines.length) {
			return this.removeLine(true);
		} else {
			linePosition.right = linePosition.right.substr(1, linePosition.right.length);
			line.focusedLine.textContent = linePosition.left + linePosition.right;

			return {
				left: linePosition.left,
				right: linePosition.right
			}
		}
	}

	removeLine(del) {
		let currentLine = line.focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);

		if (del) {
			let nextLine = currentLineId;
			line.lines[nextLine].remove();
			line.lines.splice(nextLine, 1);
		} else {
			let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index
			currentLine.remove(); // remove from DOM
			line.focusedLine = line.lines[previousLine].childNodes[1];
			line.lines.splice(currentLineId - 1, 1); // remove from arrayw
		}
		line.sortLineNumbers();
		return line.focusedLine
	}

	upArrow() {
		let lineNum = line.focusedLine.parentElement.id;
		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			line.focusedLine = line.lines[prevLine-1].childNodes[1]
		}
		// return line.focusedLine;
	}

	downArrow() {
		let lineNum = line.focusedLine.parentElement.id;
		// if not last line
		if (lineNum != editor.container.childElementCount) {
			line.focusedLine = line.lines[lineNum].childNodes[1];
		}

		// return line.focusedLine;
	}

	addSpaces(linePosition, space) {
		line.focusedLine.innerText = linePosition.left;
		line.focusedLine.innerHTML += space;
		line.focusedLine.innerText += linePosition.right;
		return focusedLine
	}
}

module.exports = Keypress;