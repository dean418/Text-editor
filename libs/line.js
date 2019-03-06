const Editor = require('./editor');

class Line extends Editor {
	constructor(focusedLine) {
		super(editor);
		this.container = editor.container;
		this.lines = [];
		this.focusedLine = focusedLine
		this.focusedLineCpy = focusedLine;
	}

	static constructLine() {
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

		return line
	}

	static addFirstLine(container) {
		let line = this.constructLine();

		line.childNodes[1].classList.add("focused");
		container.appendChild(line);
		return line;
	}

	addLine() {
		let line = Line.constructLine();
		let lineId = parseInt(this.focusedLine.parentElement.id);
		
		if(lineId == this.lines.length) {
			this.lines.push(line);
			this.container.appendChild(line)
		} else {
			this.lines.splice(lineId, 0, line);
			let thing = this.focusedLine.parentNode;
			thing.parentNode.insertBefore(line, thing.nextSibling)			
		}

		this.sortLineNumbers();
		return line.childNodes[1];
	}

	updateLine() {
		this.focusedLine.classList.add("focused");
		this.focusedLineCpy.classList.remove("focused");
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