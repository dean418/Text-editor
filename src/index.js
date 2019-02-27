const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
const Line = require('./libs/line');
const Cursor = require('./libs/cursor')

let container = document.getElementById("editorContainer");

const editor = new Editor(container);
const line = new Line();
const cursor = new Cursor(line.lines);
const keypress = new Keypress(line, editor);

line.addLine(null, true);

let focusedLine = document.getElementById("1").childNodes[1];

cursor.createCursor(focusedLine);

let counter = 0;
let linePosition = editor.updatePosition(focusedLine, counter);
let focusedLineCpy = focusedLine;

function handleSpace() {
	linePosition = editor.updatePosition(focusedLine, counter)
	cursor.addCursor(focusedLine, linePosition);
}

function handleArrowUpDown(focusedLine, direction) {
	cursor.removePrevLineCursor(focusedLine, direction);
	linePosition = editor.updatePosition(focusedLine, counter);
	cursor.addCursor(focusedLine, linePosition);
}

function handleArrowLeftRight() {
	linePosition = editor.updatePosition(focusedLine, counter)
	cursor.addCursor(focusedLine, linePosition);
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
			event.preventDefault();
			break;

		case "Enter":
			focusedLine = line.addLine(focusedLine);
			counter = 0;
			cursor.removePrevLineCursor(focusedLine, "down");
			linePosition = editor.updatePosition(focusedLine, counter);
			cursor.addCursor(focusedLine, linePosition);
			break;

		case "Backspace":
			focusedLine = keypress.backspace(focusedLine, linePosition);
			linePosition = editor.updatePosition(focusedLine, counter)
			cursor.addCursor(focusedLine, linePosition);
			break;

		case "Delete":
			linePosition = keypress.delete(focusedLine, linePosition);
			counter--;
			linePosition = editor.updatePosition(focusedLine, counter);
			cursor.addCursor(focusedLine, linePosition);
			break;

		case "Tab":
			let tab = "&nbsp&nbsp&nbsp&nbsp";
			focusedLine = keypress.addSpaces(focusedLine, linePosition, tab);
			handleSpace();	
			break;

		case " ":
			space = "&nbsp";
			focusedLine = keypress.addSpaces(focusedLine, linePosition, space);
			handleSpace();			
			break;

			// arrows
		case "ArrowUp":
			focusedLine = keypress.upArrow(focusedLine);
			handleArrowUpDown(focusedLine, "up");
			break;

		case "ArrowDown":
			focusedLine = keypress.downArrow(focusedLine);
			handleArrowUpDown(focusedLine, "down");
			break;

		case "ArrowLeft":
			if(counter < focusedLine.textContent.length) {
				counter++;
				handleArrowLeftRight();
			}
			break;

		case "ArrowRight":
			if(counter !== -1) {
				counter--;
				handleArrowLeftRight();
			}
			break;

		default:
			if (typeof (linePosition) != "undefined") {
				focusedLine.innerText = linePosition.left + event.key;
				focusedLine.innerHTML += cursor.cursor.outerHTML;
				focusedLine.innerHTML +=  linePosition.right;

			} else {
				focusedLine.innerText = event.key;
				focusedLine.innerHTML += cursor.cursor.outerHTML;
			}
	}

	linePosition = editor.updatePosition(focusedLine, counter);

	if (focusedLineCpy.parentElement.id != focusedLine.parentElement.id) {
		line.updateLine(focusedLineCpy, focusedLine);
		focusedLineCpy = focusedLine;
	}
});

module.exports = editor;