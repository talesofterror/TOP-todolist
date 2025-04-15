class Task {
	constructor (title) {
		this.title = title
	}

	dueDate
	description = ""
	priority
	notes = ""
	state

	elements

	static delete () {
		delete this
	}	
	
}

class Project {
	constructor (title, tasks) {
		this.title = title
		this.tasks = {...tasks}
	}
}

module.exports = {Task, Project}
