class Keypress {
	constructor(line, editor) {
		this.line = line;
		this.editor = editor;
	}

	backspace(focusedLine, linePosition) {
		if (focusedLine.innerText == "" && focusedLine.parentElement.id != 1) {
			return this.removeLine(focusedLine);
		} else {
			focusedLine.textContent = linePosition.left.substr(0, linePosition.left.length - 1) + linePosition.right;
			return focusedLine;
		}
	}

	delete(focusedLine, linePosition) {
		if (focusedLine.innerText == "" && focusedLine.parentElement.id != line.lines.length) {
			return this.removeLine(focusedLine, true);
		} else {
			linePosition.right = linePosition.right.substr(1, linePosition.right.length);
			focusedLine.textContent = linePosition.left + linePosition.right;

			return {
				left: linePosition.left,
				right: linePosition.right
			};
		}
	}

	removeLine(focusedLine, del) {
		let currentLine = focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);

		if (del) {
			let nextLine = currentLineId;
			console.log(this.line.lines[nextLine])
			this.line.lines[nextLine].remove();
			this.line.lines.splice(nextLine, 1);
		} else {
			let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index
			currentLine.remove(); // remove from DOM
			focusedLine = this.line.lines[previousLine].childNodes[1];
			this.line.lines.splice(currentLineId - 1, 1); // remove from arrayw
		}
		this.line.sortLineNumbers();
		return focusedLine
	}

	upArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;
		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			focusedLine = line.lines[prevLine - 1].childNodes[1]
		}
		return focusedLine;
	}

	downArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;

		// if not last line
		if (lineNum != editor.container.childElementCount) {
			focusedLine = line.lines[lineNum].childNodes[1];
		}

		return focusedLine;
	}

	addSpaces(focusedLine, linePosition, space) {
		focusedLine.innerText = linePosition.left;
		focusedLine.innerHTML += space;
		focusedLine.innerText += linePosition.right;
		return focusedLine
	}
}

module.exports = Keypress;