const Elements = require("./elements.js")

class Task {

	constructor (title, project) {
		this.id = Task.createId()
		this.title = title
		this.project = project
		this._priority = {index: 0, level: Task.priorityClasses[0]}
		project.addTasks(this)
		this.elements = Elements.createTask(this.title)
		project.elements.tasksContainer.append(this.elements.group)
		this.elements.status.addEventListener("click", ()=> {
			this.priority = Task.returnNextIndex(Task.priorityClasses, this.priority.index)
		})
		this.elements.button_Menu.addEventListener("click", ()=> {
			if (this.priority.level == "priority-delete") {
				this.elements.group.remove()
				this.project.deleteTask(this)
			} else if (this.priority.level == "priority-complete") {
				this.elements.group.remove()
				this.project.tasks.completed.push(this)
				this.project.deleteTask(this)
			}
			this.priority = Task.returnNextIndex(Task.priorityClasses, this.priority.index)
		})
	}

	static taskCount = 0
	static priorityClasses = ["priority-1", "priority-2", "priority-3", "priority-delete", "priority-complete"]

	_dueDate
	set dueDate (date) {
		this._dueDate = date
		this.elements.dueDate.textContent = date
	}
	get dueDate () {return this._dueDate}

	_notes
	set notes(text) {
		this._notes = text
		this.elements.notes.textContent = this._notes
	}
	get notes() {return this._notes}


	set priority (index) {
		let last = this.priority.level

		this._priority.index = index
		this._priority.level = Task.priorityClasses[index]

		this.elements.status.classList.replace(last, this.priority.level)

		if (this.priority.level == "priority-delete") {
			this.elements.menu.classList.toggle("invisible")
			this.elements.button_Menu.textContent = "Delete?"
			this.elements.button_Menu.classList.toggle("task-text-menu-delete")
		}
		if (this.priority.level == "priority-complete") {
			this.elements.button_Menu.textContent = "Mark complete?"
			this.elements.button_Menu.classList.toggle("task-text-menu-delete")
			this.elements.button_Menu.classList.toggle("task-text-menu-complete")
		}
		if (this.priority.level == "priority-1") {
			this.elements.menu.classList.toggle("invisible")
			this.elements.button_Menu.classList.toggle("task-text-menu-complete")
		}
	}
	get priority () {return this._priority}

	static createId () {
		Task.taskCount++
		return Task.taskCount
	}

	displayTask() {
		let tasksContainer = this.project.elements.tasksContainer
		let tasksContainerChildren = this.project.elements.tasksContainer.children

		if (tasksContainerChildren.length == 1) {
			tasksContainer.append(this.elements.group)
		} else {
			let targetNode = tasksContainerChildren[0]
			tasksContainer.insertBefore(this.elements.group, targetNode)
		}
	}

	static returnNextIndex (array, index) {
		if (index == array.length-1) {
			return 0
		} else {
			return index+1
		}
	}

}

class Project {

	static collection = {"projects": []}
	static projectCount = 0

	constructor (title) {
		this.id = Project.createId()
		this.title = title
		this.tasks = {active: [], completed: []}
		this.elements = Elements.createProject(this.title)

		this.elements.taskAdder.addButton.addEventListener("click", ()=> {
			if (Elements.invalidFlash(this.elements.taskAdder.inputTitle, this.elements.taskAdder.inputNotes)){
				return
			} else {
				let newTask = new Task(this.elements.taskAdder.inputTitle.value, this)
				newTask.dueDate = this.elements.taskAdder.inputDueDate.value
				newTask.notes = this.elements.taskAdder.inputNotes.value
				this.elements.taskAdder.inputTitle.value = ""
				this.elements.taskAdder.inputNotes.value = ""
				this.elements.taskAdder.inputDueDate.valueAsDate = new Date()

				newTask.displayTask()
			}
		})

		this.elements.menuButton.addEventListener("click", ()=> {
			this.deleteProject()
		})

		Project.collection.projects.push(this)
	}

	addTasks (...tasks) {
		this.tasks.active.push(tasks)
	}

	deleteTask (task) {
		for (let [index, t] of this.tasks.active.entries()) {
			if (t[0].id == task.id) { 
				this.tasks.active.splice(index, 1)
			}
		}
	}

	displayProject() {
		let projectContainerChildren = Elements.projectsContainer.children

		if (projectContainerChildren.length == 1) {
			Elements.projectsContainer.append(this.elements.group)
		} else {
			let targetNode = projectContainerChildren[0]
			Elements.projectsContainer.insertBefore(this.elements.group, targetNode)
		}
	}

	deleteProject() {
		this.elements.group.remove()
		for (let [index, p] of Project.collection.projects.entries()) {
			if (p.id == this.id) { 
				Project.collection.projects.splice(index, 1)
			}
		}
		console.log(Project.collection)
	}

	static createId () {
		Project.projectCount++
		return Project.projectCount
	}

}

module.exports = {Task, Project}
