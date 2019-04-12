const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
const Clipboard = require('./libs/clipboard');

const editor = new Editor();
const keypress = new Keypress(editor);
const clipboard = new Clipboard();

editor.addCursor();

function handleSpace() {
	editor.linePosition = editor.updatePosition();
	editor.addCursor(editor.linePosition);
}

function handleArrowUpDown(direction) {
	editor.removePrevLineCursor(direction);
	editor.linePosition = editor.updatePosition();
	editor.addCursor(editor.linePosition);
}

function handleArrowLeftRight() {
	editor.linePosition = editor.updatePosition()
	editor.addCursor(editor.linePosition);
}

function checkCounter() {
	if (editor.cursorCounter > editor.focusedLine.textContent.length) {
		editor.cursorCounter = editor.focusedLine.textContent.length;
	}
}

function isOutOfView(direction) {
	let bounding = editor.focusedLine.getBoundingClientRect();

	if (direction == "down") {
		if (bounding.bottom + 48 < window.innerHeight) {
			return false;
		} else {
			return true;
		}
	} else {
		if (bounding.top <= 0) {
			return true;
		} else {
			return false;
		}
	}
}

function scroll(isNegative) {
	let height = getComputedStyle(editor.focusedLine).height;
	height = parseInt(height, 10);

	if (isNegative) {
		window.scrollBy(0, -height);
	} else {
		window.scrollBy(0, height);
	}
}

document.addEventListener('keydown', (event) => {
	let key = event.key;
	switch (key) {
		case "Shift":
			event.preventDefault();
			break;

		case "Meta":
			event.preventDefault();
			break;

		case "Control":
			break;

		case "Alt":
			event.preventDefault();
			break;

		case "AltGraph":
			break;

		case "Enter":
			editor.focusedLine.textContent = editor.linePosition.left;
			editor.focusedLine = editor.addLine();
			editor.focusedLine.textContent = editor.linePosition.right;
			editor.cursorCounter = 0;
			editor.removePrevLineCursor("down");
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition);

			if (isOutOfView("down")) {
				scroll();
			}
			break;

		case "Backspace":
			keypress.backspace();
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition);
			editor.sortLineNumbers();
			break;

		case "Delete":
			keypress.delete();
			editor.linePosition = editor.updatePosition();
			editor.addCursor();
			editor.sortLineNumbers();
			break;

		case "Tab":
			let tab = "\u00A0\u00A0\u00A0\u00A0";
			editor.cursorCounter += 4;
			keypress.addSpaces(tab);
			handleSpace(tab);
			break;

		case " ":
			space = "\u00A0";
			keypress.addSpaces(space);
			editor.cursorCounter++;
			handleSpace(space);
			break;

			// arrows
		case "ArrowUp":
			event.preventDefault();

			keypress.upArrow();

			if (isOutOfView("up")) {
				scroll(true);
			}

			checkCounter();
			handleArrowUpDown("up");
			break;

		case "ArrowDown":
			event.preventDefault();

			keypress.downArrow();

			if (isOutOfView("down")) {
				scroll();
			}

			checkCounter();
			handleArrowUpDown("down");
			break;

		case "ArrowLeft":
			if (event.shiftKey && event.ctrlKey) {

			} else if (event.shiftKey) {

			} else if (editor.cursorCounter !== 0) {
				editor.cursorCounter--;
				handleArrowLeftRight();
			}
			break;

		case "ArrowRight":
			if (event.shiftKey && event.ctrlKey) {
				if (!editor.focusedLine.childNodes[2]) {
					break;
				}

				let selection = window.getSelection();
				let range = document.createRange();

				range.selectNodeContents(editor.focusedLine.childNodes[2]);

				selection.removeAllRanges();
				selection.addRange(range);

				// TODO: stop selection at special character, (span tags?)
			} else if (event.shiftKey) {
				if (!editor.focusedLine.childNodes[2]) {
					break;
				}

				let selection = window.getSelection();
				let range = document.createRange();
				editor.focusedLine.childNodes[2].splitText(2);

				console.log(editor.focusedLine.childNodes);
				console.log(editor.focusedLine.childNodes[2]);
				range.selectNodeContents(editor.focusedLine.childNodes[2]);
				console.log(range)

				selection.removeAllRanges();
				selection.addRange(range);

				// selection.modify("extend", "left", "character");
				// selection.modify("extend", "backward", "character")

			} else if (editor.cursorCounter !== editor.focusedLine.textContent.length) {
				editor.cursorCounter++;
				handleArrowLeftRight();
			}
			break;

			//copy & paste

		case "c":
			break;

		case "v":
			if (event.ctrlKey) {
				let firstLine = true;
				let rightText = editor.linePosition.right;
				let clipboardData = clipboard.getClipboardData();
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
						editor.removePrevLineCursor("down");
						editor.focusedLine.textContent += line;
					}
				}
				editor.cursorCounter = editor.focusedLine.textContent.length;
				editor.focusedLine.textContent += rightText;
				editor.linePosition = editor.updatePosition();
				editor.addCursor();
			}
			break;

		default:
			editor.focusedLine.textContent = editor.linePosition.left + event.key;
			editor.focusedLine.innerHTML += editor.cursor.outerHTML;
			editor.focusedLine.innerHTML += editor.linePosition.right;
			editor.cursorCounter++;
	}

	editor.linePosition = editor.updatePosition();

	if (editor.focusedLineCpy.parentElement.id != editor.focusedLine.parentElement.id) {
		editor.updateLine();
		editor.focusedLineCpy = editor.focusedLine;
	}
});