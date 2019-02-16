class Editor {
	constructor(container) {
		this.lines = []; // store lines to allow for different editors 
		this.container = container;
		this.cursor;
	}

	addLine(start, focusedLine) {
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

		if (start === "firstLine") {
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

	sortLineNumbers() {
		let lineNumber = 1;

		for (let line of this.lines) {
			line.id = lineNumber;
			line.childNodes[0].innerHTML = lineNumber;
			lineNumber += 1;
		}
		lineNumber = 1;
	}

	createCursor(focusedLine) {
		let cursor = document.createElement("span");

		cursor.id = "cursor";
		this.cursor = cursor;
		focusedLine.innerHTML+=cursor.outerHTML;
	}

	addCursor(focusedLine, linePosition) {
		focusedLine.innerHTML = linePosition.left;
		focusedLine.innerHTML += editor.cursor.outerHTML;
		focusedLine.innerHTML +=  linePosition.right;
	}

	removePrevLineCursor(focusedLine, direction) {
		let currentLine = focusedLine.parentElement;
		let currentLineId = parseInt(currentLine.id);
		let previousLine = 0;

		if(direction === "up") {
			previousLine = currentLineId;
		} else if(direction === "down") {
			previousLine = currentLineId - 2;
		}

		let prevLineNodes = this.lines[previousLine].childNodes[1].childNodes //[0].id
		for (let i=0; i < prevLineNodes.length; i++) {
			if(prevLineNodes[i].tagName !== undefined && prevLineNodes[i].tagName.toLowerCase() == "span") {
				prevLineNodes[i].remove()
			}
		}
	}

	updatePosition(focusedLine, counter) {
		let lineText = focusedLine.textContent;
		let leftLinePos = lineText.substring(0, lineText.length - counter);
		let rightLinePos = lineText.substring(lineText.length - counter, lineText.length);

		leftLinePos = leftLinePos.replace(/(\r\n|\n|\r|u21b5)/gm, "");
		rightLinePos = rightLinePos.replace(/(\r\n|\n|\r|u21b5)/gm, "");

		return {
			left: leftLinePos,
			right: rightLinePos
		}
	}

	updateLine(focusedLineCpy, focusedLine) {
		focusedLine.classList.add("focused");
		focusedLineCpy.classList.remove("focused");
	}
}

module.exports = Editor;