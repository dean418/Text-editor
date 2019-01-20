class Editor {
	static addline() {
		// create elements for editor line
		let container = document.getElementById("editorContainer");
		let line = document.createElement("div");
		let rowContent = document.createElement("div");
		let rowNum = document.createElement("div");

		// assign classes to editor line
		line.className += "line";
		rowContent.className += "rowContent";
		rowNum.className += "rowNum";
	
		// construct line
		line.appendChild(rowNum);
		line.appendChild(rowContent);
		container.appendChild(line);
	
		// add line numbers
		this.addLineNumber();

		return line.childNodes[1];
	}

	static addLineNumber() {
		let lines = document.getElementById("editorContainer").querySelectorAll(".line");
		let lineNumber = 1;
	
		for(let line of lines) {
			line.id = lineNumber;
			line.getElementsByClassName("rowNum")[0].innerText = lineNumber;
			lineNumber += 1;
		}
	}

	static updatePos(focusedLine, counter) {
		let lineText = focusedLine.innerText;
		let leftLinePos = lineText.substring(0, lineText.length - counter);
		let rightLinePos = lineText.substring(lineText.length - counter, lineText.length);	
		console.log("left: " + leftLinePos);
		console.log("right: " + rightLinePos);
		return {
			left: leftLinePos,
			right: rightLinePos
		}
	}

	static updateLine() {
		
	}
}

module.exports = Editor;