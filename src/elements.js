class Elements {

	static createProject (_name) {
		let group = createElement("section", "project")	
		let header = createElement("div", "project-header")
		let button_Display = createElement("div", "prject-display-button")
		let name = createElement("header", "project-name")
		let button_AddTask = createElement("div", "add-task", "project-header-button")
		let button_SortTasks = createElement("div", "sort", "project-header-button")
		let tasksContainer = createElement("section", "tasks-container")
		
		group.append(header, tasksContainer)
		header.append(button_Display, name, button_AddTask, button_SortTasks)
		name.textContent = _name

		return group
	}
}

function createElement (type, ...classes) {
	let element = document.createElement(type)
	element.classList.add(...classes)
	return element
}

module.exports = Elements
