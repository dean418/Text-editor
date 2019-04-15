class Select {
	constructor(Editor) {
		this.editor = Editor;
	}

	selectLetterForward() {
		event.preventDefault();

		let selection = window.getSelection();
		let range = document.createRange();
		let startNode = this.selectStartNode();

		let undo = this.undoSelection(true, selection);

		if (undo) {
			return;
		}

		if (editor.linePosition.right.length == 0) {
			return;
		}

		this.resetSelection(selection);

		startNode.splitText(1 + selection.focusOffset);
		range.selectNodeContents(startNode);

		this.addSelection(range, selection)
	}

	selectLetterBackward() {
		event.preventDefault();

		let selection = window.getSelection();
		let range = document.createRange();
		let startNode = editor.focusedLine.childNodes[0];

		let undo = this.undoSelection(false, selection);

		if (undo) {
			return;
		}

		if (editor.linePosition.left.length == 0) {
			return;
		}

		this.resetSelection(selection);

		startNode.splitText(editor.linePosition.left.length - (1 + selection.toString().length));
		range.selectNodeContents(editor.focusedLine.childNodes[1]);

		this.addSelection(range, selection);
	}

	selectStartNode() {
		let startNode;

		if (editor.focusedLine.childNodes[2]) {
			// Nodes (text, cursor, text)
			startNode = editor.focusedLine.childNodes[2];
		} else {
			// text node 2 doesnt exist. Nodes(cursor, text)
			startNode = editor.focusedLine.childNodes[1];
		}
		return startNode;
	}

	resetSelection(selection) {
		if (selection.toString() == "") {
			selection.removeAllRanges();
		}
		return;
	}

	undoSelection(letterForwards, selection) {
		this.resetSelection(selection);

		// if left of cursor is selected && right arrow was pressed
		if (letterForwards && selection.containsNode(editor.focusedLine.childNodes[0], true)) {
			let range = document.createRange();

			range.setStart(editor.focusedLine.childNodes[0], editor.linePosition.left.length - (selection.toString().length - 1));
			range.setEnd(editor.focusedLine.childNodes[0], editor.linePosition.left.length);

			this.addSelection(range, selection);

			return true;

			// if right of cursor is selected && left arrow pressed
		} else if (!letterForwards && selection.containsNode(this.selectStartNode(), true)) {
			selection.modify("extend", "backward", "character");
			return true;
		}
	}

	addSelection(range, selection) {
		selection.removeAllRanges();
		selection.addRange(range);
		editor.focusedLine.normalize();
	}
}

module.exports = Select;