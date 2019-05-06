const {ipcRenderer} = require("electron");

const Keypress = require('./libs/renderer/keypress');
const Editor = require('./libs/renderer/editor');
const Select = require('./libs/renderer/select');
const UI = require('./libs/renderer/UI');

const editor = new Editor();
const select = new Select(editor);
const keypress = new Keypress(editor);
const ui = new UI();

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
	editor.linePosition = editor.updatePosition();
	editor.addCursor(editor.linePosition);
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

		case "CapsLock":
			break;

		case "Enter":
			editor.focusedLine.textContent = editor.linePosition.left;
			editor.focusedLine = editor.addLine();
			editor.focusedLine.textContent = editor.linePosition.right;
			editor.cursorCounter = 0;
			editor.removePrevLineCursor("down");
			editor.linePosition = editor.updatePosition();
			editor.addCursor(editor.linePosition);

			if (editor.isOutOfView("down")) {
				editor.scroll();
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

			if (editor.isOutOfView("up")) {
				editor.scroll(true);
			}

			editor.checkCounter();
			handleArrowUpDown("up");
			break;

		case "ArrowDown":
			event.preventDefault();

			keypress.downArrow();

			if (editor.isOutOfView("down")) {
				editor.scroll();
			}

			editor.checkCounter();
			handleArrowUpDown("down");
			break;

		case "ArrowLeft":
			if (event.shiftKey && event.ctrlKey) {
				select.selectWord("backward");

			} else if (event.shiftKey) {
				editor.cursorCounter--;
				handleArrowLeftRight();
				select.selectLetterBackward();

			} else if (editor.cursorCounter !== 0) {
				select.resetOnArrowKey("left");
				handleArrowLeftRight();
			}
			break;

		case "ArrowRight":
			if (event.shiftKey && event.ctrlKey) {
				select.selectWord("forward");
			} else if (event.shiftKey) {

				editor.cursorCounter++;
				handleArrowLeftRight();
				select.selectLetterForward();

			} else if (editor.cursorCounter !== editor.focusedLine.textContent.length) {
				select.resetOnArrowKey("right");
				handleArrowLeftRight();
			}
			break;

		case "v":
			if (event.ctrlKey) {
				keypress.paste();
			}
			break;

		default:
			if (event.ctrlKey) {
				break;
			}
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

ipcRenderer.on("new-project-folder", (sender, path) => {
	console.log(path)
	ui.createFolder();
})