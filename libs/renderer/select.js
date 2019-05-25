/**
 * TODO:
 * undo an undo
 * make selection go to next/previous line
 */

class Select {
	constructor() {
		this.lastDirection = '';
		this.selectionCounter = 0;
		this.cursorCounterCpy = 0;
	}

	selectLetterForward() {
		event.preventDefault();

		let selection = window.getSelection();
		let range = document.createRange();
		let startNode = editor.focusedLine.childNodes[0];

		if(this.selectionCounter == 0) {
			// continue
		} else if(this.lastDirection == 'left') {
			this.undoSelection(range, selection);
			return;
		}

		if (editor.cursorCounter == editor.focusedLine.textContent.length+1) {
			editor.cursorCounter--;
			return;
		} 

		this.resetSelection(-1);

		startNode.splitText(editor.linePosition.left.length - (1 + this.selectionCounter));

		range.selectNodeContents(editor.focusedLine.childNodes[1]);
		this.addSelection(range, selection);

		this.selectionCounter++;
		this.lastDirection = 'right';
	}

	selectLetterBackward() {
		event.preventDefault();

		let selection = window.getSelection();
		let range = document.createRange();
		let startNode = editor.focusedLine.childNodes[2];

		if(this.selectionCounter == 0) {
			// continue
		} else if(this.lastDirection == 'right') {
			this.undoSelection(range, selection, editor.focusedLine.childNodes[0]);
			return;
		}

		if(editor.focusedLine.childNodes[2] == undefined) {
			startNode = editor.focusedLine.childNodes[1];
		}

		if (editor.cursorCounter == -1) {
			editor.cursorCounter++;
			return;
		}

		this.resetSelection(1);

		startNode.splitText(this.selectionCounter + 1);
		range.selectNodeContents(startNode);
		
		this.addSelection(range, selection);
		this.selectionCounter++;
		this.lastDirection = 'left';
	}

	undoSelection(range, selection, startNode) {
		this.selectionCounter--;

		if(startNode) {
			startNode.splitText((editor.linePosition.left.length + 1) - (this.selectionCounter + 1));
			range.selectNodeContents(editor.focusedLine.childNodes[1]);
		} else {
			startNode = editor.focusedLine.childNodes[2];
			range.setStart(startNode, 0);
			range.setEnd(startNode, this.selectionCounter);
		}
		this.addSelection(range, selection);
	}

	resetSelection(direction) {
		if(this.cursorCounterCpy != editor.cursorCounter + direction) {
			this.selectionCounter = 0;
		}
		this.cursorCounterCpy = editor.cursorCounter;
	}

	resetOnArrowKey(direction) {
		if(window.getSelection().toString() == '') {
			if(direction == 'left') {
				editor.cursorCounter--;
			} else {
				editor.cursorCounter++;
			}
		} else {
			this.selectionCounter = 0;
			this.lastDirection = '';
		}
	}

	addSelection(range, selection) {
		selection.removeAllRanges();
		selection.addRange(range);
		editor.focusedLine.normalize();
	}
}

module.exports = Select;