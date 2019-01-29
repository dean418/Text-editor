const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');

let container = document.getElementById("editorContainer");

const editor = new Editor(container);
const keypress = new Keypress(editor);

editor.addLine("firstLine");

let focusedLine = document.getElementById("1").childNodes[1];

editor.createCursor(focusedLine);

let linePosition;
let counter = 0;
let focusedLineCpy = focusedLine;

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
			focusedLine = keypress.enter(focusedLine);
			counter = 0;
			break;

		case "Backspace":
			focusedLine = keypress.backspace(focusedLine);
			linePosition = editor.updatePosition(focusedLine, counter)
			editor.addCursor(focusedLine);
			break;

		case "Tab":
			focusedLine.innerHTML += "&nbsp&nbsp&nbsp&nbsp";
			break;

		case " ":
			focusedLine.innerHTML += "&nbsp";
			break;

			// arrows
		case "ArrowUp":
			focusedLine = keypress.upArrow(focusedLine);
			break;

		case "ArrowDown":
			focusedLine = keypress.downArrow(focusedLine);
			break;

		case "ArrowLeft":
			if(counter < focusedLine.textContent.length) {
				counter++;
				linePosition = editor.updatePosition(focusedLine, counter)
				editor.addCursor(focusedLine, linePosition);
			}
			break;

		case "ArrowRight":
			if(counter !== -1) {
				counter--;
				linePosition = editor.updatePosition(focusedLine, counter)
				editor.addCursor(focusedLine, linePosition);
			}
			break;

		default:
			if (typeof (linePosition) != "undefined") {
				focusedLine.innerHTML = linePosition.left + event.key;
				focusedLine.innerHTML += editor.cursor.outerHTML;
				focusedLine.innerHTML +=  linePosition.right;

			} else {
				focusedLine.innerHTML = event.key;
				focusedLine.innerHTML += editor.cursor.outerHTML;
			}
	}

	linePosition = editor.updatePosition(focusedLine, counter)

	if (focusedLineCpy.parentElement.id != focusedLine.parentElement.id) {
		editor.updateLine(focusedLineCpy, focusedLine);
		focusedLineCpy = focusedLine;
	}
});

module.exports = editor;