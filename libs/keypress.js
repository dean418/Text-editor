class Keypress {
	constructor(editor) {
		this.editor = editor;
	}

	enter(focusedLine) {
		focusedLine = this.editor.addLine(null, focusedLine);
		return focusedLine;
	}

	backspace(focusedLine) {
		console.log(focusedLine)
		// if no char and the line num != 1, delete line
		if (focusedLine.innerHTML == "" && focusedLine.parentElement.id != 1) {
			return this.removeLine(focusedLine);
		}
		// remove last character
		else {
			let lineContent = focusedLine.innerText;

			focusedLine.innerText = this.removeLastChar(lineContent);
			return focusedLine;
		}
	}

	removeLine(focusedLine) {
		let currentLine = focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);
		let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index

		currentLine.remove(); // remove from DOM
		focusedLine = this.editor.lines[previousLine].childNodes[1];

		this.editor.lines.splice(currentLineId - 1, 1); // remove from array
		this.editor.sortLineNumbers();

		return focusedLine
	}

	removeLastChar(lineContent) {
		// if last character is a space
		if (lineContent.substr(lineContent.length - 5) == "nbsp;") {
			lineContent = lineContent.replace(/&nbsp;+$/, '');
		} else {
			lineContent = lineContent.substr(0, lineContent.length - 1)
		}
		return lineContent
	}

	upArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;
		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			focusedLine = editor.lines[prevLine - 1].childNodes[1]
		}
		return focusedLine;
	}

	downArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;

		// if not last line
		if (lineNum != editor.container.childElementCount) {
			focusedLine = editor.lines[lineNum].childNodes[1];
		}
		return focusedLine;
	}


}

module.exports = Keypress;