const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
const Line = require('./libs/line');
const Cursor = require('./libs/cursor')

const editor = new Editor();

let focusedLine = Line.addFirstLine(editor.container).childNodes[1];

const line = new Line(focusedLine);
const cursor = new Cursor();
const keypress = new Keypress();


cursor.createCursor(line.focusedLine);
line.lines.push(line.focusedLine.parentElement);
line.sortLineNumbers();

let counter = 0;
let linePosition = editor.updatePosition(line.focusedLine, counter);
line.focusedLineCpy = line.focusedLine;

function handleSpace() {
	linePosition = editor.updatePosition(line.focusedLine, counter)
	cursor.addCursor(linePosition);
}

function handleArrowUpDown(direction) {
	cursor.removePrevLineCursor(direction);
	linePosition = editor.updatePosition(line.focusedLine, counter);
	cursor.addCursor(linePosition);
}

function handleArrowLeftRight() {
	linePosition = editor.updatePosition(line.focusedLine, counter)
	cursor.addCursor(linePosition);
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
			// event.preventDefault();
			break;

		case "Enter":
			line.focusedLine = line.addLine();
			counter = 0;
			cursor.removePrevLineCursor("down");
			linePosition = editor.updatePosition(line.focusedLine, counter);
			cursor.addCursor(linePosition);
			break;

		case "Backspace":
			line.focusedLine = keypress.backspace(linePosition);
			linePosition = editor.updatePosition(line.focusedLine, counter)
			cursor.addCursor(linePosition);
			break;

		case "Delete":
			linePosition = keypress.delete(linePosition);
			counter--;
			linePosition = editor.updatePosition(line.focusedLine, counter);
			cursor.addCursor(linePosition);
			break;

		case "Tab":
			let tab = "&nbsp&nbsp&nbsp&nbsp";
			focusedLine = keypress.addSpaces(linePosition, tab);
			handleSpace();	
			break;

		case " ":
			space = "&nbsp";
			focusedLine = keypress.addSpaces(linePosition, space);
			handleSpace();			
			break;

			// arrows
		case "ArrowUp":
			keypress.upArrow();
			handleArrowUpDown("up");
			break;

		case "ArrowDown":
			keypress.downArrow();
			handleArrowUpDown("down");
			break;

		case "ArrowLeft":
			if(counter < line.focusedLine.textContent.length) {
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
				line.focusedLine.innerText = linePosition.left + event.key;
				line.focusedLine.innerHTML += cursor.cursor.outerHTML;
				line.focusedLine.innerHTML +=  linePosition.right;

			} else {
				line.focusedLine.innerText = event.key;
				line.focusedLine.innerHTML += cursor.cursor.outerHTML;
			}
	}

	linePosition = editor.updatePosition(line.focusedLine, counter);

	if (line.focusedLineCpy.parentElement.id != line.focusedLine.parentElement.id) {
		line.updateLine();
		line.focusedLineCpy = line.focusedLine;
	}
});

module.exports = editor;