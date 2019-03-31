class Line {
	constructor() { 
		// this.counter = 0;
		this.line = this.constructLine();
	}
	
	constructLine() {
		// create elements for editor line
		let line = document.createElement("div");
		let rowContent = document.createElement("div");
		let rowNum = document.createElement("div");

		// assign classes to editor line
		line.classList.add("line");
		line.id = 1;
		rowNum.classList.add("rowNum");
		rowContent.classList.add("rowContent");

		// construct line
		line.appendChild(rowNum);
		line.appendChild(rowContent);

		return line;
	}


}

module.exports = Line;