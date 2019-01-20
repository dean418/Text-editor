const Keypress = require('./libs/keypress');
const Editor = require('./libs/editor');
let focusedLine = document.getElementById("1");
focusedLine = focusedLine.getElementsByClassName("rowContent")[0];

let linePos;
let counter = 0;

document.addEventListener('keydown', event => {
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
			focusedLine = Keypress.enter();
			counter = 0;
			linePos = Editor.updatePos(focusedLine, counter);
			break;

		case "Backspace":
			focusedLine = Keypress.backspace(focusedLine);
			linePos = Editor.updatePos(focusedLine, counter)
			break;

		case "Tab":
			focusedLine.innerText += "&nbsp&nbsp&nbsp&nbsp";
			break;

		case " ":
			focusedLine.innerText += "&nbsp";
			break;

			// arrows
		case "ArrowUp":
			focusedLine = Keypress.upArrow(focusedLine);
			linePos = Editor.updatePos(focusedLine, counter)
			break;

		case "ArrowDown":
			focusedLine = Keypress.downArrow(focusedLine);
			linePos = Editor.updatePos(focusedLine, counter);
			break;

		case "ArrowLeft":
			counter++;
			linePos = Editor.updatePos(focusedLine, counter);
			break;

		case "ArrowRight":
			counter--;
			linePos = Editor.updatePos(focusedLine, counter)
			break;

		default:
			if (typeof (linePos) != "undefined") {
				focusedLine.innerText = linePos.left + event.key + linePos.right;
				linePos = Editor.updatePos(focusedLine, counter);
			} else {
				focusedLine.innerText += event.key;
			}
	}
});