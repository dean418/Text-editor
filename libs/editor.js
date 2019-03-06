class Editor {
	constructor() {
		this.container = document.getElementById("editorContainer");
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
}

module.exports = Editor;