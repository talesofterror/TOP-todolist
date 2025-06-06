let closeImg = require("./assets/cancel.svg")
let expandImg = require("./assets/unfold-more-horizontal.svg")
let collapseImg = require("./assets/unfold-less-horizontal.svg")

class Elements {

	static projectsContainer = document.getElementById("projects-container")

	static newProjectButton = document.getElementById("new-project-button")
	static newProjectForm = document.getElementById("new-project-form-container")
	static inputProjectName = document.getElementById("input-project-name")
	static newProjectFormContainer = document.getElementById("new-project-form")
	static newProjectCancelButton = document.getElementById("add-project-cancel-button")
	static newProjectSubmitButton = document.getElementById("add-project-button")

	static createProject (_title) {
		let elementObj = {
			group: this.createElement("section", "project"),
			header: this.createElement("div", "project-header"),
			button_Display: this.createElement("div", "project-display-button"),
			img_Expand: this.createElement("img", "project-expand-img"),
			title: this.createElement("header", "project-name"),
			content: this.createElement("div", "project-content"),
			nav: this.createElement("nav", "project-nav"),
			button_AddTask: this.createElement("div", "add-task", "project-header-button"),
			button_SortTasks: this.createElement("div", "sort", "project-header-button"),
			tasksContainer: this.createElement("section", "tasks-container"),
			taskAdder: Elements.createNewTaskForm()
		}

		elementObj.group.append(elementObj.header, elementObj.content)
		elementObj.header.append(elementObj.button_Display, 
			elementObj.title)
		elementObj.content.append(elementObj.nav, elementObj.taskAdder.group, elementObj.tasksContainer)
		elementObj.nav.append(elementObj.button_AddTask, elementObj.button_SortTasks)

		elementObj.img_Expand.src = collapseImg
		elementObj.button_Display.append(elementObj.img_Expand)

		elementObj.button_Display.addEventListener("click", () => {
			Elements.projectCollapseToggle(elementObj)
		})

		elementObj.button_AddTask.addEventListener("click", ()=> {
			Elements.toggleInvisible(elementObj.taskAdder.group)
		})

		elementObj.title.textContent = _title
		elementObj.button_AddTask.textContent = "add task"
		elementObj.button_SortTasks.textContent = "sort tasks"

		return elementObj
	}
	
	static createNewTaskForm () {
		let group = Elements.createElement("div", "task", "task-adder", "invisible")
		let statusIcon = Elements.createElement("div", "task-status-icon")
		let text = Elements.createElement("div", "task-text")
		let buttons = Elements.createElement("div", "task-adder-buttons")
		let addButton = Elements.createElement("div", "project-header-button")
		let cancelButton = Elements.createElement("div", "project-header-button")

		let inputTitle = Elements.createElement("textarea", "task-title")
		let inputDueDate = Elements.createElement("input", "task-due-date")
		let inputNotes = Elements.createElement("textarea", "task-content-notes")

		inputTitle.placeholder = "enter task title"
		inputTitle.rows = 1
		let datePlaceholder = new Date()
		inputDueDate.type = "date"
		inputDueDate.value = "yyyy-mm-dd"
		inputNotes.placeholder = "enter task notes"
		inputNotes.rows = 1
		addButton.textContent = "add"
		cancelButton.textContent = "cancel"

		group.append(statusIcon, text, buttons)
		text.append(inputTitle, inputDueDate, inputNotes)
		buttons.append(addButton, cancelButton)

		inputTitle.addEventListener("input", () => {
			inputTitle.style.height = "0px";
		  inputTitle.style.height = inputTitle.scrollHeight + "px";
		})

		inputNotes.addEventListener("input", () => {
			inputNotes.style.height = "0px";
		  inputNotes.style.height = inputTitle.scrollHeight + "px";
		})

		return {group, inputTitle, inputDueDate, inputNotes, addButton}
	}

	static projectCollapseToggle (elementObj) {
		if (elementObj.tasksContainer.classList.contains("invisible")) {
			elementObj.tasksContainer.classList.remove("invisible")
			elementObj.img_Expand.src = collapseImg
		} else {
			elementObj.tasksContainer.classList.add("invisible")
			elementObj.img_Expand.src = expandImg
		}
	}

	static createTask (text) {
		let elementObj = {
			group: this.createElement("div", "task"),
			status: this.createElement("div", "task-status-icon", "priority-1"),
			text: this.createElement("div", "task-text"),
			title: this.createElement("header", "task-title"),
			dueDate: this.createElement("div", "task-due-date"),
			content: this.createElement("div", "task-content"),
			notes: this.createElement("div", "task-content-notes")
		}

		elementObj.group.append(elementObj.status, elementObj.text)
		elementObj.group.addEventListener("click", () => {
			Elements.taskCollapseToggle(elementObj)
		})
		elementObj.text.append(elementObj.title, elementObj.dueDate, elementObj.content)
		elementObj.content.append(elementObj.notes)
		elementObj.title.textContent = text

		return elementObj
	}

	static taskCollapseToggle (elementObj) {
		if (elementObj.content.classList.contains("invisible")) {
			elementObj.content.classList.remove("invisible")
			elementObj.title.style.textDecoration = "underline"
		} else {
			elementObj.content.classList.add("invisible")
			elementObj.title.style.textDecoration = "none"
		}
	}

	static toggleInvisible(element) {
		if (element.classList.contains("invisible")) {
			element.classList.remove("invisible")
		} else {
			element.classList.add("invisible")
		}
	}

	static createElement (type, ...classes) {
		let element = document.createElement(type)
		element.classList.add(...classes)
		return element
	}

}


module.exports = Elements
