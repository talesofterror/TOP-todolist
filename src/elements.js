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
			tasksContainer: this.createElement("section", "tasks-container")
		}

		elementObj.group.append(elementObj.header, elementObj.content)
		elementObj.header.append(elementObj.button_Display, 
			elementObj.title)
		elementObj.content.append(elementObj.nav, elementObj.tasksContainer)
		elementObj.nav.append(elementObj.button_AddTask, elementObj.button_SortTasks)

		elementObj.img_Expand.src = collapseImg
		elementObj.button_Display.append(elementObj.img_Expand)

		elementObj.button_Display.addEventListener("click", (e) => {
			Elements.projectCollapseToggle(elementObj)
		})

		elementObj.title.textContent = _title
		elementObj.button_AddTask.textContent = "add task"
		elementObj.button_SortTasks.textContent = "sort tasks"

		return elementObj
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

	static createElement (type, ...classes) {
		let element = document.createElement(type)
		element.classList.add(...classes)
		return element
	}

}


module.exports = Elements
