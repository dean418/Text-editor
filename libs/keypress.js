class Keypress {
	constructor(editor) {
		this.editor = editor;
	}

	enter() {
		let focusedLine = this.editor.addLine();
		return focusedLine;
	}

	backspace(focusedLine) {
		// if no char and the line num != 1, delete line
		if (focusedLine.innerHTML == "" && focusedLine.parentElement.id != 1) {
			let currentLine = focusedLine.parentElement;
			let currentLineId = parseInt(currentLine.id);
			let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index

			currentLine.remove(); // remove from DOM
			focusedLine = this.editor.lines[previousLine].childNodes[1];
			
			this.editor.lines.splice(currentLineId - 1, 1); // remove from array
			this.editor.sortLineNumbers();
			
			return focusedLine;
		}
		// remove last character
		else {
			let string = focusedLine.innerHTML;
			// if last character is a space
			if (string.substr(string.length -5) == "nbsp;") {
				string = string.replace(/&nbsp;+$/, '');
			} else {
				string = string.substr(0, string.length - 1)
			}
			focusedLine.innerHTML = string;
			return focusedLine;
		}
	}

	upArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;
		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			focusedLine = editor.lines[prevLine-1].childNodes[1]
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