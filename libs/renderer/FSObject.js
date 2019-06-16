class FSObject {
	constructor({path, parent}) {
		this.path = path;
		this.parent = parent;
	}
}

class File extends FSObject{
	constructor(path, parent) {
		super(path, parent);
	}
}

class Folder extends FSObject{
	constructor(path, parent, structure={}, expanded=false) {
		super(path, parent);
		this.structure = structure;
		this.expanded = expanded;
	}
}

class ProjectFolder extends Folder {
	constructor(path, structure, expanded) {
		super(path, parent=null, structure, expanded);
	}
}

module.exports = ProjectFolder;