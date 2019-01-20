const editor = require('./editor');

class Keypress {
	static enter() {
		let focusedLine = editor.addline();
		return focusedLine;
	}

	static backspace(focusedLine) {
		/* if there's no char and the line num != 1, delete line*/
		if (focusedLine.innerText == "" && focusedLine.parentElement.id != 1) {
			
			let currentLine = focusedLine.parentElement.id;
			currentLine = Number(currentLine);

			let previousLine = currentLine - 1;
			previousLine = previousLine.toString();

			focusedLine.parentElement.parentElement.removeChild(focusedLine.parentElement);

			focusedLine = document.getElementById(previousLine);
			focusedLine = focusedLine.getElementsByClassName("rowContent")[0];
			return focusedLine;
		}
		// remove last character
		else {
			let string = focusedLine.innerText;
			// if last character is a space
			if (string.substr(string.length -5) == "nbsp;") {
				string = string.replace(/&nbsp;+$/, '');
			} else {
				string = string.substr(0, string.length - 1)
			}
			focusedLine.innerText = string;
			return focusedLine;
		}
	}

	static upArrow(focusedLine) {
		let lineNum = focusedLine.parentElement.id;
		let rowContent = focusedLine;

		if (lineNum !== "1") {
			let prevLine = lineNum - 1;
			let prevLineId = prevLine.toString();
			focusedLine = document.getElementById(prevLineId);

			//if previous line is the first (hardcoded) get a different index
			if(prevLine != 1) {
				rowContent = focusedLine.childNodes[1];
			} else {
				rowContent = focusedLine.childNodes[3];
			}
		}
		return rowContent;
	}

	static downArrow() {
		let lineNum = focusedLine.parentElement.id;
		let rowContent = focusedLine;

		// if not last line
		if (lineNum != document.getElementById("editorContainer").childElementCount) {
			let nextLine = new Number(lineNum) + 1;
			let nextLineId = nextLine.toString()
			let line = document.getElementById(nextLineId);
			rowContent = line.childNodes[1];
		}
		return rowContent;
	}
}

module.exports = Keypress;