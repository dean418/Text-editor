class Keypress {
	constructor() {
	}

	backspace(focusedLine, linePosition, lines) {
		if (focusedLine.innerText == "" && focusedLine.parentElement.id != 1) {
			return this.removeLine(focusedLine, lines);
		} else {
			focusedLine.textContent = linePosition.left.substr(0, linePosition.left.length - 1) + linePosition.right;
			return focusedLine;
		}
	}

	delete(focusedLine, linePosition, lines) {
		if (focusedLine.innerText == "" && focusedLine.parentElement.id != lines.length) {
			return this.removeLine(focusedLine, true);
		} else 
			linePosition.right = linePosition.right.substr(1, linePosition.right.length);
			focusedLine.textContent = linePosition.left + linePosition.right;

			return {
				left: linePosition.left,
				right: linePosition.right
			}
		}

		

	removeLine(focusedLine, lines, del) {
		let currentLine = focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);

		if (del) {
			let nextLine = currentLineId;
			lines[nextLine].remove();
			lines.splice(nextLine, 1);
		} else {
			let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index
			currentLine.remove(); // remove from DOM
			focusedLine = lines[previousLine].childNodes[1];
			lines.splice(currentLineId - 1, 1); // remove from arrayw
		}
		// sortLineNumbers();
		return focusedLine
	}

	upArrow(focusedLine, lines) {
		let lineNum = focusedLine.parentElement.id;
		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			focusedLine = lines[prevLine - 1].childNodes[1]
		}

		return focusedLine;
	}

	downArrow(focusedLine, lines, container) {
		let lineNum = focusedLine.parentElement.id;
		if (lineNum != container.childElementCount) {
			focusedLine = lines[lineNum].childNodes[1];
		}

		return focusedLine;
	}

	addSpaces(focusedLine, linePosition, space) {
		focusedLine.innerText = linePosition.left;
		focusedLine.innerHTML += space;
		focusedLine.innerHTML += linePosition.right;
		return focusedLine;
	}
}

module.exports = Keypress;