const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
const Clipboard = require('./libs/clipboard');

const editor = new Editor();
const keypress = new Keypress();
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
		if(bounding.top <= 0) {
			return true;
		} else {
			return false;
		}
	}
}

function scroll(isNegative) {
	let height = getComputedStyle(editor.focusedLine).height;
	height = parseInt(height, 10);

	if(isNegative) {
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
			editor.focusedLine = keypress.backspace(editor.focusedLine, editor.linePosition, editor.lines);
			editor.cursorCounter--;
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition);
			break;

		case "Delete":
			editor.linePosition = keypress.delete(editor.focusedLine, editor.linePosition, editor.lines);
			editor.linePosition = editor.updatePosition();
			editor.addCursor();
			break;

		case "Tab":
			let tab = "\u00A0\u00A0\u00A0\u00A0";
			editor.cursorCounter += 4;
			editor.focusedLine = keypress.addSpaces(editor.focusedLine, editor.linePosition, tab);
			handleSpace(tab);
			break;

		case " ":
			space = "\u00A0";
			editor.focusedLine = keypress.addSpaces(editor.focusedLine, editor.linePosition, space);
			editor.cursorCounter++;
			handleSpace(space);
			break;

			// arrows
		case "ArrowUp":
			event.preventDefault();
		
			editor.focusedLine = keypress.upArrow(editor.focusedLine, editor.lines, editor.container);
	
			if (isOutOfView("up")) {
				scroll(true);
			}

			checkCounter();
			handleArrowUpDown("up");
			break;

		case "ArrowDown":
			event.preventDefault();
		
			editor.focusedLine = keypress.downArrow(editor.focusedLine, editor.lines, editor.container);

			if (isOutOfView("down")) {
				scroll();
			}

			checkCounter();
			handleArrowUpDown("down");
			break;

		case "ArrowLeft":
			if (editor.cursorCounter !== 0) {
				editor.cursorCounter--;
				handleArrowLeftRight();
			}
			break;

		case "ArrowRight":
			if (editor.cursorCounter !== editor.focusedLine.textContent.length) {
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
				let clipboardData = clipboard.getClipboardData();
				clipboardData = clipboardData.split('\n');

				for (let line of clipboardData) {
					line = line.replace(/\t/gm, '\u00A0\u00A0\u00A0\u00A0');
					if (firstLine) {
						editor.focusedLine.textContent += line;
						firstLine = false;
					} else {
						editor.focusedLine = editor.addLine();
						editor.focusedLine.textContent += line;
						editor.removePrevLineCursor("down");
					}
				}
				editor.cursorCounter = editor.focusedLine.textContent.length;
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