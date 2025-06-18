// let Project = require("./classes.js")
const Elements = require("./elements.js")

class DepositBox {

	static setStoredProject (project) {
		let storageObject = {
			title: project.title,
			id: project.id,
		}

		let storageString = JSON.stringify(storageObject)
		let storageName = "project-" + storageObject.id
		localStorage.setItem("project-" + storageObject.id, storageString)
		console.log(storageName + " stored as ")
		console.log(localStorage.getItem(storageName))
	}

	static setStoredTasks (task) {
		let storageObject = {
			title: task.title,
			id: task.id,
			projectId: task.projectId,
			text: task.text,
			notes: task.notes,
			dueDate: task._dueDate,
			priority: {index: task.priority.index, level: task.priority.level}
		}

		let storageString = JSON.stringify(storageObject)
		let storageName = "task-" + storageObject.id
		localStorage.setItem(storageName, storageString)
		console.log(storageName + " stored as ")
		console.log(localStorage.getItem(storageName))
	}

	static removeStoredProject (project) {
		for (let key in localStorage) {
			if (key.split("-").includes("project")) {
				if (key.split("-").includes(project.id.toString())) {
					localStorage.removeItem(key)
					for (let task of project.tasks) {
						this.removeStoredTask(task)
					}
				}
			}
		}
	}

	static removeStoredTask (task) {
		for (let key in localStorage) {
			if (key.split("-").includes("task")) {
				if (key.split("-").includes(task.id.toString())) {
					localStorage.removeItem(key)
				}
			}
		}
	}

	static getStoredProjects () {
		let projects = []
		for (let item in localStorage) {
			if (item.split("-").includes("project")) {
				projects.push(JSON.parse(localStorage[item]))
			}
		}
		return projects
	}

	static getStoredTasks () {
		let tasks = []
		for (let item in localStorage) {
			if (item.split("-").includes("task")) {
				tasks.push(JSON.parse(localStorage[item]))
			}
		}
		return tasks
	}

}

module.exports = DepositBox
