const Editor = require('./editor');

class Line extends Editor {
	constructor() {
		super(container);
		this.lines = []
	}

	addLine(focusedLine, start) {
		// create elements for editor line
		let line = document.createElement("div");
		let rowContent = document.createElement("div");
		let rowNum = document.createElement("div");

		// assign classes to editor line
		line.classList.add("line");
		line.id = 1;
		rowNum.classList.add("rowNum");
		rowContent.classList.add("rowContent");

		// construct line
		line.appendChild(rowNum);
		line.appendChild(rowContent);

		if (start) {
			rowContent.classList.add("focused");
			this.container.appendChild(line);
			this.lines.push(line);
		} else {
			let nextLineId = parseInt(focusedLine.parentElement.id);

			this.container.insertBefore(line, this.lines[nextLineId]); //new line, next line
			this.lines.splice(nextLineId, 0, line);
		}

		// add line numbers
		this.sortLineNumbers();

		return line.childNodes[1];
	}

	updateLine(focusedLineCpy, focusedLine) {
		focusedLine.classList.add("focused");
		focusedLineCpy.classList.remove("focused");
	}

	sortLineNumbers() {
		let lineNumber = 1;

		for (let line of this.lines) {
			line.id = lineNumber;
			line.childNodes[0].innerHTML = lineNumber;
			lineNumber += 1;
		}
		lineNumber = 1;
	}
}

module.exports = Line;