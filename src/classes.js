const Elements = require("./elements.js")

class Task {
	constructor (title, project) {
		this.title = title
		this.project = project
		project.addTasks(this)
		this.elements = Elements.createTask(this.title)
		project.elements.tasksContainer.append(this.elements.group)
	}

	dueDate = new Date()
	priority
	_notes
	set notes(text) {
		this._notes = text
		this.elements.notes.textContent = this._notes
	}
	get notes() {return this._notes}
	state
	
	get dueDate () {
		return `${this.dueDate.toLocaleDateString("default", {month: 'long'})} ${this.dueDate.getDate()}, ${this.dueDate.getFullYear()}`
	}

}

class Project {
	constructor (title, ...tasks) {
		this.title = title
		this.tasks = tasks == undefined ? {} : {...tasks}
		this.elements = Elements.createProject(this.title)
	}

	addTasks (...tasks) {
		Object.assign(this.tasks, {...tasks})
	}

	displayProject() {
		Elements.projectsContainer.append(this.elements.group)
	}
}

module.exports = {Task, Project}
