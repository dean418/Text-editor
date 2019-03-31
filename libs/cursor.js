class Cursor {
	constructor() {
		this.cursor = this.createCursor();
	}

	createCursor() {
		let cursor = document.createElement("span");
		cursor.id = "cursor";

		return cursor;
	}
}


module.exports = Cursor;