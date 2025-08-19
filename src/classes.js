const Elements = require("./elements.js")
const DepositBox = require("./storage.js")
const {format, isAfter} = require("date-fns")

class Task {

	static taskCount = 0
	static priorityClasses = ["priority-1", "priority-2", "priority-3", "priority-delete", "priority-complete"]

	constructor (title, projectId, taskId) {
		this.id = taskId == null ? Task.createId() : taskId
		this.title = title
		this.projectId = projectId
		this._priority = {index: 0, level: Task.priorityClasses[0]}
		this.elements = Elements.createTask(this.title)
		this.completed = false;

		Task.locateProject(projectId).addTask(this)
		
		this.elements.status.addEventListener("click", ()=> {
			this.priority = Task.returnNextIndex(Task.priorityClasses, this.priority.index)
		})

		this.elements.button_Menu.addEventListener("click", ()=> {
			let project = Task.locateProject(this.projectId)
			if (this.priority.level == "priority-delete") {
				this.deleteTask(project)
			} else if (this.priority.level == "priority-complete") {
				this.completeTask(project)
			}
		})
	}

	_dueDate
	set dueDate (date) {
		this._dueDate = date
		this.elements.dueDate.textContent = "Due: " + Task.formatDate(date)
		if (isAfter(Date(), Date(date))) {
			this.elements.dueDate.classList.add("task-due-date-overdue")
			this.elements.status.textContent = "!"
			this.elements.status.classList.add("task-status-icon-overdue")
		}
		else {
			this.elements.dueDate.classList.remove("task-due-date-overdue")
			this.elements.status.textContent = ""
			this.elements.status.classList.remove("task-status-icon-overdue")
		}

		DepositBox.setStoredTasks(this)
	}
	get dueDate () {return this._dueDate}

	_notes
	set notes(text) {
		this._notes = text
		this.elements.notes.textContent = this._notes
		DepositBox.setStoredTasks(this)
	}
	get notes() {return this._notes}


	set priority (index) {
		let last = this.priority.level

		let newPriority = {index: index, level: Task.priorityClasses[index]}

		this._priority.index = index
		this._priority.level = Task.priorityClasses[index]

		this.elements.status.classList.replace(last, Task.priorityClasses[index])

		if (this.priority.level == "priority-delete") {
			this.elements.menu.classList.remove("invisible")
			this.elements.button_Menu.textContent = "Delete?"
			this.elements.button_Menu.classList.add("task-text-menu-delete")
			this.elements.button_Menu.classList.remove("task-text-menu-complete")
		}
		else if (this.priority.level == "priority-complete") {
			this.elements.menu.classList.remove("invisible")
			this.elements.button_Menu.textContent = "Mark complete?"
			this.elements.button_Menu.classList.remove("task-text-menu-delete")
			this.elements.button_Menu.classList.add("task-text-menu-complete")
		}
		else {
			this.elements.menu.classList.add("invisible")
			this.elements.button_Menu.classList.remove("task-text-menu-complete")
			this.elements.button_Menu.classList.remove("task-text-menu-delete")
			DepositBox.setStoredTasks(this)
		}

		return newPriority
	}
	get priority () {return this._priority}
	
	static createId () {
		Task.taskCount++
		return Task.taskCount
	}

	displayTask() {
		let project = Task.locateProject(this.projectId)
		let tasksContainer = project.elements.tasksContainer
		let tasksContainerChildren = project.elements.tasksContainer.children

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

	static locateProject (id) {
		for (let i of Project.collection.projects) {
			if (i.id == id) {
				return i
			}
		}
	}

	static formatDate (date) {
		console.log(date)
		const split = date.split("-")
		console.log(split)
		console.log(format(Date(Number(split[0]), Number(split[1]) - 1, Number(split[2])), "MMMM dd, yyyy"))
		return format(new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2])), "MMMM dd, yyyy")
	}

	deleteTask (project) {
		this.elements.group.remove()
		DepositBox.removeStoredTask(this)
		project.deleteTask(this)
	}

	completeTask (project) {
		this.elements.group.remove()
		DepositBox.removeStoredTask(this)
		project.deleteTask(this)
	}
}

class Project {

	static collection = {projects: []}
	static projectCount = 0

	constructor (title, id) {
		this.id = id == null ? Project.createId() : id
		this.title = title
		this.tasks = []
		this.elements = Elements.createProject(this.title)

		this.elements.taskAdder.addButton.addEventListener("click", ()=> {
			if (Elements.invalidFlash(this.elements.taskAdder.inputTitle, this.elements.taskAdder.inputNotes)){
				return
			} else {
				let newTask = new Task(this.elements.taskAdder.inputTitle.value, this.id)
				this.elements.tasksContainer.append(newTask.elements.group)
				newTask.dueDate = this.elements.taskAdder.inputDueDate.value
				newTask.notes = this.elements.taskAdder.inputNotes.value
				this.elements.taskAdder.inputTitle.value = ""
				this.elements.taskAdder.inputNotes.value = ""
				this.elements.taskAdder.inputDueDate.valueAsDate = new Date()

				this.addTask(newTask)
			}
		})

		this.elements.button_SortTasks.addEventListener("click", ()=> {
			this.sortTasks()
		})

		this.elements.menuButton.addEventListener("click", ()=> {
			this.deleteProject()
		})

		this.displayProject()

		this.invertSort = false

		Project.collection.projects.push(this)
		DepositBox.setStoredProject(this)
	}

	addTask (task) {
		this.tasks.push(task)
		task.displayTask(this.id)
		this.elements.taskAdder.group.classList.add("invisible")
		DepositBox.setStoredTasks(task)
	}

	deleteTask (task) {
		for (let [index, t] of this.tasks.entries()) {
			if (t.id == task.id) { 
				this.tasks.splice(index, 1)
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
		DepositBox.removeStoredProject(this)
	}

	sortTasks () {
		let sortedArray = this.tasks.sort( function(a, b) {
			if (a.priority.index > b.priority.index) {
				return 1
			}
			if (a.priority.index < b.priority.index) {
				return -1
			}
			return 0
		})
		
		if (!this.invertSort) { sortedArray.reverse() }
		
		for (let task of sortedArray) {
			this.elements.tasksContainer.htmlContent = ""
			this.elements.tasksContainer.append(task.elements.group)
		}

		this.invertSort = !this.invertSort
	}

	static createId () {
		Project.projectCount++
		return Project.projectCount
	}
}

module.exports = {Task, Project}
