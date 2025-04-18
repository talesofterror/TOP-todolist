class Task {
	constructor (title) {
		this.title = title
	}

	dueDate = new Date()
	description = ""
	priority
	notes = ""
	state

	elements = {}
	
	get dueDate () {
		return `${this.dueDate.toLocaleDateString("default", {month: 'long'})} ${this.dueDate.getDate()}, ${this.dueDate.getFullYear()}`
	}

}

class Project {
	constructor (title, ...tasks) {
		this.title = title
		this.tasks = tasks == undefined ? {} : {...tasks}
	}

	addTasks (...tasks) {
		Object.assign(this.tasks, {...tasks})
	}
}

module.exports = {Task, Project}
