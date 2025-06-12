let closeImg = require("./assets/cancel.svg")
let expandImg = require("./assets/unfold-more-horizontal.svg")
let collapseImg = require("./assets/unfold-less-horizontal.svg")
let chevronImg = require("./assets/chevron-down.svg")

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
			img_Delete: this.createElement("img", "project-delete-img"),
			content: this.createElement("div", "project-content"),
			nav: this.createElement("nav", "project-nav"),
			button_AddTask: this.createElement("div", "add-task", "project-header-button"),
			button_SortTasks: this.createElement("div", "sort", "project-header-button"),
			tasksContainer: this.createElement("section", "tasks-container"),
			taskAdder: Elements.createNewTaskForm()
		}

		elementObj.group.append(elementObj.header, elementObj.content)
		elementObj.header.append(elementObj.button_Display, 
			elementObj.title, elementObj.img_Delete)

		elementObj.content.append(elementObj.nav, elementObj.taskAdder.group, elementObj.tasksContainer)
		elementObj.nav.append(elementObj.button_AddTask, elementObj.button_SortTasks)

		elementObj.img_Expand.src = collapseImg
		elementObj.button_Display.append(elementObj.img_Expand)
		elementObj.img_Delete.src = closeImg

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
		inputDueDate.type = "date"
		inputDueDate.valueAsDate = new Date();
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
			topRow: this.createElement("div", "task-top-row"),
			text: this.createElement("div", "task-text"),
			menu: this.createElement("div",  "task-text", "task-text-menu", "invisible"),
			button_Menu: this.createElement("div", "task-text-menu-button"),
			title: this.createElement("header", "task-title"),
			button_Exand: this.createElement("img", "task-expand"),
			dueDate: this.createElement("div", "task-due-date"),
			content: this.createElement("div", "task-content"),
			notes: this.createElement("div", "task-content-notes")
		}

		elementObj.group.append(elementObj.status, elementObj.text)
		elementObj.text.append(elementObj.topRow, elementObj.content, elementObj.menu)
		elementObj.topRow.append(elementObj.title, elementObj.dueDate, elementObj.button_Exand)
		elementObj.button_Exand.src = chevronImg
		elementObj.button_Exand.addEventListener("click", () => {
			Elements.taskCollapseToggle(elementObj)
		})
		elementObj.content.append(elementObj.notes)
		elementObj.menu.append(elementObj.button_Menu)
		elementObj.title.textContent = text

		return elementObj
	}

	static taskCollapseToggle (elementObj) {
		if (elementObj.content.classList.contains("invisible")) {
			Elements.toggleFlipElement(elementObj.button_Exand, false)
			elementObj.content.classList.remove("invisible")
			elementObj.title.style.textDecoration = "underline"
		} else {
			Elements.toggleFlipElement(elementObj.button_Exand, true)
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

	static invalidFlash (...elements) {
		for (let e of elements) {
			if (Elements.inputEmpty(e)){
			e.classList.add("invalid-flash")
			setTimeout(()=>{
				e.classList.remove("invalid-flash")
			}, "1000")
			return true
			}
		}
	}

	static inputEmpty (element) {
		let test = new RegExp(/^\s*$/)
		if (test.test(element.value)) {
			return true
		} else return false
	}

	static createElement (type, ...classes) {
		let element = document.createElement(type)
		element.classList.add(...classes)
		return element
	}

	static toggleFlipElement (element, state) {
		if (state == false) {
			element.classList.remove("flip")
		} else {
			element.classList.add("flip")
		}
	}

}


module.exports = Elements
