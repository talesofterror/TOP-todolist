let closeImg = require("./assets/cancel.svg")
let expandImg = require("./assets/unfold-more-horizontal.svg")
let collapseImg = require("./assets/unfold-less-horizontal.svg")

class Elements {

	static projectsContainer = document.getElementById("projects-container")

	static createProject (_title) {
		let elementObj = {
			group: createElement("section", "project"),
			header: createElement("div", "project-header"),
			button_Display: createElement("div", "project-display-button"),
			img_Expand: createElement("img", "project-expand-img"),
			title: createElement("header", "project-name"),
			content: createElement("div", "project-content"),
			nav: createElement("nav", "project-nav"),
			button_AddTask: createElement("div", "add-task", "project-header-button"),
			button_SortTasks: createElement("div", "sort", "project-header-button"),
			tasksContainer: createElement("section", "tasks-container")
		}

		elementObj.group.append(elementObj.header, elementObj.content)
		elementObj.header.append(elementObj.button_Display, 
			elementObj.title)
		elementObj.content.append(elementObj.nav, elementObj.tasksContainer)
		elementObj.nav.append(elementObj.button_AddTask, elementObj.button_SortTasks)

		elementObj.img_Expand.src = expandImg
		elementObj.button_Display.append(elementObj.img_Expand)

		elementObj.title.textContent = _title
		elementObj.button_AddTask.textContent = "add task"
		elementObj.button_SortTasks.textContent = "sort tasks"

		return elementObj
	}

	static createTask (text) {
		let elementObj = {
			group: createElement("div", "task"),
			status: createElement("div", "task-status-icon", "priority-1"),
			text: createElement("div", "task-text"),
			title: createElement("header", "task-title"),
			dueDate: createElement("div", "task-due-date"),
			content: createElement("div", "task-content"),
			notes: createElement("div", "task-content-notes")
		}

		elementObj.group.append(elementObj.status, elementObj.text)
		elementObj.text.append(elementObj.title, elementObj.dueDate, elementObj.content)
		elementObj.content.append(elementObj.notes)
		elementObj.title.textContent = text

		return elementObj
	}
}

function createElement (type, ...classes) {
	let element = document.createElement(type)
	element.classList.add(...classes)
	return element
}

module.exports = Elements
