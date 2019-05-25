const Clipboard = require('./clipboard');

class Keypress {
	constructor() {
		this.clipboard = new Clipboard();
	}

	backspace() {
		if (editor.linePosition.left == '' && editor.focusedLine.parentElement.id != 1) {
			this.removeLine();
			editor.cursorCounter = editor.focusedLine.textContent.length;
			editor.focusedLine.textContent += editor.linePosition.right;
		} else {
			editor.focusedLine.textContent = editor.linePosition.left.substr(0, editor.linePosition.left.length - 1) + editor.linePosition.right;
			if(editor.linePosition.left !== ''){
				editor.cursorCounter--;
			}
		}
	}

	delete() {
		let parentElement = editor.focusedLine.parentElement.id
		if (editor.linePosition.right == '' && parentElement != editor.lines.length) {
			let lineContent = editor.lines[parentElement].childNodes[1].textContent;
			this.removeLine(true);
			editor.cursorCounter = editor.focusedLine.textContent.length;
			editor.focusedLine.textContent += lineContent;

		} else {
			editor.linePosition.right = editor.linePosition.right.substr(1, editor.linePosition.right.length);
			editor.focusedLine.textContent = editor.linePosition.left + editor.linePosition.right;
		}
	}

	removeLine(del) {
		let currentLine = editor.focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);

		if (del) {
			editor.lines[currentLineId].remove();
			editor.lines.splice(currentLineId, 1);
		} else {
			let previousLine = currentLineId - 2; // 1 for prev line, 1 for array index
			currentLine.remove(); // remove from DOM
			editor.focusedLine = editor.lines[previousLine].childNodes[1];
			editor.lines.splice(currentLineId - 1, 1); // remove from arrayw
		}
	}

	upArrow() {
		let lineNum = editor.focusedLine.parentElement.id;
		if (lineNum !== '1') {
			let prevLine = lineNum - 1;
			editor.focusedLine = editor.lines[prevLine - 1].childNodes[1]
		}
	}

	downArrow() {
		let lineNum = editor.focusedLine.parentElement.id;
		if (lineNum != editor.container.childElementCount) {
			editor.focusedLine = editor.lines[lineNum].childNodes[1];
		}
	}

	addSpaces(space) {
		editor.focusedLine.textContent = editor.linePosition.left;
		editor.focusedLine.textContent += space;
		editor.focusedLine.textContent += editor.linePosition.right;
	}

	paste() {
		let firstLine = true;
		let rightText = editor.linePosition.right;
		let clipboardData = this.clipboard.getClipboardData();
		clipboardData = clipboardData.split('\n');
	
		for (let line of clipboardData) {
			line = line.replace(/\t/gm, '\u00A0\u00A0\u00A0\u00A0');
			if (firstLine) {
				editor.focusedLine.textContent = editor.linePosition.left;
				editor.focusedLine.textContent += line;
				firstLine = false;
			} else {
				editor.updateLine();
				editor.focusedLine = editor.addLine();
				editor.removePrevLineCursor('down');
				editor.focusedLine.textContent += line;
			}
		}
		editor.cursorCounter = editor.focusedLine.textContent.length;
		editor.focusedLine.textContent += rightText;
		editor.linePosition = editor.updatePosition();
		editor.addCursor();
	}
}

module.exports = Keypress;