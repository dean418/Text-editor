class Line {
	constructor() {
		this.line = this.constructLine();
		this.prevFocusOffset = 0;
		this.line.onclick = function () {
			// TODO: cleanup, make cleanup method
			let selection = window.getSelection();
	
			if(selection.toString() !== "") {
				return;
			}

			editor.focusedLine = this.childNodes[1];

			if (this.id !== editor.focusedLineCpy.parentNode.id) {
				editor.updateLine();
			}

			editor.removePrevLineCursor();
			editor.focusedLine.normalize();
			editor.cursorCounter = selection.focusOffset;
			editor.linePosition = editor.updatePosition();
			editor.addCursor();
			editor.focusedLineCpy = editor.focusedLine;
		}
	}

	constructLine() {
		// create elements for editor line
		let line = document.createElement("div");
		let rowContent = document.createElement("div");
		let rowNum = document.createElement("div");

		// assign classes to editor line
		line.classList.add("line");
		line.id = 1;
		rowNum.classList.add("rowNum");
		rowContent.classList.add("rowContent", "focused");

		// construct line
		line.appendChild(rowNum);
		line.appendChild(rowContent);

		return line;
	}
}

module.exports = Line;