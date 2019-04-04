const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
const Clipboard = require('./libs/clipboard')

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
			editor.focusedLine = editor.addLine();
			editor.cursorCounter = 0;
			editor.removePrevLineCursor("down");
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition)
			break;

		case "Backspace":
			editor.focusedLine = keypress.backspace(editor.focusedLine, editor.linePosition, editor.lines);
			editor.cursorCounter = editor.focusedLine.textContent.length;
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition);
			break;

		case "Delete":
			editor.linePosition = keypress.delete(editor.focusedLine, editor.linePosition, editor.lines);
			editor.linePosition = editor.updatePosition();
			editor.addCursor();
			break;

		case "Tab":
			let tab = "&nbsp&nbsp&nbsp&nbsp";
			editor.cursorCounter += 4;
			editor.focusedLine = keypress.addSpaces(editor.focusedLine, editor.linePosition, tab);
			handleSpace(tab);
			break;

		case " ":
			space = "&nbsp";
			editor.focusedLine = keypress.addSpaces(editor.focusedLine, editor.linePosition, space);
			editor.cursorCounter++;
			handleSpace(space);
			break;

			// arrows
		case "ArrowUp":
			editor.focusedLine = keypress.upArrow(editor.focusedLine, editor.lines, editor.container);
			
			checkCounter();
			handleArrowUpDown("up");
			break;

		case "ArrowDown":
			editor.focusedLine = keypress.downArrow(editor.focusedLine, editor.lines, editor.container);

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

		//paste

		case "v":
			if(event.ctrlKey){
				let firstLine = true;
				let clipboardData = clipboard.getClipboardData();
				clipboardData = clipboardData.split('\n');

				for (let line of clipboardData) {
					if(firstLine) {
						editor.focusedLine.textContent += line;
						firstLine = false;
					} else {
						editor.focusedLine = editor.addLine();
						editor.focusedLine.innerText += line;
						editor.removePrevLineCursor("down");
					}
				}
				editor.cursorCounter = editor.focusedLine.textContent.length;
				editor.linePosition = editor.updatePosition();
				editor.addCursor();
			}
			break;

		default:
			editor.focusedLine.innerText = editor.linePosition.left + event.key;
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